
export default class Node {
    constructor(data) {
         this.id = data.id;
         this.name = data.name;
         this.checked = data.checked;
         this.children = data.children;
    }

    render(parent) {
        let nodeEl = document.createElement('div');
        nodeEl.className = 'node';
        nodeEl.id = this.id;
        parent.appendChild(nodeEl);

        let checkboxEl = document.createElement('input');
        checkboxEl.type = 'checkbox';
        checkboxEl.checked = this.checked;
        nodeEl.appendChild(checkboxEl);

        let nameEl = document.createElement('label');
        nameEl.className = 'name';
        nameEl.textContent = this.name;
        nodeEl.appendChild(nameEl);

        if (this.hasChildren) {
            let childrenEl = document.createElement('div');
            childrenEl.className = 'children';
            nodeEl.classList.add('expandable');
            nodeEl.appendChild(childrenEl);
            return childrenEl;
        }
        return null;
    }

    get hasChildren() {
        return this.children.length > 0;
    }
}