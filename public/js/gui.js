var guiParams = {
    note: 440
};

window.onload = function() {

    gui = new dat.GUI();

    gui.add(guiParams, 'note', 16, 1200);
};
