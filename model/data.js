let m = require('mithril');
// let file = require('../data/storageNew.json');
let fs = require('fs');

// General utility crap goes here
class Util {
    constructor() {
        //
    }
    // Generate an id. Doesn't check for unique-ness
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
    static searchTreeForBranch(searchHere, suspectId) {

    }
}
// let u = new Util;

class GenericItem {
    constructor(newName, newOrder) {
        this.name = newName === undefined ? "error-NONAME" : newName;
        this.idSelf();
        this.order = newOrder === undefined ? 0 : newOrder;
    }
    idSelf() {
        this.id = Util.generateId();
        // Add unique id check at some point here
    }
}
class Tree extends GenericItem {
    constructor(newName, newOrder) {
        super(newName, newOrder);
        this.branches = [];
    }
    // lookForBranch(suspectId) {
    //     let num;
    //     let res = this.branches.some((elem, i, a) => {
    //         if (elem.id == suspectId) {
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
        this.rawData = [];
        this.currentTree = {};
        this.readData();
    }
    // Custom render, in case additional mutation is needed before redrawing
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
                this.rawData = JSON.parse(res);
                this.initData();
                this.render();
            }
        });
    }
    // Initialize all the variables
    initData() {
        if (this.rawData.length > 0) {
            this.getTree(0);
        }
    }
    // Change currently open tree
    getTree(treePos) {
        this.currentTree = this.rawData[treePos];
    }
    createTree() {
        let newTree = new Tree("New tree", this.rawData.length);
        this.rawData.push(newTree);
        // Call for save, pls
        console.log(newTree)
    }
    createBranch(parentPos) {
        let parent = this.rawData[parentPos];
        let newBranch = new Branch("New branch", parent.branches.length);
        parent.branches.push(newBranch);
        // Call for save, pls
        console.log(newBranch);

    }
    createLeaf(parentTreePos, parentBranchPos) {
        let parent = this.rawData[parentTreePos].branches[parentBranchPos];
        let newLeaf = new Leaf("New leaf", parent.leaves.length);
        parent.leaves.push(newLeaf);
        // Call for save, pls
        console.log(newLeaf)
    }

    // UI calls
    // Change currently viewed tree
    toSetTree(treePos) {
        this.getTree(treePos);
    }
    // Create a new tree
    toAddTree() {
        this.createTree();
    }
    // Create a new branch
    toAddBranch(parentPos) {
        // console.log('add branch here: ' + parentPos)
        this.createBranch(parentPos);
    }
    // Create a new leaf
    toAddLeaf(parentTreePos, parentBranchPos) {
        this.createLeaf(parentTreePos, parentBranchPos);
        // console.log('add leaf here: ' + parentPos)
    }
}

let d = new Data;

module.exports = d;