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
        return node
    }
    get (id) {
        return this.nodes[id]
    }
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
        const arrow = new Arrow (from, to)
        // adding arrow to arrows array
        this.arrows.push(arrow)
        // Refresh refers and sources
        if (from.refreshRefers !== undefined) from.refreshRefers()
        if (to.refreshSources !== undefined) to.refreshSources()
        // Adding arrow to scene
        this.scene.object.add(arrow.getObject3D())
        return arrow
    }
    getArrowByFrom (from) {
        return this.arrows.filter((arrow)=>{ return arrow.from == from })
    }
    getArrowByTo (to) {
        return this.arrows.filter((arrow)=>{ return arrow.to == to })
    }
    getArrowByFromAndTo (from, to) {
        return this.arrows.filter((arrow)=>{ return arrow.from == from && arrow.to == to })
    }
    getAllNodeToNodeArrows () {
        return this.arrows.filter((arrow)=>{ return arrow.to instanceof Node })
    }
    getAllNodeToPositionArrows () {
        return this.arrows.filter((arrow)=>{ return !(arrow.to instanceof Node) })
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