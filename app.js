import TreeModel from "./data";
import Tree from "./js/Tree";

require('./styles/app.sass');

let tree = new Tree(TreeModel, document.querySelectorAll('.container')[0]);
tree.render();


// Update a node
setTimeout(() => {
    tree.updateNode({
        "id": 3,
        "name": "My Reports",
        "isChecked": true,
        "nodes": [8, 6, 7]
    });
}, 8000);

tree.subscribe('checkStatusChanged', (data) => {
    console.log('Checkbox clicked: ', data);
});

tree.subscribe('expandStatusChanged', (data) => {
    console.log('Expanded: ', data);
});