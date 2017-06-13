import { Node } from './Node';

function findNode(id, nodes) {
    return nodes.find((node) => node.id === id);
}

function getRootNodes(nodes) {
    return nodes.filter((node) => {
        let isRoot = nodes.every((n) => n.nodes.indexOf(node.id) === -1);
        return isRoot;
    });
}

function $(selector) {
    return document.querySelectorAll(selector);
}

export class Tree {
    constructor(data) {
        this.nodes = data;
        this.rootNodes = getRootNodes(data);
        this.render(this.rootNodes, $('.container')[0]);       
    }

    render(nodes, parent) {
        let allNodes = this.nodes;

        nodes.forEach((n) => {
            let node = new Node({
                id: n.id,
                name: n.name,
                checked: n.isChecked,
                children: n.nodes.map((nodeId, index) => findNode(nodeId, allNodes)).filter((node) => node)
            });
            let childrenContainer = node.render(parent);
            if (childrenContainer) {
                this.render(node.children, childrenContainer);
            }
        }, this);
    }

    update(treeData) {

    }

}