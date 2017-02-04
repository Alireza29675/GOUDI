import Node from './Node'

class NodesManage {
    constructor (scene) {
        this.nodes = []
        this.scene = scene
    }
    addNode (x = 0, y = 0, z = 0) {
        const node = new Node (x, y, z)
        this.scene.add(node.getObject3D())
        this.nodes.push(node)
        return node
    }
}

export default NodesManage