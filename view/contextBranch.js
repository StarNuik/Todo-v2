let m = require('mithril');
let ui = require('../model/uiCalls');

class conBranch {
    view(vnode) {
        let branchPos = vnode.attrs.branchPos;
        let renameTarget = vnode.attrs.renameTarget;
        let oldName = vnode.attrs.oldName;

        return m('con-box', [
            m('con-box-item', {onclick: () => {
                ui.showRenameBranch(renameTarget.dom.getBoundingClientRect(), oldName, branchPos);
            }}, 'Rename'),
            m('con-box-item', {onclick: () => {
                ui.startBranchesMove();
            }}, 'Move'),
            m('con-box-item',{onclick: () => {
                ui.toDeleteBranch(branchPos);
            }}, 'Delete')
        ])
    }
}
module.exports = conBranch;