let m = require('mithril');
let d = require('../model/data');

class conLeaf {
    view(vnode) {
        let leafPos = vnode.attrs.leafPos;
        let parentPos = vnode.attrs.parentPos;
        
        return m('con-box', [
            m('con-box-item', {onclick: () => {
                d.toRenameLeaf("Rename worked!", leafPos, parentPos, 'id');
            }}, 'Rename'),
            m('con-box-item', 'Move (WIP)'),
            m('con-box-item',{onclick: () => {
                d.toDeleteLeaf(leafPos, parentPos, 'id');
            }}, 'Delete')
        ])
    }
}
module.exports = conLeaf;