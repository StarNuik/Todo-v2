let m = require('mithril');
let branch = require('./_homeBranch');
let tree = require('./_homeTree');
// let data = require('../model/data');
// let d = new data;
let d = require('../model/data');

class home {
    constructor() {
        // d.readData();
    }
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
                    d.toAddBranch(d.currentTree.order);
                }}, "+"),
                m("home-add-branch-label", "Add a branch")
            ])
        ]);
    }
    treeCheck() {
        if (d.currentTree.branches !== undefined) {
            return d.currentTree.branches.map((singleBranch, i) => {
                return m(branch, {label: singleBranch.name, leaves: singleBranch.leaves, branchPos: singleBranch.order, treePos: d.currentTree.order});
            });
        } else {
            return m('home-branch-empty', 'No data in this tree. Use the button under me to create a new branch')
        }
    }
}
module.exports = home;