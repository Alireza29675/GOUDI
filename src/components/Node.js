import GLText from './GLText'

class Node {
    constructor (nodeManage, initialProps) {
        this.nodeManage = nodeManage
        this.scene = nodeManage.scene
        // set props of node
        this.props = {
            id: {},
            text: {
                label: 'Text',
                type: 'text'
            },
            initialSize: {
                label: 'Initial Size',
                type: 'range',
                options: {
                    min: 50,
                    max: 100
                }
            },
            x: {
                label: 'Position x',
                type: 'number',
                options: {step: 10}
            },
            y: {
                label: 'Position y',
                type: 'number',
                options: {step: 10}
            }
        }
        // Define srcs and rfrs objects
        this.rfrs = [] // refer arrows
        this.srcs = [] // source arrows
        // visibility
        this.visible = true
        // set initial props
        this.setInitialProps(initialProps)
        // Node Geometry
        this.geometry = new THREE.SphereGeometry(50, 50, 50)
        // Node Material
        this.material = new THREE.MeshStandardMaterial({
            transparent: true,
            opacity: this.nodeManage !== 'GHOST' ? 0.3 : 0.1,
            roughness: 0.7,
            metalness: 0.5
        })
        // Combining geometry and material
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.uuid = this.mesh.uuid
        // set text
        this.addText(this.getProp('text'))
        // set Node's size and scale
        this.size = this.getProp('initialSize')
        this.setSize(this.size)
        // Set position of mesh
        this.setPos({
            x: this.props.x.value,
            y: this.props.y.value,
            z: 0
        }, 1)
        // Binding mouse actions to Node
        if (this.nodeManage !== 'GHOST') {
            window.bindEvent.addEventListener(this.mesh, 'click', e => { this.onClick(e) }, false)
            window.bindEvent.addEventListener(this.mesh, 'dblclick', e => { this.onDoubleClick(e) }, false)
            window.bindEvent.addEventListener(this.mesh, 'mousedown', e => { this.onMouseDown(e) }, false)
            window.bindEvent.addEventListener(this.mesh, 'mouseup', e => { this.onMouseUp(e) }, false)
            window.bindEvent.addEventListener(this.mesh, 'mouseover', e => { this.onMouseOver(e) }, false)
            window.bindEvent.addEventListener(this.mesh, 'mouseout', e => { this.onMouseOut(e) }, false)
        }
    }
    setInitialProps (props) {
        for (let prop in props) this.setProp(prop, props[prop], false)
    }
    setProp (prop, value, pushToPanel = true) {
        if (pushToPanel && this.nodeManage !== 'GHOST') this.nodeManage.panel.onPropSet(prop, value)
        this.props[prop].value = value
    }
    getProp (prop) {
        return this.props[prop].value
    }
    setPos (obj = {}, forceRate) {
        // Merging obj and current position together
        obj = Object.assign({}, this.position, obj)
        // Setting mesh position
        this.fixPosition(obj)
        // fix text to node
        const textSize = this.text.getSize(forceRate)
        this.text.getObject3D().position.set(-(textSize.width / 2), -(textSize.height / 2), -(textSize.depth / 2))
    }
    fixPosition (obj) {
        obj = Object.assign({}, this.position, obj)
        this.getObject3D().position.set(obj.x, obj.y, obj.z)
        this.position = obj
        for (let refer of this.rfrs) refer.fix()
        for (let source of this.srcs) source.fix()
    }
    lookAtMe () {
        if (this.nodeManage !== 'GHOST') this.scene.lookToNode(this)
    }
    addText (text) {
        this.text = new GLText(text, this.size)
        this.getObject3D().add(this.text.getObject3D())
    }
    setText (text) {
        this.text.setText(text)
        this.setPos()
    }
    setOutline (op) {
        this.outlineMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            transparent: true,
            opacity: op,
            side: THREE.BackSide
        })
        this.outline = new THREE.Mesh(this.geometry, this.outlineMaterial)
        this.outline.scale.multiplyScalar(1.05);
        this.getObject3D().add(this.outline)
    }
    removeOutline () {
        this.getObject3D().remove(this.outline)
        this.outline = null
    }
    getObject3D () {
        return this.mesh
    }
    setSize (size) {
        this.size = size || this.size
        this.getObject3D().scale.x = this.getObject3D().scale.y = size / 50
        this.text.nodeSize = size
    }
    remove () {
        for (let refer of this.rfrs) refer.remove()
        for (let source of this.srcs) source.remove()
        if (this.nodeManage !== 'GHOST') this.nodeManage.removeNode(this)
    }
    destroy () {
        window.bindEvent.removeEventListener(this.mesh, 'click', e => { this.onClick(e) }, false)
        window.bindEvent.removeEventListener(this.mesh, 'dblclick', e => { this.onDoubleClick(e) }, false)
        window.bindEvent.removeEventListener(this.mesh, 'mousedown', e => { this.onMouseDown(e) }, false)
        window.bindEvent.removeEventListener(this.mesh, 'mouseup', e => { this.onMouseUp(e) }, false)
        window.bindEvent.removeEventListener(this.mesh, 'mouseover', e => { this.onMouseOver(e) }, false)
        window.bindEvent.removeEventListener(this.mesh, 'mouseout', e => { this.onMouseOut(e) }, false)
        this.geometry = null
        this.material = null
        this.mesh = null
    }
    fixVisibility () {
        this.getObject3D().visible = this.visible
        for (let refer of this.rfrs) refer.checkVisibility()
        for (let source of this.srcs) source.checkVisibility()
    }
    hide () {
        this.visible = false
        this.fixVisibility()
    }
    show () {
        this.visible = true
        this.fixVisibility()
    }
    toggle () {
        this.visible = !this.visible
        this.fixVisibility()
    }
    // Binding Events
    onClick (e) { if (this.scene.focusedNode !== this) this.scene.focusCameraOn(this) }
    onDoubleClick (e) {}
    onMouseOver (e) {
        document.body.style.cursor = 'pointer'
        window.MOUSE.hoverOn = this
    }
    onMouseOut (e) {
        document.body.style.cursor = 'default'
        if (window.MOUSE.hoverOn == this) window.MOUSE.hoverOn = null
    }
    onMouseDown (e) {}
    onMouseUp (e) {}
    onDragging () {
        const {x, y, z} = this.getObject3D().position
        this.setPropertyX(x, false)
        this.setPropertyY(y, false)
        this.scene.isDragging = true
    }
    onDragStart () {
        if (window.KEYBOARD.checkPressed('Shift')) this.scene.disableEditingMode()
    }
    onDragEnd () {
        this.scene.isDragging = false
        this.lookAtMe()
    }
    onFocus () {
        // this.material.color.setHex(0xaabbee)
    }
    onBlur () {
        // this.material.color.setHex(0xffffff)
    }

    // Sources and Refers Handling
    connectTo (object) {
        let arrow = null
        if (this.nodeManage !== 'GHOST') arrow = this.nodeManage.connect(this, object)
        return arrow
    }
    refreshRefers () { if (this.nodeManage !== 'GHOST') this.rfrs = this.nodeManage.getArrowByFrom(this) }
    refreshSources () { if (this.nodeManage !== 'GHOST') this.srcs = this.nodeManage.getArrowByTo(this) }

    // Properties set
    setPropertyText (value) {
        this.setProp('text', value)
        document.querySelector('.panel > .header > span').innerHTML = value
        this.setText(value)
    }
    setPropertyX (value, lookAtMe = true) {
        value = parseFloat(value)
        this.setProp('x', value.toFixed(2))
        this.position.x = value
        this.fixPosition({x: value})
        if (lookAtMe) this.lookAtMe()
    }
    setPropertyY (value, lookAtMe = true) {
        value = parseFloat(value)
        this.setProp('y', value.toFixed(2))
        this.position.y = value
        this.fixPosition({y: value})
        if (lookAtMe) this.lookAtMe()
    }
}

export default Node