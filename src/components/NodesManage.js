import PropertiesPanel from './PropertiesPanel'
import Node from './Node'
import Arrow from './Arrow'

class NodesManage {
    constructor (scene) {
        this.nodes = []
        this.arrows = []
        this.scene = scene
        // Adding Properties Panel
        this.panel = new PropertiesPanel(this)
        // set focused node
        this.focusedNode = null
    }
    // Set and Get Nodes Management
    addNode (props) {
        let id = 0
        while (this.nodes[id] !== undefined) id++
        Object.assign(props, {id: id})
        const node = new Node(this, props)
        this.scene.object.add(node.getObject3D())
        this.nodes[id] = node
        this.makeDraggable()
        return node
    }
    makeDraggable () {
        if (this.DragControl !== undefined) this.DragControl.deactivate()
        const nodesObjects = this.nodes.filter((node) => node !== undefined).map((node) => node.getObject3D())
        this.DragControl = new THREE.DragControls(nodesObjects, this.scene.camera, this.scene.renderer.domElement)
        this.DragControl.addEventListener('drag', (e)=>{ this.getByUUID(e.object.uuid).onDragging() })
        this.DragControl.addEventListener('dragend', (e)=>{ this.getByUUID(e.object.uuid).onDragEnd() })
    }
    removeNode (node) {
        this.scene.object.remove(node.getObject3D())
        this.nodes[node.getProp('id')] = null
        delete this.nodes[node.getProp('id')]
    }
    get (id) { return this.nodes[id] }
    getByUUID (uuid) { for (let node of this.nodes) if (node.uuid == uuid) return node }
    // Exploring and Focusing Management
    onFocusOnNode (node) {
        this.panel.focus(node)
        this.focusedNode = node
        this.storeNodeManageStatus()
    }
    // Connection Management
    connect(from, to) {
        // connection can make with IDs
        if (typeof from === 'number') from = this.get(from)
        if (typeof to === 'number') to = this.get(to)
        // Define a new Arrow
        const arrow = new Arrow (this, from, to)
        // adding arrow to arrows array
        this.arrows.push(arrow)
        // Refresh refers and sources
        if (from.refreshRefers !== undefined) from.refreshRefers()
        if (to.refreshSources !== undefined) to.refreshSources()
        // Adding arrow to scene
        this.scene.object.add(arrow.getObject3D())
        return arrow
    }
    getArrowByFrom (from) { return this.arrows.filter(arrow => arrow.from == from) }
    getArrowByTo (to) { return this.arrows.filter(arrow => arrow.to == to) }
    getArrowByFromAndTo (from, to) { return this.arrows.filter(arrow => arrow.from == from && arrow.to == to) }
    getAllNodeToNodeArrows () { return this.arrows.filter(arrow => arrow.to instanceof Node) }
    getAllNodeToPositionArrows () { return this.arrows.filter(arrow => !(arrow.to instanceof Node)) }
    getIndexOfArrow (checkArrow) { for (let i = 0; i < this.arrows.length; i++) if (this.arrows[i] == checkArrow) return i }
    removeArrow (arrow) {
        this.scene.object.remove(arrow.getObject3D())
        const index = this.getIndexOfArrow(arrow)
        this.arrows[index] = null
        delete this.arrows[index]
    }
    // Storage Management
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