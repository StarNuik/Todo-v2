let m = require('mithril');
let d = require('./data');

class ui {
    constructor() {
        // this.db = [];
        this.curTreeNum = 0;
        this.curTree = {};
        // this.curTree.order = 0;
        this.treeList = [];
        this.rename = {
            show: false,
            oldName: undefined,
            targetRect: undefined
        };
        this.moveLeaves = {
            show: false,
            branch: undefined
        };
        this.moveBranches = {
            show: false
        };
        this.moveTrees = {
            show: false
        };

        this._readData();        
    }
    // If data.js hasn't fs'ed the file (which is usually the case), ask to give data when finished, otherwise read now
    _readData() {
        if (d.db === undefined) {
            d.callOnLoad = () => {
                this._refresh();
                this.render();
            }
        } else {
            this._refresh();
            this.render();
        }
    }
    // Asks the data.js for the data
    _refresh(treePos = this.curTreeNum) {
        this.treeList = d.pullTreeList();
        this.curTree = d.pullTree(treePos);
        this.curTreeNum = treePos;
    }
    // Whatever
    render() {
        m.redraw();
    }

    // Stops all UI interactions (hides rename box and finishes drag&sort)
    resetStates() {
        this.rename.show = false;
        this.moveLeaves.show = false;
        this.moveBranches.show = false;
        this.moveTrees.show = false;
    }

    // Generic rename box init
    showRenameGeneric(targetRect, oldName) {
        this.resetStates();
        this.rename.show = true;
        this.rename.oldName = oldName;
        this.rename.targetRect = targetRect;
    }

    // Collects the data, necessary for the rename box to function.
    showRenameTree(targetRect, oldName, treePos) {
        this.resetStates();
        this.showRenameGeneric(targetRect, oldName);
        this.rename.call = (newName) => {
            this.toRenameTree(newName, treePos, 'id');
            this.rename.show = false;
        }
    }
    showRenameBranch(targetRect, oldName, branchPos) {
        this.resetStates();
        this.showRenameGeneric(targetRect, oldName);
        this.rename.call = (newName) => {
            this.toRenameBranch(newName, branchPos, 'id');
            this.rename.show = false;
        }
    }
    showRenameLeaf(targetRect, oldName, branchPos, leafPos) {
        this.resetStates();
        this.showRenameGeneric(targetRect, oldName);
        this.rename.call = (newName) => {
            this.toRenameLeaf(newName, leafPos, branchPos, 'id');
            this.rename.show = false;
        }
    }
    
    startLeavesMove(branchPos) {
        this.resetStates();
        this.moveLeaves.show = true;
        this.moveLeaves.branch = branchPos;
    }
    stopLeavesMove() {
        this.moveLeaves.show = false;
    }
    startBranchesMove() {
        this.resetStates();
        this.moveBranches.show = true;
    }
    stopBranchesMove() {
        this.moveBranches.show = false;
    }
    startTreeMove() {
        this.resetStates();
        this.moveTrees.show = true;
    }
    stopTreeMove() {
        this.moveTrees.show = false;
    }

    // ----------CREATE----------
    // Create a new Tree
    toAddTree() {
        this.resetStates();
        d.createTree();
        this._refresh();
    }
    // Create a new Branch
    toAddBranch() {
        this.resetStates();
        d.createBranch(this.curTreeNum);
        this._refresh();
    }
    // Create a new Leaf
    toAddLeaf(branchPos) {
        this.resetStates();
        d.createLeaf(this.curTreeNum, branchPos);
        this._refresh();
    }

    // ----------READ----------
    // Change currently viewed tree
    toSetTree(treePos) {
        this.resetStates();
        this._refresh(treePos);
    }

    // ----------RENAME----------
    // Rename a Tree
    toRenameTree(newName, treePos, targetId) {
        d.renameTree(treePos, newName);
        this._refresh();
    }
    // Rename a Branch
    toRenameBranch(newName, branchPos, targetId) {
        d.renameBranch(this.curTreeNum, branchPos, newName);
        this._refresh();
    }
    // Rename a Leaf
    toRenameLeaf(newName, leafPos, branchPos, targetId) {
        d.renameLeaf(this.curTreeNum, branchPos, leafPos, newName);
        this._refresh();
    }

    // ----------STATE----------
    // Change the state of the Leaf
    toStateLeaf(leafPos, branchPos, targetId) {
        d.stateLeaf(this.curTreeNum, branchPos, leafPos);
        this._refresh();
    }

    // ----------MOVE----------
    // Change the position of the Tree
    toOrderTree(treePos, treeNewPos) {
        d.moveTree(treePos, treeNewPos);
        this._refresh();
    }
    // Change the position of the Branch
    toOrderBranch(branchPos, branchNewPos) {
        d.moveBranch(this.curTreeNum, branchPos, branchNewPos);
        this._refresh();
        // this.render();
    }
    // Change the position of the Leaf
    toOrderLeaf(branchPos, leafPos, leafNewPos) {
        d.moveLeaf(this.curTreeNum, branchPos, leafPos, leafNewPos);
        this._refresh();
        // this.render() // This is a bad bug-prevention. Otherwise, after drag-sorting, state change procs in the last dragged element
    }

    // ----------DELETE----------
    toDeleteTree(treePos, targetId) {
        this.resetStates();
        d.deleteTree(treePos);
        this._refresh(0);
    }
    toDeleteBranch(branchPos, targetId) {
        this.resetStates();
        d.deleteBranch(this.curTreeNum, branchPos);
        this._refresh();
    }
    toDeleteLeaf(leafPos, branchPos, targetId) {
        this.resetStates();
        d.deleteLeaf(this.curTreeNum, branchPos, leafPos);
        this._refresh();
    }
}

let u = new ui();
module.exports = u;