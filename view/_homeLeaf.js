let m = require('mithril');
let d = require('../model/data');
let rmbWrap = require('./_wrapContext');
let contextLeaf = require('./_contextLeaf');

class leaf {
    view(vnode) {
        let label = vnode.attrs.label;
        let state = vnode.attrs.state;
        let leafPos = vnode.attrs.leafPos;
        let parentPos = vnode.attrs.parentPos;

        return m("home-leaf", [
            m(rmbWrap, {display: contextLeaf, send: {leafPos: leafPos, parentPos: parentPos}}, m("home-leaf-label", label)),
            m("home-leaf-tick", {onclick: () => {
                d.toStateLeaf(leafPos, parentPos, 'id')
            }}, state ? "V" : "X")
        ])
    }
}
module.exports = leaf;