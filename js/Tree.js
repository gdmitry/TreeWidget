import { Node } from './Node';

function findNode(nodes, id) {
    return nodes.find((node) => node.id === id);
}

function getRootNodes(nodes) {
    return nodes.filter((node) => {
        let isRoot = nodes.every((n) => n.nodes.indexOf(node.id) === -1);
        return isRoot;
    });
}

export class Tree {
    constructor(data) {
        this.nodes = data;
        this.rootNodes = getRootNodes(data);
        this.render(this.rootNodes, body);
    }

    render(nodes, parent) {
        nodes.forEach((n) => {
            let node = new Node({
                id: n.id,
                name: n.name,
                checked: n.isChecked,
                children: n.nodes.map((nodeId, index, nodes) => findNode(nodeId, nodes))
            });
            let nextParent = node.render(parent);
            if (nextParent) {
                this.render(node.children, nextParent);
            }
        }, this);
    }

    update(treeData) {

    }

}