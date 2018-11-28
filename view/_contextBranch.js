let m = require('mithril');
let d = require('../model/data');

class conBranch {
    view(vnode) {
        let branchPos = vnode.attrs.branchPos;
        
        return m('con-box', [
            m('con-box-item', {onclick: () => {
                d.toRenameBranch("Rename worked!", branchPos, 'id');
            }}, 'Rename'),
            m('con-box-item', 'Move (WIP)'),
            m('con-box-item',{onclick: () => {
                d.toDeleteBranch(branchPos, 'id');
            }}, 'Delete')
        ])
    }
}
module.exports = conBranch;