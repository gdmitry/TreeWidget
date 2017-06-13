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

function renderNodeList(nodes, parent) {
    nodes.forEach((n) => {
        let node = new Node({
            id: n.id,
            name: n.name,
            checked: n.isChecked,
            children: n.nodes.map((nodeId, index) => findNode(nodeId, this.nodes)).filter((node) => node)
        });
        let childrenContainer = node.render(parent);
        if (childrenContainer) {
            renderNodeList.call(this, node.children, childrenContainer);
        }
    }, this);
}

export class Tree {
    constructor(data, container) {
        this.nodes = data;
        this.htmlContainer = container;
        this.htmlContainer.addEventListener('click', (e) => {
            if (e.target && e.target.type !== 'checkbox') {
                if (e.target.parentElement) {
                    e.target.parentElement.classList.toggle('collapsed');
                }
            } else {
                this.checked = true;
            }
            e.stopPropagation();
            console.log(e.target);
        });
    }

    render() {
        let rootNodes = getRootNodes(this.nodes);
        renderNodeList.call(this, rootNodes, this.htmlContainer);
    }

    update(treeData) {

    }
}