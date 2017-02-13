import PropertiesPanel from './PropertiesPanel'
import Node from './Node'
import Arrow from './Arrow'

class NodesManage {
    constructor (scene) {
        this.nodes = []
        this.scene = scene
        // Adding Properties Panel
        this.panel = new PropertiesPanel(this)
    }
    addNode (props) {
        let id = 0
        while (this.nodes[id] !== undefined) id++
        Object.assign(props, {id: id})
        const node = new Node(this, props)
        this.scene.object.add(node.getObject3D())
        this.nodes[id] = node
        return node
    }
    onFocusOnNode (node) {
        this.panel.focus(node)
    }
    connectNodeToNode(nodeFrom, nodeTo) {
        const deltaX = nodeTo.position.x - nodeFrom.position.x
        const deltaY = nodeTo.position.y - nodeFrom.position.y
        const rotateZ = Math.atan2(deltaY, deltaX)
        const to = {
            x: nodeTo.position.x + (Math.cos(rotateZ - Math.PI) * nodeTo.size),
            y: nodeTo.position.y + (Math.sin(rotateZ - Math.PI) * nodeTo.size),
            z: nodeTo.position.z
        }
        const arrow = this.connectNodeToPosition(nodeFrom, to)
        return arrow
    }
    connectNodeToPosition(nodeFrom, position) {
        const deltaX = position.x - nodeFrom.position.x
        const deltaY = position.y - nodeFrom.position.y
        const deltaZ = position.z - nodeFrom.position.z
        const rotateZ = Math.atan2(deltaY, deltaX)
        const from = {
            x: nodeFrom.position.x + (Math.cos(rotateZ) * nodeFrom.size),
            y: nodeFrom.position.y + (Math.sin(rotateZ) * nodeFrom.size),
            z: nodeFrom.position.z
        }
        const arrow = new Arrow (from, position)
        this.scene.object.add(arrow.getObject3D())
        return arrow
    }
    render () {

    }
}

export default NodesManage