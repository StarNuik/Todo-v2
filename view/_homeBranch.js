let m = require('mithril');
let leaf = require("./_homeLeaf");
// let d = require('../model/data');

class branch {
    constructor() {
        // this.label = vnode.attrs.label;
        // this.leaves = vnode.attrs.leaves;
    }
    oninit() {
        //
    }
    oncreate() {
        //
    }
    view(vnode) {
        this.label = vnode.attrs.label;
        this.leaves = vnode.attrs.leaves
        return m("home-branch", [
            m("home-branch-label", this.label),
            this.leaves.map((singleLeaf) => {
                return m(leaf, {label: singleLeaf.name, state: singleLeaf.done})
            })
        ])
    }
}
module.exports = branch;