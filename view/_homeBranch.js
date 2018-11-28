let m = require('mithril');
let d = require('../model/data');
let leaf = require("./_homeLeaf");
let rmbWrap = require('./_wrapContext');
let contextBranch = require('./_contextBranch');

class branch {
    view(vnode) {
        let label = vnode.attrs.label;
        let leaves = vnode.attrs.leaves;
        let branchPos = vnode.attrs.branchPos;
        
        return m("home-branch", [
            m(rmbWrap, {display: contextBranch, send: {branchPos: branchPos}}, m("home-branch-label", label)),
            leaves.map((singleLeaf, i) => {
                return m(leaf, {label: singleLeaf.name, state: singleLeaf.state, leafPos: i, parentPos: branchPos})
            }),
            m("home-branch-add", [
                m("home-branch-add-label", "New task"),
                m("home-branch-add-button", {onclick: () => {
                    d.toAddLeaf(branchPos);                    
                }},"+")
            ])
        ])
    }
}
module.exports = branch;