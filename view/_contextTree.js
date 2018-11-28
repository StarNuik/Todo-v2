let m = require('mithril');
let d = require('../model/data');

class conTree {
    view(vnode) {
        let treePos = vnode.attrs.treePos;
        
        return m('con-box', [
            m('con-box-item', {onclick: () => {
                d.toRenameTree("Rename worked!", treePos, vnode.attrs.treeId);
            }}, 'Rename'),
            m('con-box-item', 'Move (WIP)'),
            m('con-box-item',{onclick: () => {
                d.toDeleteTree(treePos, 'id');
            }}, 'Delete')
        ])
    }
}
module.exports = conTree;