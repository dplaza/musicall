//Required modules

var request = require('request');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));


//Routes
app.get('/', function(req, res) {
    console.log('new connection: ' + request.connection.remoteAddress);
    res.sendFile(__dirname + '/index.html');
});

/* CODE */

var users = [];

io.on('connection', function(socket) {

    var address = socket.handshake.address;

    //Event 'join'
    socket.on('join', function(data) {

        socket.nickname = data;

        console.log(socket.nickname + " joins from " + address);

        var url = 'http://api.hostip.info/get_json.php?ip=' + address;

        //we call the api to get the country
        request.get(url, function(error, response, body) {

            var location = JSON.parse(body);

            var newUser = {
                'nickname': data,
                'loginDate': Date.now(),
                'address': address,
                'country': location.country_name
            }

            users.push(newUser);

            io.emit('join', newUser); //i send the event 'join' to all users
        });

    });

    //Event 'sound'
    socket.on('sound', function(data) {
        var msg = socket.nickname + ' playing sound ' + data;
        var sendData = {
            'number': data,
            'message': msg
        };
        console.log(msg);
        io.emit('sound', sendData); //i send the sound to all
    });

    //Event 'disconnect'
    socket.on('disconnect', function() {
        var msg = socket.nickname + ' has gone';
        console.log(msg);
        io.emit('exit', msg);
    });


});

//Run web server
server.listen(3000, function() {
    console.log('server listening on port 3000')
});
