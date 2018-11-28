let m = require('mithril');

class example {
    constructor(vnode) {
        // vnode.state is undefined at this point
        // this.kind = vnode.attrs.name;
    }
    oninit(vnode) {
        //
    }
    oncreate(vnode) {
        //
    }
    onbeforeupdate(vnode, old) {
        //
    }
    onupdate(vnode) {
        //
    }
    onbeforeremove(vnode) {
        //
    }
    onremove(vnode) {
        //
    }
    view(vnode) {
        return m('div', `Hello from an ${vnode.attrs.name}`)
    }
}
module.exports = example;