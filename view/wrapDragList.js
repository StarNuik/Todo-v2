let m = require('mithril');
let ui = require('../model/uiBase');
const Sortable = require('@shopify/draggable').Sortable;

// Usage example:                              \/ The function to call every time an element is moved
// m(drag, {sortCall: (oldIndex, newIndex) => { }}, [ ])
//                  Uniform array of movable objects /\

class sortDragList {
    oncreate(vnode) {
        let sortable = new Sortable(vnode.dom, {
            draggable: 'wrap-drag-item'
        });
        sortable.on('sortable:sort', (e) => {
            // e.data.source.innerHTML = ' ';
        });
        sortable.on('sortable:stop', (e) => {
            vnode.attrs.sortCall(e.data.oldIndex, e.data.newIndex);
        });
    }
    view(vnode) {
        return m('wrap-drag', vnode.children.map((elem) => {
            // Cast mithril-related keys on the drag elements | and wipe them from children just in case
            let key = elem.key;
            elem.key = undefined;
            return m('wrap-drag-item', {key: key}, elem);
        }))
    }
}
module.exports = sortDragList;