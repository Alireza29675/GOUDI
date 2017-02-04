import Node from './Node'

class NodesManage {
    constructor (scene) {
        this.nodes = []
        this.scene = scene
    }
    addNode (x = 0, y = 0, z = 0, size) {
        const node = new Node (x, y, z, size)
        this.scene.add(node.getObject3D())
        this.nodes.push(node)
        return node
    }
}

export default NodesManage