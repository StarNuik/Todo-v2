let m = require('mithril');

class leaf {
    constructor() {
        //
    }
    oninit() {
        //
    }
    oncreate() {
        //
    }
    view(vnode) {
        this.label = vnode.attrs.label;
        this.state = vnode.attrs.state;
        return m("home-leaf", [
            m("home-leaf-label", this.label),
            m("home-leaf-tick", this.state ? "V" : "X")
        ])
    }
}
module.exports = leaf;