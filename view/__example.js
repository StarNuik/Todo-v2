let m = require('mithril');

class example {
    constructor(vnode) {
        // vnode.state is undefined at this point
        // this.kind = vnode.attrs.name;
    }
    oninit() {
        //
    }
    oncreate() {
        //
    }
    view(vnode) {
        return m("div", `Hello from a ${vnode.attrs.name}`)
    }
}
module.exports = example;