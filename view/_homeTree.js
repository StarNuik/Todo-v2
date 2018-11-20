let m = require('mithril');
let d = require('../model/data');

class example {
    constructor(vnode) {
        // vnode.state is undefined at this point
        // this.kind = vnode.attrs.name;
    }
    oninit() {
        //
    }
    oncreate() {
        //
    }
    view(vnode) {
        return m("home-tree", [
            m("home-tree-add-button", {onclick: () => {
                d.toAddTree();
                // console.log('asd')
            }}, "+"),
            d.rawData.map((singleTree, i) => {
                return m("home-tree-label", {onclick: () => {
                    d.toSetTree(i);
                    // console.log('asd')
                }}, singleTree.name);
            })
        ])
    }
}
module.exports = example;