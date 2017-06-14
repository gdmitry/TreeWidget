
class Utils {
    parseNodesId(data) {
        return data.map((el) => {
            el.id = '_' + el.id;
            el.nodes = el.nodes.map((id) => "_" + id);
            return el;
        });
    }

    getRootNodes(nodes) {
        return nodes.filter((node) => {
            let isRoot = nodes.every((n) => n.nodes.indexOf(node.id) === -1);
            return isRoot;
        });
    }

    findNode(id, nodes) {
        return nodes.find((node) => node.id == id);
    }
}

export default new Utils();