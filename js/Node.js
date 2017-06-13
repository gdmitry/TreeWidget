
export class Node {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.checked = data.checked;
        this.children = data.children;
    }

    render(parent) {
        let nodeEl = document.createElement('div');
        nodeEl.className = "node";

        parent.appendChild(nodeEl);

        let checkboxEl = document.createElement('input');
        checkboxEl.type = 'checkbox';
        checkboxEl.checked = this.checked;
        checkboxEl.id = this.id + '_' + this.name;
        nodeEl.appendChild(checkboxEl);

        let nameEl = document.createElement('label');
        nameEl.className = "name";
        nameEl.textContent = this.name;
        nameEl.htmlFor = checkboxEl.id;
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

    set checked(value) {
        this._checked = value;
    }

    get checked() {
        return this._checked;
    }
}