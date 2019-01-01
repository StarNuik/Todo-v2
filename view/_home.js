let m = require('mithril');
let ui = require('../model/uiCalls');

let tree = require('./homeTree');
let branch = require('./homeBranch');
let renameBox = require('./renameBox');
let dragWrap = require('./wrapDragList');

// m(rmbWrap, {display: testMenu, send: {abc: 'abxc'}}, m("debug-text", "Button 1")) ✎✓⯆⯈★☆🗑⌬＋

class home {
    oninit() {
        let eless = require('electron-less');
        eless({source: './style/home.less'}); 
    }

    view() {
        return m("home", [
            m(tree),
            this.branchesElem(),
            this.finishSort(),
            m("home-add-branch", [
                m("home-add-branch-button", {onclick: () => {
                    ui.toAddBranch();
                }}, "+"),
                m("home-add-branch-label", "Add a branch")
            ]),
            ui.rename.show ? m(renameBox, {oldName: ui.rename.oldName, call: ui.rename.call, targetRect: ui.rename.targetRect}) : ""
        ]);
    }

    finishSort() {
        if (ui.moveBranches.show) {
            return m('home-branch-finishMove', {onclick: () => {
                ui.stopBranchesMove();
            }}, 'Finish moving!');
        } else {
            return '';
        }
    }
    branchesElem() {
        return this.sortCheck();
    }
    sortCheck() {
        if (ui.moveBranches.show) {
            return m(dragWrap, {sortCall: (oldIndex, newIndex) => {
                console.log('abc')
                ui.toOrderBranch(oldIndex, newIndex);
            }}, this.treeCheck());
        } else {
            return this.treeCheck();
        }
    }
    treeCheck() {
        if (ui.curTree !== undefined && ui.curTree.branches !== undefined) {
            return this.drawBranches();
        } else {
            return m('home-branch-empty', 'No data in this tree. Use the button under me to create a new branch')
        }
    }
    drawBranches() {
        return ui.curTree.branches.map((singleBranch, i) => {
            return m(branch, {label: singleBranch.name, leaves: singleBranch.leaves, branchPos: i});
        });
    }
}
module.exports = home;