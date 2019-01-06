let m = require('mithril');
let ui = require('../model/uiBase');

let leaf = require("./homeLeaf");
let dragWrap = require('./wrapDragList');
let rmbWrap = require('./wrapContext');
let contextBranch = require('./contextBranch');

class branch {
    view(vnode) {
        this.label = vnode.attrs.label;
        this.leaves = vnode.attrs.leaves;
        this.branchPos = vnode.attrs.branchPos;
        this.vnode = vnode;
        
        return m("home-branch", [
            this.labelElem(),
            this.leavesElem(),
            this.finishSort(),
            m("home-branch-add", [
                m("home-branch-add-label", "New task"),
                m("home-branch-add-button", {onclick: () => {
                    ui.toAddLeaf(this.branchPos);                    
                }},"+")
            ])
        ])
    }

    labelElem() {
        return m(rmbWrap, {display: contextBranch, send: {branchPos: this.branchPos, renameTarget: this.vnode, oldName: this.label}}, m("home-branch-label", this.label));
    }
    finishSort() {
        if (ui.moveLeaves.show && ui.moveLeaves.branch === this.branchPos) {
            return m('home-branch-finishMove', {onclick: () => {
                ui.stopLeavesMove();
            }}, 'Finish moving!');
        } else {
            return '';
        }
    }
    leavesElem() {
        return this.checkSort();
    }
    checkSort() {
        if (ui.moveLeaves.show) {
            return m(dragWrap, {sortCall: (oldIndex, newIndex) => {
                ui.toOrderLeaf(this.branchPos, oldIndex, newIndex);
            }}, this.drawLeaves())
        } else {
            return this.drawLeaves();
        }
    }
    drawLeaves() {
        return this.leaves.map((singleLeaf, i) => {
            return m(leaf, {label: singleLeaf.name, state: singleLeaf.state, leafPos: i, branchPos: this.branchPos, key: singleLeaf.id})
        });
    }
}
module.exports = branch;