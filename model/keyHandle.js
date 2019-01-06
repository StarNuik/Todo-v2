let ui = require('./uiBase');
let m = require('mithril');

class press {
    constructor() {
        
        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    this.controlZ();
                    break;
                case 'ArrowRight':
                    this.controlY();
                    break;
                case 'Enter':
                    this.enter();
                    break;
                case 'Escape':
                    this.escape();
                    break;
                case 'Tab':
                    this.tab();
                    break;
                // default:
                //     console.log('other')
                //     break;
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
        //
    }
}

let p = new press;
module.exports = p;