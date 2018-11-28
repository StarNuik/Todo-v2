let m = require('mithril');
let d = require('../model/data');
let rmbWrap = require('./_wrapContext');
let contextTree = require('./_contextTree');

class treeMenu {
    view() {
        return m("home-tree", [
            m("home-tree-add-button", {onclick: () => {
                d.toAddTree();
            }}, "+"),
            d.db.map((singleTree, i) => {
                return m(rmbWrap,
                    {display: contextTree, send: {treePos: i, treeId: singleTree.id}},
                    m("home-tree-label", {onclick: () => {
                        d.toSetTree(i);
                    }}, singleTree.name)
                );
            })
        ])
    }
}
module.exports = treeMenu;