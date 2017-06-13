import TreeModel from "./data";
import { Tree } from "./js/Tree";

require('./styles/app.sass');


function $(selector) {
    return document.querySelectorAll(selector);
}

let tree = new Tree(TreeModel, $('.container')[0]);
tree.render();


