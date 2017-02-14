import PropertiesPanel from './PropertiesPanel'
import Node from './Node'
import Arrow from './Arrow'

class NodesManage {
    constructor (scene) {
        this.nodes = []
        this.scene = scene
        // Adding Properties Panel
        this.panel = new PropertiesPanel(this)
        // set focused node
        this.focusedNode = null
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
    get (id) {
        return this.nodes[id]
    }
    onFocusOnNode (node) {
        this.panel.focus(node)
        this.focusedNode = node
        this.storeNodeManageStatus()
    }
    connect(from, to) {
        const arrow = new Arrow (from, to)
        this.scene.object.add(arrow.getObject3D())
        return arrow
    }
    storeNodeManageStatus (id) {
        localStorage.setItem('nodemanage', JSON.stringify({
            focusedNodeId: this.focusedNode.getProp('id')
        }))
    }
    loadNodeManageStatus () {
        if (localStorage.getItem('nodemanage') !== null) {
            const storedData = JSON.parse(localStorage.getItem('nodemanage'))
            const focusedNodeId = storedData.focusedNodeId
            this.focusedNode = this.get(parseInt(focusedNodeId))
            this.scene.focusCameraOn(this.focusedNode)
        }
    }
    render () {

    }
}

export default NodesManage