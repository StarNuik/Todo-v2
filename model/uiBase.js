let m = require('mithril');
let d = require('./data');

class ui {
    constructor() {
        // this.db = [];
        this.treeNum = 0; 
        this.treeCurrent = {};
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
        const load = () => {
            this._refresh();
            this._render();
        }
        if (d.db === undefined) {
            d.callOnLoad = load;
        } else {
            load();
        }
    }
    // Asks the data.js for the data
    _refresh(treePos = this.treeNum) {
        this.treeList = d.pullTreeList();
        this.treeCurrent = d.pullTree(treePos);
        this.treeNum = treePos;
    }
    // Whatever
    _render() {
        m.redraw();
    }

    // Stops all UI interactions (hides rename box and finishes drag&sort)
    _resetStates() {
        this.rename.show = false;
        this.moveLeaves.show = false;
        this.moveBranches.show = false;
        this.moveTrees.show = false;
    }

    // Generic rename box init
    _renameGeneric(targetRect, oldName) {
        this._resetStates();
        this.rename.show = true;
        this.rename.oldName = oldName;
        this.rename.targetRect = targetRect;
    }

    // Collects the data, necessary for the rename box to function.
    showRenameTree(targetRect, oldName, treePos) {
        this._renameGeneric(targetRect, oldName);

        this.rename.call = (newName) => {
            this.toRenameTree(newName, treePos);
            this.rename.show = false;
        }
    }
    showRenameBranch(targetRect, oldName, branchPos) {
        this._renameGeneric(targetRect, oldName);

        this.rename.call = (newName) => {
            this.toRenameBranch(newName, branchPos);
            this.rename.show = false;
        }
    }
    showRenameLeaf(targetRect, oldName, branchPos, leafPos) {
        this._renameGeneric(targetRect, oldName);

        this.rename.call = (newName) => {
            this.toRenameLeaf(newName, branchPos, leafPos);
            this.rename.show = false;
        }
    }

    // Changes the state of the Leaf
    toStateLeaf(branchPos, leafPos) {
        d.stateLeaf(this.treeNum, branchPos, leafPos);
        // this._refresh();
    }

    // Changes currently viewed tree
    toSetTree(treePos) {
        this._resetStates();
        this._refresh(treePos);
    }
    
    // Tells the drag&sort component to show itself
    startTreeMove() {
        this._resetStates();
        this.moveTrees.show = true;
    }
    startBranchesMove() {
        this._resetStates();
        this.moveBranches.show = true;
    }
    startLeavesMove(branchPos) {
        this._resetStates();
        this.moveLeaves.show = true;
        this.moveLeaves.branch = branchPos;
    } 

    // Tells the component to hide
    stopTreeMove() {
        this.moveTrees.show = false;
    }
    stopBranchesMove() {
        this.moveBranches.show = false;
    }
    stopLeavesMove() {
        this.moveLeaves.show = false;
    }

    // Creates items
    toAddTree() {
        this._resetStates();
        d.createTree();
        this._refresh();
    }
    toAddBranch() {
        this._resetStates();
        d.createBranch(this.treeNum);
        // this._refresh();
    }
    toAddLeaf(branchPos) {
        this._resetStates();
        d.createLeaf(this.treeNum, branchPos);
        // this._refresh();
    }

    // Renames items
    toRenameTree(newName, treePos) {
        d.renameTree(treePos, newName);
        this._refresh();
    }
    toRenameBranch(newName, branchPos) {
        d.renameBranch(this.treeNum, branchPos, newName);
        // this._refresh();
    }
    toRenameLeaf(newName, branchPos, leafPos) {
        d.renameLeaf(this.treeNum, branchPos, leafPos, newName);
        // this._refresh();
    }

    // Changes the position of items
    toOrderTree(treePos, treeNewPos) {
        d.moveTree(treePos, treeNewPos);
        this._refresh();
    }
    toOrderBranch(branchPos, branchNewPos) {
        d.moveBranch(this.treeNum, branchPos, branchNewPos);
        // this._refresh();
        // this.render();
    }
    toOrderLeaf(branchPos, leafPos, leafPosNew) {
        d.moveLeaf(this.treeNum, branchPos, leafPos, leafPosNew);
        // this._refresh();
        // this.render() // This is a bad bug-prevention. Otherwise, after drag-sorting, state change procs in the last dragged element
    }

    // Deletes items
    toDeleteTree(treePos) {
        this._resetStates();
        d.deleteTree(treePos);
        this._refresh(0);
    }
    toDeleteBranch(branchPos) {
        this._resetStates();
        d.deleteBranch(this.treeNum, branchPos);
        // this._refresh();
    }
    toDeleteLeaf(branchPos, leafPos) {
        this._resetStates();
        d.deleteLeaf(this.treeNum, branchPos, leafPos);
        // this._refresh();
    }

    // History calls
    toUndo() {
        this._resetStates();
        d.historyUndo();
    }
    toRedo() {
        this._resetStates();
        d.historyRedo();
    }
}

let u = new ui();
module.exports = u;