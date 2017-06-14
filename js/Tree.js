import Node from './Node';
import Utils from './Utils';
import Events from './Events';

function renderNodeList(nodes, parentElement) {
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
    nodes.forEach((n) => {
        let node = new Node({
            id: n.id,
            name: n.name,
            checked: n.isChecked,
            children: n.nodes.map((nodeId, index) => Utils.findNode(nodeId, this.nodes)).filter((node) => node)
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
    let isCollapsed = nodeElement.classList.contains('collapsed');
    let isExpandable = nodeElement.classList.contains('expandable');
    let node = Utils.findNode(nodeElement.id, this.nodes);

    e.stopPropagation();
    if (element.type === 'checkbox' && nodeElement) {
        if (node) {
            node.isChecked = element.checked;
            this.publish('checkStatusChanged', { nodeName: node.name, checked: node.isChecked });
        }
        return;
    }

    if (element.className === 'name' && nodeElement && isExpandable) {
        nodeElement.classList.toggle('collapsed');
        this.publish('expandStatusChanged', { nodeName: node.name, expanded: isCollapsed });
    }
}

export default class Tree extends Events {
    constructor(data, container) {
        super();
        this.htmlContainer = container;
        this.htmlContainer.addEventListener('click', onClick.bind(this));
        this.nodes = data;
    }

    get nodes() {
        return this._nodes || [];
    }

    set nodes(data) {
        this._nodes = Utils.parseNodesId(data);
    }

    render() {
        let rootNodes = Utils.getRootNodes(this.nodes);
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
        nodeData = Utils.parseNodesId([nodeData]);
        let modifiedNode = this.nodes.find((node) => node.id === nodeData[0].id) || {};
        Object.assign(modifiedNode, nodeData[0]);
        this.render();
    }
}