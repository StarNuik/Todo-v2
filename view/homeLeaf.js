let m = require('mithril');
let ui = require('../model/uiBase');
let rmbWrap = require('./wrapContext');
let contextLeaf = require('./contextLeaf');

class leaf {
    view(vnode) {
        let label = vnode.attrs.label;
        let state = vnode.attrs.state;
        let leafPos = vnode.attrs.leafPos;
        let branchPos = vnode.attrs.branchPos;
        return m("home-leaf", [
            m(rmbWrap, {display: contextLeaf, send: {
                leafPos: vnode.attrs.leafPos,
                branchPos: branchPos,
                renameTarget: vnode,
                oldName: label
            }}, m("home-leaf-label", label)),
            m("home-leaf-tick", {onclick: () => {
                ui.toStateLeaf(branchPos, leafPos);
            }}, state ? "V" : "X")
        ])
    }
}
module.exports = leaf;