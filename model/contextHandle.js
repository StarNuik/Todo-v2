class click {
    constructor() {
        this.openMenu = null;
        window.addEventListener('mousedown', () => {this.mouseDown(this);});
        // document.body.addEventListener('contextmenu', () => {this.contextMenu(this);})
        window.addEventListener('scroll', () => {this.scroll(this);});
    }
    mouseDown(me) {
        if (me.openMenu !== null) {
            me.openMenu.downCall();
        }
    }
    // contextMenu(me) {
    //     //
    // }
    scroll(me) {
        if (me.openMenu !== null) {
            me.openMenu.scrollCall();
        }
    }
    registerMenu(mouseDownCall, scrollCall) {
        this.openMenu = {downCall: mouseDownCall, scrollCall: scrollCall};
    }
    clearMenu() {
        this.openMenu = null;
    }
}

let c = new click;
module.exports = c;