init: {
    var io = new io(); //by default connecting to localhost    
}


eventsFromServer: {

    //Event 1 'connect'     //when i'm connected, this event is fired automatically
    io.on('connect', function() {

        nickname = prompt("what is your nickname?");
        
        var url = 'http://api.ipify.org?format=json';
        $.getJSON(url, function(ip) {
            var data = {
                'nickname': nickname,
                'ip': ip
            };

            console.log(JSON.stringify(data));

            io.emit('join', data);
        });
    });

    //Event 2 'join' //when someone joins
    io.on('join', function(data) {
        addLine(data.nickname + " joins from " + data.country);
    });

    io.on('exit', function(data) {
        addLine(data);
    });

    io.on('sound', function(data) {
        playSound(data.number);
        addLine(data.message);
    });

    //Event 'debug'    
    io.on('debug', function(data) {
        console.log('[DEBUG MSG] ' + data);
    });
}

domEvents: {


    $(document).ready(function() {
        initAudio();
    });


    $('#play_1').click(function() {
        io.emit('sound', 1);
    });

    $('#play_2').click(function() {
        io.emit('sound', 2);
    });

    $('#play_3').click(function() {
        io.emit('sound', 3);
    });

    $('#play_4').click(function() {
        io.emit('sound', 4);
    });
}


utils: {

    function addLine(data) {
        $('#nicknames').append('<li>' + data + '</li>');
    }
}
