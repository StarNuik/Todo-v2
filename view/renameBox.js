let m = require('mithril');

class renameBox {
    oncreate(vnode) {
        let targetRect = vnode.attrs.targetRect;
        vnode.dom.style = "top:" + (targetRect.top + window.scrollY) + "px;left:" + targetRect.left + "px;";
        vnode.dom.children[0].select();

        this.a = this.ev.bind(this);
        window.addEventListener('keydown', this.a);
    }
    onremove() {
        window.removeEventListener('keydown', this.a);
    }
    view(vnode) {
        let oldName = vnode.attrs.oldName;
        this.call = vnode.attrs.call;
        this.node = vnode;
        

        return m('rename-box', [
            m('input', {value: oldName !== undefined ? oldName : "New name"}),
            m('rename-box-accept', {onclick: () => {
                this.call(vnode.dom.children[0].value);
            }}, 'V')
        ])
    }
    ev() {
        if (event.key === 'Enter') {
            // console.log(this.node.dom.children[0].value)
            this.call(this.node.dom.children[0].value);
            m.redraw()
            // console.log(this.call)
        }
    }
}
module.exports = renameBox;