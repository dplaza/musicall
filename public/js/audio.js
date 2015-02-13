function newPlayer(note) {

    if (typeof conductor === 'undefined')
        conductor = new BandJS();

    conductor.setTimeSignature(4, 4);
    conductor.setTempo(120);

    var piano = conductor.createInstrument();

    switch (note) {
        case 1:
            piano.note('quarter', 'C4');
            break;
        case 2:
            piano.note('quarter', 'D4');
            break;
        case 3:
            piano.note('quarter', 'E4');
            break;
        case 4:
            piano.note('quarter', 'F4');
            break;
        default:
            break;
    }


    //It will return you the player instance to use for playing, pausing, muting, stopping, and seeking.
    var player = conductor.finish();

    return player;
}

function playSound(note) {
    var player = newPlayer(note);
    player.play();
}
