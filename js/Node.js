
export class Node {
    constructor(data) {
        Object.assign(this, data);
    }

    render(parent) {
        let nodeEl = document.createElement('div');
        nodeEl.className = "node";
        nodeEl.id = this.id;
        parent.appendChild(nodeEl);

        let checkboxEl = document.createElement('input');
        checkboxEl.type = 'checkbox';
        checkboxEl.checked = this.checked;
        nodeEl.appendChild(checkboxEl);

        let nameEl = document.createElement('label');
        nameEl.className = "name";
        nameEl.textContent = this.name;
        // nameEl.htmlFor = checkboxEl.id;
        nodeEl.appendChild(nameEl);

        if (this.hasChildren) {
            let childrenEl = document.createElement('div');
            childrenEl.className = "children";
            nodeEl.appendChild(childrenEl);
            return childrenEl;
        }
        return null;
    }

    get hasChildren() {
        return this.children.length > 0;
    }
}