let m = require('mithril');
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
    // lookForBranch(targetId) {
    //     let num;
    //     let res = this.branches.some((elem, i, a) => {
    //         if (elem.id == targetId) {
    //             num = i;
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     });
    //     if (res) {
    //         return {err: false, num: num, res: this.branches[num]};
    //     } else {
    //         return {err: true};
    //     }
    // }
}
class Branch extends GenericItem {
    constructor(newName, newOrder) {
        super(newName, newOrder);
        this.leaves = [];
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
        this.currentTree = 0;
        this.readData();
    }
    // Custom render, in case additional daata handling is required before redrawing
    render() {
        m.redraw();
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
                this.initData();
                this.render();
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
    // Initialize all the variables
    initData() {
        if (this.db.length > 0) {
            this.getTree(0);
        }
    }
    // Change currently open tree
    getTree(treePos) {
        if (treePos >= 0 && treePos < this.db.length) {
            this.currentTree = treePos;
        } else {
            // Error handling is required right here!
            // UI asked for a Tree with an order num but such Tree doesn't exist
        }
    }
    createTree() {
        let newTree = new Tree("New tree", this.db.length);
        this.db.push(newTree);
        // Call for save, pls
    }
    createBranch() {
        let parent = this.db[this.currentTree];
        let newBranch = new Branch("New branch", parent.branches.length);
        parent.branches.push(newBranch);
        // Call for save, pls

    }
    createLeaf(parentBranchPos) {
        let parent = this.db[this.currentTree].branches[parentBranchPos];
        let newLeaf = new Leaf("New leaf", parent.leaves.length);
        parent.leaves.push(newLeaf);
        // Call for save, pls
    }
    renameTree(newName, targetPos, targetId) {
        // How about non-mutative changes?
        // Checking for correct position, but is it actually necessary?
        // Is id check actually necessary as well???
        // Mithril only gets pos numbers that are derived from array.map, so there shouldn't be a higher num.
        // And to request a change in an entry with a different position than id, you'd need to actually mess with the soft itself
        // Might be a good idea to handle 'false'-s on setting the variable though
        if (targetPos >= 0 && targetPos < this.db.length) {
            let posId = this.db[targetPos].id;
            if (targetId === posId) {
                this.db[targetPos].name = newName;
            } else {
                // Some actual error handling will be needed later down the line!!!
                console.log("Something went totally wrong! Target id: " + targetId + " / Pos id: " + posId);
            }
        } else {
            console.log("Something went really wrong! Tried to acces Tree #" + targetPos + ", but there're only " + this.db.length + " trees")
        }
    }
    renameBranch(newName, targetPos, targetId) {
        // Currently with no id check, as I can't decide whether it's actually needed
        this.db[this.currentTree].branches[targetPos].name = newName;
    }
    renameLeaf(newName, targetPos, parentPos, targetId) {
        this.db[d.currentTree].branches[parentPos].leaves[targetPos].name = newName;
    }

    // UI calls
    // ----------CREATE----------
    // Create a new Tree
    toAddTree() {
        this.createTree();
    }
    // Create a new Branch
    toAddBranch() {
        this.createBranch();
    }
    // Create a new Leaf
    toAddLeaf(parentBranchPos) {
        this.createLeaf(parentBranchPos);
    }

    // ----------READ----------
    // Change currently viewed tree
    toSetTree(treePos) {
        this.getTree(treePos);
    }

    // ----------UPDATE----------
    // Rename a Tree
    toRenameTree(newName, targetPos, targetId) {
        this.renameTree(newName, targetPos, targetId);
    }
    // Rename a Branch
    toRenameBranch(newName, targetPos, targetId) {
        this.renameBranch(newName, targetPos, targetId);
    }
    // Rename a Leaf
    toRenameLeaf(newName, targetPos, parentPos, targetId) {
        this.renameLeaf(newName, targetPos, parentPos, targetId);
    }

    // Change the state of the Leaf
    toStateLeaf() {
        //
    }

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
    toDeleteTree(targetPos, targetId) {
        //
    }
    toDeleteBranch(targetPos, targetId) {
        //
    }
    toDeleteLeaf(targetPos, targetId) {
        //
    }
}

let d = new Data;

module.exports = d;