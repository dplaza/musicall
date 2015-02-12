init: {
    var io = new io(); //by default connecting to localhost    
}


eventsFromServer: {

    //Event 1 'connect'     //when i'm connected, this event is fired automatically
    io.on('connect', function() {
        nickname = prompt("what is your nickname?");
        io.emit('join', nickname); //i send my nickname to server      
    });

    //Event 2 'join'        //when someone joins
    io.on('join', function(data) {
        addLine(data.nickname + " joins from " + data.country);
    });

    io.on('exit', function(data) {
        addLine(data);
    });
}


utils: {

    function addLine(data) {
        $('#nicknames').append('<li>' + data + '</li>');
    }
}
