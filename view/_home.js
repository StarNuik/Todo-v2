let m = require('mithril');
let ui = require('../model/uiBase');
let k = require('../model/keyHandle');

let tree = require('./homeTree');
let branch = require('./homeBranch');
let renameBox = require('./renameBox');
let dragWrap = require('./wrapDragList');

let data = require('../model/data')

// m(rmbWrap, {display: testMenu, send: {abc: 'abxc'}}, m("debug-text", "Button 1")) ✎✓⯆⯈★☆🗑⌬＋

class home {
    oninit() {
        let eless = require('electron-less');
        eless({source: './style/home.less'}); 
        this.i = 0;
    }

    view() {
        return m("home", [
            m('debug', {onclick: () => {
                // console.log(ui.treeCurrent);
                // ui.test()
                console.log(data.history.log)
            }}, ' Click for debug '),
            m('debug', {onclick: () => {
                // console.log(ui.treeCurrent);
                // ui.test()
                // console.log(data.history)
                console.log(ui)
                ui.toUndo();
            }}, 'Undo'),
            m('debug', {onclick: () => {
                // console.log(ui.treeCurrent);
                // ui.test()
                // console.log(data.history)
                ui.toRedo();
            }}, 'Redo'),
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
                ui.toOrderBranch(oldIndex, newIndex);
            }}, this.treeCheck());
        } else {
            return this.treeCheck();
        }
    }
    treeCheck() {
        if (ui.treeCurrent !== undefined && ui.treeCurrent.branches !== undefined) {
            return this.drawBranches();
        } else {
            return m('home-branch-empty', 'No data in this tree. Use the button under me to create a new branch')
        }
    }
    drawBranches() {
        return ui.treeCurrent.branches.map((singleBranch, i) => {
            return m(branch, {label: singleBranch.name, leaves: singleBranch.leaves, branchPos: i});
        });
    }
}
module.exports = home;