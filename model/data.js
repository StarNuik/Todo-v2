// let m = require('mithril');
// let file = require('../data/storageNew.json');
let fs = require('fs');

// General utility crap goes here
class Util {
    constructor() {
        //
    }
    // Generate an id. Doesn't check for unique-ness
    // There're 62 possible characters. 4 of these make up 14 776 336 possible combinations.
    static generateId() {
        let numberOfCharacters = 4;
        let id = "";
        let a = [];
        for (let i = 0;  i < numberOfCharacters; i++) {
            a.push(parseInt(Math.random() * 62, 10));
        }
        for (let i = 0; i < numberOfCharacters; i++) {
            id = id + this.getChar(a[i]);
        }
        return id;
    }
    // Convert a number between 0 inclusive and 62 exclusive to 0-10,a-z,A-Z
    static getChar(val)  {
        if  (val >= 0 && val < 10)
            return val;
        else if (val >= 10 && val < 36)
            return String.fromCharCode(55 + val);
        else if (val >= 36 && val < 62)
            return String.fromCharCode(61 + val);
        else
            return 0;
    }
}

// Keeps track of all existing ids
let idList = [];

class GenericItem {
    constructor(newName, newOrder) {
        this.name = newName === undefined ? "error-NONAME" : newName;
        this.idSelf();
        this.order = newOrder === undefined ? 0 : newOrder;
    }
    idSelf() {
        // Checks if current id is unique
        function notUnique(checkId) {
            return idList.some((currId) => {
                return checkId === currId;
            });
        }
        this.id = Util.generateId();
        // Generates new ids until id is unique
        while (notUnique(this.id)) {
            this.id = Util.generateId();
        }
        idList.push(this.id);
    }
}
class Tree extends GenericItem {
    constructor(newName, newOrder) {
        super(newName, newOrder);
        this.branches = [];
    }
    sortBranches() {
        this.branches.sort(this.compare);
    }
    compare(branch1, branch2) {
        return branch1.order - branch2.order;
    }
    setOrder() {
        this.branches.forEach((branch, i) => {
            branch.order = i;
        });
    }
}
class Branch extends GenericItem {
    constructor(newName, newOrder) {
        super(newName, newOrder);
        this.leaves = [];
    }
    sortLeaves() {
        this.leaves.sort(this.compare);
    }
    compare(leaf1, leaf2) {
        return leaf1.order - leaf2.order;
    }
    setOrder() {
        this.leaves.forEach((leaf, i) => {
            leaf.order = i;
        });
    }
}
class Leaf extends GenericItem {
    constructor(newName, newOrder) {
        super(newName, newOrder);
        this.state = false;
    }
}

//Actual data handling goes here
class Data {
    constructor() {
        this.db = [];
        this.dataReady = false;
        this.callOnLoad = () => {};

        this.readData();
    }
    // Read the file
    readData() {
        fs.readFile('./data/storageNew.json', (err, res) => {
            if (err) {
                console.log(err);
                // Some read-error UI things should be here
            } else {
                let rawData = JSON.parse(res);
                this.db = this.assignData(rawData);

                this.callOnLoad();
                this.dataReady = true;
            }
        });
    }
    // Class-ify loaded data
    // A somewhat dirty implementation of a recursive function. Sorry
    assignData(rawData) {
        // Assign Tree related attributes, assign every child Branch
        function assignTree(rawTree, order) {
            let newTree = new Tree(rawTree.name, order);
            rawTree.branches.forEach((rawBranch, i) => {
                newTree.branches.push(assignBranch(rawBranch, i));
            });
            return newTree;
        }
        // Assign Branch related attributes, assign every child Leaf
        function assignBranch(rawBranch, order) {
            let newBranch = new Branch(rawBranch.name, order);
            rawBranch.leaves.forEach((rawLeaf, i) => {
                newBranch.leaves.push(assignLeaf(rawLeaf, i));
            });
            return newBranch;
        }
        // Assign Leaf related attributes(, poke upwards)
        function assignLeaf(rawLeaf, order) {
            let newLeaf = new Leaf(rawLeaf.name, order);
            newLeaf.state = rawLeaf.state;
            return newLeaf;
        }

        let newData = [];
        rawData.forEach((rawTree, i) => {
            newData.push(assignTree(rawTree, i));
        });
        return newData;
    }
    // Sends a single tree to the ui interface
    pullTree(treePos) {
        return this.db[treePos];
    }
    // Sends a list of available tree to the ui interface
    pullTreeList() {
        let list = this.db.map((item) => {
            let listItem = {};
            listItem.name = item.name;
            listItem.order = item.order;
            return listItem;
        });
        return list;
    }
    // setOrder for the main array
    setOrder() {
        this.db.forEach((tree, i) => {
            tree.order = i;
        });
    }

    // DB operations
    createTree() {
        let newTree = new Tree("New tree", this.db.length);
        this.db.push(newTree);
        // Call for save, pls
    }
    createBranch(parentTreePos) {
        let parentTree = this.db[parentTreePos];
        let newBranch = new Branch("New branch", parentTree.branches.length);
        parentTree.branches.push(newBranch);
        // Call for save, pls

    }
    createLeaf(parentTreePos, parentBranchPos) {
        let parentBranch = this.db[parentTreePos].branches[parentBranchPos];
        let newLeaf = new Leaf("New leaf", parentBranch.leaves.length);
        parentBranch.leaves.push(newLeaf);
        // Call for save, pls
    }
    renameTree(treePos, newName) {
        // How about non-mutative changes?
        // Checking for correct position, but is it actually necessary?
        // Is id check actually necessary as well???
        // Mithril only gets pos numbers that are derived from array.map, so there shouldn't be a higher num.
        // And to request a change in an entry with a different position than id, you'd need to actually mess with the soft itself
        // Might be a good idea to handle 'false'-s on setting the variable though
        // if (targetPos >= 0 && targetPos < this.db.length) {
        //     let posId = this.db[targetPos].id;
        //     if (targetId === posId) {
        //         this.db[targetPos].name = newName;
        //     } else {
        //         // Some actual error handling will be needed later down the line!!!
        //         console.log("Something went totally wrong! Target id: " + targetId + " / Pos id: " + posId);
        //     }
        // } else {
        //     console.log("Something went really wrong! Tried to acces Tree #" + targetPos + ", but there're only " + this.db.length + " trees")
        // }
        this.db[treePos].name = newName;
    }
    renameBranch(treePos, branchPos, newName) {
        // Currently with no id check, as I can't decide whether it's actually needed
        this.db[treePos].branches[branchPos].name = newName;
    }
    renameLeaf(treePos, branchPos, leafPos, newName) {
        this.db[treePos].branches[branchPos].leaves[leafPos].name = newName;
    }
    deleteTree(treePos) {
        this.db.splice(treePos, 1);
        // If id check is present, don't forget to delete ids from the idList!
    }
    deleteBranch(treePos, branchPos) {
        this.db[treePos].branches.splice(branchPos, 1);
        // If id check is present, don't forget to delete ids from the idList!
    }
    deleteLeaf(treePos, branchPos, leafPos) {
        this.db[treePos].branches[branchPos].leaves.splice(leafPos, 1);
        // If id check is present, don't forget to delete ids from the idList!
    }
    stateLeaf(treePos, branchPos, leafPos) {
        let leaf = this.db[treePos].branches[branchPos].leaves[leafPos];
        leaf.state = !leaf.state;
    }
    reorderLeaf(treePos, branchPos, leafPos, leafNewPos) {
        let parentBranch = this.db[treePos].branches[branchPos];
        let movedLeaf = parentBranch.leaves[leafPos];
        parentBranch.leaves.splice(leafPos, 1);
        parentBranch.leaves.splice(leafNewPos, 0, movedLeaf);
        parentBranch.setOrder();
        // console.log(parentBranch.leaves);
        // console.log(this.db[treePos].branches[branchPos].leaves)
        // this.db[treePos].branches[branchPos].sortLeaves();
        // console.log(this.db[treePos].branches[branchPos].leaves)
    }
    reorderBranch(treePos, branchPos, branchNewPos) {
        let parentTree = this.db[treePos];
        let movedBranch = parentTree.branches[branchPos];
        parentTree.branches.splice(branchPos, 1);
        parentTree.branches.splice(branchNewPos, 0, movedBranch);
        parentTree.setOrder();
    }
    reorderTree(treePos, treeNewPos) {
        let target = this.db[treePos];
        this.db.splice(treePos, 1);
        this.db.splice(treeNewPos, 0, target);
        this.db.forEach((tree, i) => {
            tree.order = i;
        });
    }
}

let d = new Data;

module.exports = d;