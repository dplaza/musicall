//Required modules

var request = require('request');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var ip;

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));


//Routes
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

/* CODE */

var users = [];

io.on('connection', function(socket) {

    //Event 'join'
    socket.on('join', function(data) {

        socket.nickname = data.nickname;
        socket.ip = data.ip.ip

        console.log(data.nickname + " joins from " + socket.ip);

        //we call the api to get the country
        //
        //http://www.telize.com/geoip/46.18.96.130
        //http://ip-api.com/json/201.239.17.43
        //
        var url = 'http://ip-api.com/json/' + socket.ip;
        request.get(url, function(error, response, json) {

            var location = JSON.parse(json);
            console.log(location.city + ', ' + location.country);

            var newUser = {
                'nickname': socket.nickname,
                'loginDate': Date.now(),
                'address': socket.ip,
                'country': location.city + ', ' + location.regionName + ', ' + location.country
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
server.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});


function debugmsg(data) {
    console.log(data);
    io.emit('debug', data);
}
