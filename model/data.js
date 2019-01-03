// let m = require('mithril');
// let file = require('../data/storageNew.json');
let fs = require('fs');

// Keeps track of all existing ids
let idList = [];

class GenericItem {
    constructor(newName) {
        this.name = newName === undefined ? "error-NONAMEPROVIDED" : newName;
        this.idSelf();
    }
    idSelf() {
        // Generate an id. Doesn't check for unique-ness
        // There're 62 possible characters. 4 of these make up 14 776 336 possible combinations.
        const generateId = () => {
            const numberOfCharacters = 4;
            let id = "";
            let a = [];
            for (let i = 0;  i < numberOfCharacters; i++) {
                a.push(parseInt(Math.random() * 62, 10));
            }
            for (let i = 0; i < numberOfCharacters; i++) {
                id = id + getChar(a[i]);
            }
            return id;
        }
        // Convert a number between 0 inclusive and 62 exclusive to 0-10,a-z,A-Z
        const getChar = (val) => {
            if  (val >= 0 && val < 10) {
                return val;
            } else if (val >= 10 && val < 36) {
                return String.fromCharCode(55 + val);
            } else if (val >= 36 && val < 62) {
                return String.fromCharCode(61 + val);
            } else {
                return 0;
            }
        }
        // Checks if current id is unique
        const notUnique = (checkId) => {
            return idList.some((currId) => {
                return checkId === currId;
            });
        }

        this.id = generateId();
        // Generates new ids until id is unique
        while (notUnique(this.id)) {
            this.id = generateId();
        }
        idList.push(this.id);
    }
}
class Tree extends GenericItem {
    constructor(newName) {
        super(newName);
        this.branches = [];
    }
}
class Branch extends GenericItem {
    constructor(newName) {
        super(newName);
        this.leaves = [];
    }
}
class Leaf extends GenericItem {
    constructor(newName) {
        super(newName);
        this.state = false;
    }
}

//Actual data handling goes here
class Data {
    constructor() {
        // this.db = []; // Lets the UI know if the db is an udefined
        this.callOnLoad = () => {};

        this._readData();
    }
    // Read the file
    _readData() {
        fs.readFile('./data/storageNew.json', (err, res) => {
            if (err) {
                console.log(err);
                // Some error handling should go here. Maybe new file creation and a UI pop-up?
            } else {
                let rawData = JSON.parse(res);
                this.db = assignData(rawData);

                // Calls the UI when the data is loaded
                this.callOnLoad();
            }
        });
        // Class-ify loaded data
        // A somewhat dirty implementation of a recursive function. Sorry
        const assignData = (data) => {
            // Assign Tree related attributes, assign every child Branch
            const assignTree = (treeRaw) => {
                let treeRes = new Tree(treeRaw.name);
                treeRaw.branches.forEach((branchRaw) => {
                    treeRes.branches.push(assignBranch(branchRaw));
                });
                return treeRes;
            }
            // Assign Branch related attributes, assign every child Leaf
            const assignBranch = (branchRaw) => {
                let branchRes = new Branch(branchRaw.name);
                branchRaw.leaves.forEach((leafRaw) => {
                    branchRes.leaves.push(assignLeaf(leafRaw));
                });
                return branchRes;
            }
            // Assign Leaf related attributes(, poke upwards)
            const assignLeaf = (leafRaw) => {
                let leafRes = new Leaf(leafRaw.name);
                leafRes.state = leafRaw.state;
                return leafRes;
            }

            let resultData = [];
            data.forEach((treeRaw) => {
                resultData.push(assignTree(treeRaw));
            });
            return resultData;
        }
    }

    // Sends a single tree to the UI
    pullTree(treePos) {
        let out = this.db[treePos];
        return out;
    }
    // Sends a list of available trees to the UI
    pullTreeList() {
        let list = this.db.map((item) => {
            let listItem = {};
            listItem.name = item.name;
            return listItem;
        });
        return list;
    }

    // DB operations
    // Creation
    createTree() {
        let treeNew = new Tree("New tree", this.db.length);
        this.db.push(treeNew);
    }
    createBranch(treePos) {
        let target = this.db[treePos].branches;
        let branchNew = new Branch("New branch", target.length);
        target.push(branchNew);
    }
    createLeaf(treePos, branchPos) {
        let target = this.db[treePos].branches[branchPos].leaves;
        let leafNew = new Leaf("New leaf", target.length);
        target.push(leafNew);
    }

    // Renaming
    renameTree(treePos, newName) {
        this.db[treePos].name = newName;
    }
    renameBranch(treePos, branchPos, newName) {
        this.db[treePos].branches[branchPos].name = newName;
    }
    renameLeaf(treePos, branchPos, leafPos, newName) {
        this.db[treePos].branches[branchPos].leaves[leafPos].name = newName;
    }

    // Deletes an item
    _deleteGeneric(target, pos) {
        // Delete target's id from the idList, just in case
        let id = target[pos].id;
        idList.splice(idList.indexOf(id), 1);

        // Delete the item itself
        target.splice(pos, 1);
    }
    deleteTree(treePos) {
        this._deleteGeneric(this.db, treePos);
    }
    deleteBranch(treePos, branchPos) {
        this._deleteGeneric(this.db[treePos].branches, branchPos);
    }
    deleteLeaf(treePos, branchPos, leafPos) {
        this._deleteGeneric(this.db[treePos].branches[branchPos].leaves, leafPos);
    }

    // Changes the state of the leaf
    stateLeaf(treePos, branchPos, leafPos) {
        let leaf = this.db[treePos].branches[branchPos].leaves[leafPos];
        leaf.state = !leaf.state;
    }

    // Moves an item. Called on item drop during the drag.
    _moveGeneric(target, pos, posNew) {
        // Delete and store the item
        let item = target.splice(pos, 1)[0];
        // Insert the item at the new position
        target.splice(posNew, 0, item);
    }
    moveLeaf(treePos, branchPos, leafPos, leafPosNew) {
        this._moveGeneric(this.db[treePos].branches[branchPos].leaves, leafPos, leafPosNew)
    }
    moveBranch(treePos, branchPos, branchPosNew) {
        this._moveGeneric(this.db[treePos].branches, branchPos, branchPosNew);
    }
    moveTree(treePos, treePosNew) {
        this._moveGeneric(this.db, treePos, treePosNew);
    }
}

let d = new Data;

module.exports = d;