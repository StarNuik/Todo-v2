let ui = require('./uiBase');
let m = require('mithril');

class press {
    constructor() {
        this.ctrlPressed = false;
        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                // case 'ArrowLeft':
                //     this.controlZ();
                //     break;
                // case 'ArrowRight':
                //     this.controlY();
                //     break;
                case 'Enter':
                    this.enter();
                    break;
                case 'Escape':
                    this.escape();
                    break;
                case 'Tab':
                    this.tab();
                    break;
                case 'Control':
                    this.ctrlPressed = true;
                    break;
                case 'z':
                    if (this.ctrlPressed) {
                        this.controlZ();
                    }
                    break;
                case 'y':
                    if (this.ctrlPressed) {
                        this.controlY();
                    }
                    break;
                // default:
                //     break;
            }
        });
        window.addEventListener('keyup', (e) => {
            switch (e.key) {
                case 'Control':
                    this.ctrlPressed = true;
                    break;
            }
        });
    }
    controlZ() {
        ui.toUndo();
        m.redraw();
    }
    controlY() {
        ui.toRedo();
        m.redraw();
        // require('./uiBase.js').startBranchesMove();
    }
    enter() {
        //
    }
    escape() {
        ui._resetStates();
        m.redraw();
    }
    tab() {
        ui.cycleTree();
    }
}

let p = new press;
module.exports = p;