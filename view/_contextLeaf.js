let m = require('mithril');
let ui = require('../model/uiCalls');

class conLeaf {
    view(vnode) {
        let leafPos = vnode.attrs.leafPos;
        let branchPos = vnode.attrs.branchPos;
        let renameTarget = vnode.attrs.renameTarget;
        let oldName = vnode.attrs.oldName;

        return m('con-box', [
            m('con-box-item', {onclick: () => {
                ui.showRenameLeaf(renameTarget.dom.getBoundingClientRect(), oldName, branchPos, leafPos);
            }}, 'Rename'),
            m('con-box-item', 'Move (WIP)'),
            m('con-box-item',{onclick: () => {
                ui.toDeleteLeaf(leafPos, branchPos, 'id');
            }}, 'Delete')
        ])
    }
}
module.exports = conLeaf;