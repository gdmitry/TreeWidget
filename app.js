import TreeModel from "./data";
import { Tree } from "./js/Tree";

require('./styles/app.sass');

let tree = new Tree(TreeModel, document.querySelectorAll('.container')[0]);
tree.render();


tree.updateNode({
    "id": 3,
    "name": "My Documents1",
    "isChecked": true,
    "nodes": [8, 6, 7]
})