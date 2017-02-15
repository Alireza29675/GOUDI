import PropertiesPanel from './PropertiesPanel'
import Node from './Node'
import Arrow from './Arrow'
import mousetrap from 'mousetrap'

class NodesManage {
    constructor (scene) {
        this.nodes = []
        this.arrows = []
        this.scene = scene
        // Adding Properties Panel
        this.panel = new PropertiesPanel(this)
        mousetrap.bind(['del', 'backspace'], () => { if (this.scene.focusedNode !== null) this.scene.focusedNode.remove() })
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
        const nodesObjects = this.getAllNodes().map((node) => node.getObject3D())
        this.DragControl = new THREE.DragControls(nodesObjects, this.scene.camera, this.scene.renderer.domElement)
        this.DragControl.addEventListener('drag', (e)=>{ this.getByUUID(e.object.uuid).onDragging() })
        this.DragControl.addEventListener('dragend', (e)=>{ this.getByUUID(e.object.uuid).onDragEnd() })
    }
    removeNode (node) {
        // if focused node is deleting focus must be changed
        const needChangeFocus = this.scene.focusedNode == node
        const srcs = node.srcs
        const rfrs = node.rfrs

        // Removing and Destroying Node from scene and memory
        this.scene.object.remove(node.getObject3D())
        node.destroy()
        this.nodes[node.getProp('id')] = null
        delete this.nodes[node.getProp('id')]
        this.makeDraggable()

        // Change foucs if needed
        if (needChangeFocus) {
            const avaliableSrcs = srcs.filter(src => src.from instanceof Node)
            const avaliableRfrs = rfrs.filter(rfr => rfr.to instanceof Node)
            let focusTarget = null
            if (avaliableSrcs.length > 0) focusTarget = avaliableSrcs[0].from
            else if (avaliableRfrs.length > 0) focusTarget = avaliableRfrs[0].to
            else {
                const nodes = this.getAllNodes()
                if (nodes.length > 0) focusTarget = nodes[0]
            }
            this.scene.focusCameraOn(focusTarget)
        }
        // should remove later (Uses lots of memory)
        for (let n of this.getAllNodes()) {
            n.refreshRefers()
            n.refreshSources()
        }
    }
    get (id) { return this.nodes[id] }
    getByUUID (uuid) { for (let node of this.nodes) if (node instanceof Node) if (node.uuid == uuid) return node }
    getAllNodes () { return this.nodes.filter(node => node instanceof Node) }
    // Exploring and Focusing Management
    onFocusOnNode (node) {
        this.panel.focus(node)
        this.scene.focusedNode = node
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
    storeNodeManageStatus (forceValue) {
        localStorage.setItem('nodemanage', JSON.stringify({
            focusedNodeId: forceValue !== undefined ? forceValue : this.scene.focusedNode.getProp('id')
        }))
    }
    loadNodeManageStatus () {
        if (localStorage.getItem('nodemanage') !== null) {
            const storedData = JSON.parse(localStorage.getItem('nodemanage'))
            const focusedNodeId = storedData.focusedNodeId
            if (focusedNodeId !== null) this.scene.focusedNode = this.get(parseInt(focusedNodeId))
            else this.scene.focusedNode = null
            this.scene.focusCameraOn(this.scene.focusedNode)
        }
    }
    render () {

    }
}

export default NodesManage