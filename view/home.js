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
            d.branches.map((singleBranch, i) => {
                return m(branch, {label: singleBranch.name, leaves: singleBranch.leaves});
            }),
            m("home-add-branch", [
                m("home-add-branch-button", "+"),
                m("home-add-branch-label", "Add a branch")
            ])
        ]);
    }
}
module.exports = home;