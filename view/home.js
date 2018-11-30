let m = require('mithril');
let ui = require('../model/uiCalls');
let branch = require('./_homeBranch');
let tree = require('./_homeTree');
let renameBox = require('./_renameBox');

// m(rmbWrap, {display: testMenu, send: {abc: 'abxc'}}, m("debug-text", "Button 1")) ✎✓⯆⯈★☆🗑⌬＋

class home {
    oninit() {
        let eless = require('electron-less');
        eless({source: './style/home.less'}); 
    }
    oncreate() {
        //
    }
    view() {
        return m("home", [
            m(tree),
            this.treeCheck(),
            m("home-add-branch", [
                m("home-add-branch-button", {onclick: () => {
                    ui.toAddBranch();
                }}, "+"),
                m("home-add-branch-label", "Add a branch")
            ]),
            ui.rename.show ? m(renameBox, {oldName: ui.rename.oldName, call: ui.rename.call, targetRect: ui.rename.targetRect}) : ""
        ]);
    }
    treeCheck() {
        if (ui.curTree !== undefined && ui.curTree.branches !== undefined) {
            return ui.curTree.branches.map((singleBranch, i) => {
                return m(branch, {label: singleBranch.name, leaves: singleBranch.leaves, branchPos: i});
            });
        } else {
            return m('home-branch-empty', 'No data in this tree. Use the button under me to create a new branch')
        }
    }
}
module.exports = home;