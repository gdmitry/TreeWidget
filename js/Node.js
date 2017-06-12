
export class Node {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.checked = data.checked;
        this.hasChildren = data.children.length > 0;
    }

    render(parent) {
        let nodeEl = document.createElement('div');
        nodeEl.className = "node";
        parent.appendChild(nodeEl);

        let checkboxEl = document.createElement('input');
        checkboxEl.type = 'checkbox';
        checkboxEl.checked = this.checked;
        nodeEl.appendChild(checkboxEl);

        let nameEl = document.createElement('div');
        nameEl.className = "name";
        nodeEl.appendChild(nameEl);

        if (this.hasChildren) {
            let childrenEl = document.createElement('div');
            childrenEl.className = "children";
            nodeEl.appendChild(childrenEl);
            return childrenEl;
        }
        return null;
    }

    set checked() {

    }

    get checked() {
        return this.checked;
    }
}