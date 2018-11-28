let m = require('mithril');

class renameLeaf {
    view(vnode) {
        let oldName = vnode.attrs.oldName;
        return m('rename-box', [
            m('rename-box-input', oldName),
            m('rename-box-accept', 'V')
        ])
    }
}
module.exports = renameLeaf;