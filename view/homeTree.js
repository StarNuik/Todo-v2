let m = require('mithril');
let ui = require('../model/uiCalls');
let rmbWrap = require('./wrapContext');
let dragWrap = require('./wrapDragList');
let contextTree = require('./contextTree');

class treeMenu {
    view(vnode) {
        return m("home-tree", [
            m("home-tree-add-button", {onclick: () => {
                ui.toAddTree();
            }}, "+"),
            this.sortTrees(),
            this.finishMove()
        ]);
    }
    finishMove() {
        if (ui.moveTrees.show) {
            return m('home-tree-finishMove', {onclick: () => {
                ui.stopTreeMove();
            }}, 'stahp');
        }
    }
    sortTrees() {
        if (ui.moveTrees.show) {
            return m(dragWrap, {sortCall: (oldIndex, newIndex) => {
                ui.toOrderTree(oldIndex, newIndex);
            }}, this.drawTrees())
        } else {
            return this.drawTrees();
        }
    }
    drawTrees() {
        return ui.treeList.map((singleTree, i) => {
            // This element has to move to a separate component, so that the rename box starts to work properly
            return m(rmbWrap, {display: contextTree, send: {
                treePos: i,
                treeId: 'id',
                // renameTarget: vnode,
                oldName: singleTree.name
            }}, m("home-tree-label", {onclick: () => {
                    ui.toSetTree(i);
                }}, singleTree.name)
            );
        })
    }
}
module.exports = treeMenu;