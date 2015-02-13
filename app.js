//Required modules

var request = require('request');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));


//Routes
app.get('/', function(req, res) {

    ip = getClientIp(req);
    var msg = 'new connection: ' + ip;
    console.log(msg);

    res.sendFile(__dirname + '/index.html');
});

/* CODE */

var users = [];

io.on('connection', function(socket) {

    //var address = socket.client.conn.remoteAddress;
    var address = socket.request.socket.remoteAddress;

    debugmsg(address);

    //Event 'join'
    socket.on('join', function(data) {

        socket.nickname = data;

        console.log(socket.nickname + " joins from " + address);

        //we call the api to get the country
        var url = 'http://api.hostip.info/get_json.php?ip=' + address;

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
server.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});


function debugmsg(data) {
    console.log(data);
    io.emit('debug', data);
}


function getClientIp(req) {

    var ipAddress;
    // Amazon EC2 / Heroku workaround to get real client IP
    var forwardedIpsStr = req.header('x-forwarded-for');

    if (forwardedIpsStr) {
        // 'x-forwarded-for' header may return multiple IP addresses in
        // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
        // the first one
        var forwardedIps = forwardedIpsStr.split(',');
        ipAddress = forwardedIps[0];
    }

    if (!ipAddress) {
        // Ensure getting client IP address still works in
        // development environment
        ipAddress = req.connection.remoteAddress;
    }

    return ipAddress;
};
