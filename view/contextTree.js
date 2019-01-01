let m = require('mithril');
let ui = require('../model/uiCalls');

class conTree {
    view(vnode) {
        let treePos = vnode.attrs.treePos;
        let renameTarget = vnode; // Bad hacks
        let oldName = vnode.attrs.oldName;

        return m('con-box', [
            m('con-box-item', {onclick: () => {
                ui.showRenameTree(renameTarget.dom.getBoundingClientRect(), oldName, treePos);
            }}, 'Rename'),
            m('con-box-item', {onclick: () => {
                ui.startTreeMove();
            }}, 'Move (WIP)'),
            m('con-box-item', {onclick: () => {
                ui.toDeleteTree(treePos, 'id');
            }}, 'Delete')
        ])
    }
}
module.exports = conTree;