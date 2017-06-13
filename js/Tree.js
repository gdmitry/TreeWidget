import { Node } from './Node';

function findNode(id, nodes) {
    return nodes.find((node) => node.id == id);
}

function getRootNodes(nodes) {
    return nodes.filter((node) => {
        let isRoot = nodes.every((n) => n.nodes.indexOf(node.id) === -1);
        return isRoot;
    });
}

function renderNodeList(nodes, parentElement) {
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
    nodes.forEach((n) => {
        let node = new Node({
            id: n.id,
            name: n.name,
            checked: n.isChecked,
            children: n.nodes.map((nodeId, index) => findNode(nodeId, this.nodes)).filter((node) => node)
        });
        let childrenContainer = node.render(parentElement);
        if (childrenContainer) {
            renderNodeList.call(this, node.children, childrenContainer);
        }
    }, this);
}

function onClick(e) {
    let element = e.target;
    let nodeElement = element.parentElement;

    e.stopPropagation();
    if (element.type === 'checkbox' && nodeElement) {
        let node = findNode(nodeElement.id, this.nodes);
        if (node) {
            node.isChecked = element.checked;
            // renderNodeList.call(this, [node], nodeElement.parentElement);            
        }
        return;
    }

    if (element.className === 'name' && nodeElement) {
        nodeElement.classList.toggle('collapsed');
    }
}

function parseNodesId(data) {
    return data.map((el) => {
        el.id = '_' + el.id;
        el.nodes = el.nodes.map((id) => "_" + id);
        return el;
    });
}

export class Tree {
    constructor(data, container) {
        this.htmlContainer = container;
        this.htmlContainer.addEventListener('click', onClick.bind(this));
        this.nodes = data;
    }

    get nodes() {
        return this._nodes || [];
    }

    set nodes(data) {
        this._nodes = parseNodesId(data);
    }

    render() {
        let rootNodes = getRootNodes(this.nodes);
        renderNodeList.call(this, rootNodes, this.htmlContainer);
    }

    update(data) {
        this.nodes = data;
        this.render();
    }

    getData() {
        return this.nodes;
    }

    updateNode(nodeData) {
        nodeData = parseNodesId([nodeData]);
        let modifiedNode = this.nodes.find((node) => node.id === nodeData[0].id) || {};
        Object.assign(modifiedNode, nodeData[0]);
        this.render();
    }

    subscribe() {

    }
}