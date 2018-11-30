let m = require('mithril');
let ui = require('../model/uiCalls');
let rmbWrap = require('./_wrapContext');
let contextTree = require('./_contextTree');

class treeMenu {
    view() {
        return m("home-tree", [
            m("home-tree-add-button", {onclick: () => {
                ui.toAddTree();
            }}, "+"),
            ui.treeList.map((singleTree, i) => {
                return m(rmbWrap,
                    {display: contextTree, send: {treePos: i, treeId: 'id'}},
                    m("home-tree-label", {onclick: () => {
                        ui.toSetTree(i);
                    }}, singleTree.name)
                );
            })
        ])
    }
}
module.exports = treeMenu;