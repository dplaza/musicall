/*
Ver documentacion de libreria wad

 */


function initAudio() {

    hatClosed = new Wad(Wad.presets.hiHatClosed);
    snare = new Wad(Wad.presets.snare);
    piano = new Wad(Wad.presets.piano);

    bass = new Wad({
        source: 'sine',
        env: {
            attack: .02,
            decay: .1,
            sustain: .9,
            hold: .4,
            release: .1
        }
    })
}

function playSound(note) {

    switch (note) {
        case 1:
            piano.play({
                pitch: guiParams.note
            });
            break;
        case 2:
            hatClosed.play({
                pitch: guiParams.note
            });
            break;
        case 3:
            snare.play({
                pitch: guiParams.note
            });
            break;
        case 4:
            bass.play({
                pitch: guiParams.note
            });
            break;
        default:
            break;
    }
}
