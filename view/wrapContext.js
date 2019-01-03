let m = require('mithril');
let c = require('../model/contextHandle');

// Usage example:                                             \/ Whatever element you want to wrap around
// m(wrapper, {display: contextMenu, send: {ex: 'example'}}, m("wrapped-element", "Element 1"))
//  Displayed component    /\                  /\ Paremeter object, sent through usual vnode.attrs              

class contextHandle {
    constructor(vnode) {
        this.state = false;
    }
    setupPackage(vnode) {
        // Merge attributes to send with oncreate function for the context box
        this.send = vnode.attrs.send;
        this.send.oncreate = (vnode) => {
            vnode.dom.style = "top:" + (this.pos.y - window.scrollY) + "px; left:" + this.pos.x + "px;";
            this.setEvents(vnode.dom.getBoundingClientRect());

            for (let i = 0; i < vnode.dom.children.length; i++) {
                vnode.dom.children[i].addEventListener('click', () => {
                    this.closeSelf();
                })
            }
        }
    }
    closeSelf() {
        this.state = false;
        m.redraw();
        c.clearMenu();
    }
    setEvents(elemRect) {
        c.registerMenu(() => {
            // If clicked outside the context box, close the menu
            let clickPos = {x: event.clientX, y: event.clientY};
            let allowRect = {x1: elemRect.x, x2: elemRect.x + elemRect.width, y1: elemRect.y, y2: elemRect.y + elemRect.height};
            if (clickPos.x < allowRect.x1 || clickPos.x > allowRect.x2 || clickPos.y < allowRect.y1 || clickPos.y > allowRect.y2) {
                this.state = false;
                m.redraw();
                c.clearMenu();
            }
        }, () => {
            // If scrolled, close the menu
            this.state = false;
            m.redraw();
            c.clearMenu();
        });
    }
    view(vnode) {
        this.setupPackage(vnode);
        return [
            m("wrap-context", {
                oncontextmenu: () => {
                    this.state = true;
                    this.pos = {x: event.clientX, y: event.pageY}
                }
            }, vnode.children[0]),
            this.state ? m(vnode.attrs.display, this.send) : ""
        ]
    }
    
}
module.exports = contextHandle;