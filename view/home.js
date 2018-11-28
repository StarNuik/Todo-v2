let m = require('mithril');
let d = require('../model/data');
let branch = require('./_homeBranch');
let tree = require('./_homeTree');

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
                    d.toAddBranch();
                }}, "+"),
                m("home-add-branch-label", "Add a branch")
            ])
            
        ]);
    }
    treeCheck() {
        if (d.db[d.currentTree] !== undefined && d.db[d.currentTree].branches !== undefined) {
            return d.db[d.currentTree].branches.map((singleBranch, i) => {
                return m(branch, {label: singleBranch.name, leaves: singleBranch.leaves, branchPos: i});
            });
        } else {
            return m('home-branch-empty', 'No data in this tree. Use the button under me to create a new branch')
        }
    }
}
module.exports = home;