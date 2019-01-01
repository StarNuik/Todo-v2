let m = require('mithril');

class renameBox {
    oncreate(vnode) {
        let targetRect = vnode.attrs.targetRect;
        vnode.dom.style = "top:" + targetRect.top + "px;left:" + targetRect.left + "px;"; 
    }
    view(vnode) {
        let oldName = vnode.attrs.oldName;
        let call = vnode.attrs.call;

        return m('rename-box', [
            m('input', {value: oldName !== undefined ? oldName : "New name"}),
            m('rename-box-accept', {onclick: () => {
                call(vnode.dom.children[0].value);
            }}, 'V')
        ])
    }
}
module.exports = renameBox;