/*
Ver documentacion de libreria wad

 */

function initAudio() {

    saw = new Wad({
        source: 'sawtooth'
    });
}

function playSound(note) {

    switch (note) {
        case 1:
            saw.play({
                pitch: 440
            });
            break;
        case 2:
            saw.play({
                pitch: 'D4',
                label: 'D4'
            });
            break;
        case 3:
            saw.play({
                pitch: 'E4',
                label: 'E4'
            });
            break;
        case 4:
            saw.play({
                pitch: 'F4',
                label: 'F4'
            });
            break;
        default:
            break;
    }
}
