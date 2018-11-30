let m = require('mithril');
let d = require('./data');

class ui {
    constructor() {
        // this.db = [];
        // this.curTreeNum = 0;
        this.curTree = {};
        // this.curTree.order = 0;
        this.treeList = [];
        this.rename = {};
        this.rename.show = false;

        this.readData();        
    }
    // If data.js hasn't fs'ed the save (which is usually the case), ask to give data when finished, otherwise read now
    readData() {
        if (!d.dataReady) {
            d.callOnLoad = () => {this.readCall();}
        } else {
            this.readCall()
        }
    }
    // Get the data (unlike refresh it actually is useless, I should get rid of it since this.curTree will be an udefined whether I pull it or not)
    readCall() {
        this.treeList = d.pullTreeList();
        if (this.treeList !== undefined) {
            this.curTree = d.pullTree(0);
        }
        this.render();
    }
    // Pulls the data
    refresh(treePos = this.curTree.order) {
        this.treeList = d.pullTreeList();
        this.curTree = d.pullTree(treePos);
    }
    // Whatever
    render() {
        m.redraw();
    }

    // Collects the data, necessary for the rename box to function.
    showRenameTree(targetRect, oldName, treePos) {
        this.rename.show = true;
        this.rename.oldName = oldName;
        this.rename.targetRect = targetRect;
        this.rename.call = (newName) => {
            this.toRenameTree(newName, treePos, 'id');
            this.rename.show = false;
        }
    }
    showRenameBranch(targetRect, oldName, branchPos) {
        this.rename.show = true;
        this.rename.oldName = oldName;
        this.rename.targetRect = targetRect;
        this.rename.call = (newName) => {
            this.toRenameBranch(newName, branchPos, 'id');
            this.rename.show = false;
        }
    }
    showRenameLeaf(targetRect, oldName, branchPos, leafPos) {
        this.rename.show = true;
        this.rename.oldName = oldName;
        this.rename.targetRect = targetRect;
        this.rename.call = (newName) => {
            this.toRenameLeaf(newName, leafPos, branchPos, 'id');
            this.rename.show = false;
        }
    }    

    // ----------CREATE----------
    // Create a new Tree
    toAddTree() {
        d.createTree();
        this.refresh();
    }
    // Create a new Branch
    toAddBranch() {
        d.createBranch(this.curTree.order);
        this.refresh();
    }
    // Create a new Leaf
    toAddLeaf(branchPos) {
        d.createLeaf(this.curTree.order, branchPos);
        this.refresh();
    }

    // ----------READ----------
    // Change currently viewed tree
    toSetTree(treePos) {
        this.refresh(treePos);
    }

    // ----------RENAME----------
    // Rename a Tree
    toRenameTree(newName, treePos, targetId) {
        d.renameTree(treePos, newName);
        this.refresh();
    }
    // Rename a Branch
    toRenameBranch(newName, branchPos, targetId) {
        d.renameBranch(this.curTree.order, branchPos, newName);
        this.refresh();
    }
    // Rename a Leaf
    toRenameLeaf(newName, leafPos, branchPos, targetId) {
        d.renameLeaf(this.curTree.order, branchPos, leafPos, newName);
        this.refresh();
    }

    // ----------STATE----------
    // Change the state of the Leaf
    toStateLeaf(leafPos, branchPos, targetId) {
        d.stateLeaf(this.curTree.order, branchPos, leafPos);
        this.refresh();
    }

    // ----------MOVE----------
    // Change the position of the Tree
    toOrderTree() {
        //
    }
    // Change the position of the Branch
    toOrderBranch() {
        //
    }
    // Change the position of the Leaf
    toOrderLeaf() {
        //
    }

    // ----------DELETE----------
    toDeleteTree(treePos, targetId) {
        d.deleteTree(treePos);
        this.refresh(0);
    }
    toDeleteBranch(branchPos, targetId) {
        d.deleteBranch(this.curTree.order, branchPos);
        this.refresh();
    }
    toDeleteLeaf(leafPos, branchPos, targetId) {
        d.deleteLeaf(this.curTree.order, branchPos, leafPos);
        this.refresh();
    }
}

let u = new ui();
module.exports = u;