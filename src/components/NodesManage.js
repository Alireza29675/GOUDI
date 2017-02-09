import Node from './Node'
import Arrow from './Arrow'

class NodesManage {
    constructor (scene) {
        this.nodes = []
        this.scene = scene
    }
    addNode (x = 0, y = 0, z = 0, size) {
        const node = new Node (this.scene, x, y, z, size)
        this.scene.object.add(node.getObject3D())
        this.nodes.push(node)
        return node
    }
    connectNodeToNode(nodeFrom, nodeTo) {
        const deltaX = nodeTo.position.x - nodeFrom.position.x
        const deltaY = nodeTo.position.y - nodeFrom.position.y
        const deltaZ = nodeTo.position.z - nodeFrom.position.z
        const rotateZ = Math.atan2(deltaY, deltaX)
        const from = {
            x: nodeFrom.position.x + (Math.cos(rotateZ) * nodeFrom.size),
            y: nodeFrom.position.y + (Math.sin(rotateZ) * nodeFrom.size),
            z: nodeFrom.position.z
        }
        const to = {
            x: nodeTo.position.x + (Math.cos(rotateZ - Math.PI) * nodeTo.size),
            y: nodeTo.position.y + (Math.sin(rotateZ - Math.PI) * nodeTo.size),
            z: nodeTo.position.z
        }
        this.arrow = new Arrow (from, to)
        this.scene.object.add(this.arrow.getObject3D())
    }
    connectNodeToPosition(nodeFrom, position) {

    }
    render () {

    }
}

export default NodesManage