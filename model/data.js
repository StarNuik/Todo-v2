let m = require('mithril');
// let file = require('../data/storageNew.json');
let fs = require('fs');

class data {
    constructor() {
        this.branches = [];
        this.rawData = [];
        this.dataReady = false;
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
            }
            this.rawData = JSON.parse(res);
            this.dataReady = true;
            this.initData();
        });
    }
    // Initialize all the variables
    initData() {
        if (this.rawData.length > 0) {
            this.getBranches(0);
        }
    }
    // Change currently open tree
    getBranches(treeNum) {
        // if (this.dataReady) {
        this.branches = this.rawData[treeNum].branches;
        this.render();
        // }
        // console.log(treeNum)
        // console.log(this.branches)
    }
    // UI call
    toSetTree(treeNum) {
        this.getBranches(treeNum);
    }
    toAddTree() {
        console.log('add tree here')
    }
    toAddBranch() {
        console.log('add branch here')
    }
}
let d = new data;
module.exports = d;