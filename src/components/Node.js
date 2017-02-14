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
                type: 'number'
            },
            y: {
                label: 'Position y',
                type: 'number'
            }
        }
        // set initial props
        this.setInitialProps(initialProps)
        // Node Geometry
        this.geometry = new THREE.SphereGeometry(50, 50, 50)
        // Node Material
        this.material = new THREE.MeshStandardMaterial({
            transparent: true,
            opacity: 0.3,
            roughness: 0.7,
            metalness: 0.5
        })
        // Combining geometry and material
        this.mesh = new THREE.Mesh(this.geometry, this.material)
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
        window.bindEvent.addEventListener(this.mesh, 'click', e => { this.onClick(e) }, false)
        window.bindEvent.addEventListener(this.mesh, 'dblclick', e => { this.onDoubleClick(e) }, false)
        window.bindEvent.addEventListener(this.mesh, 'mousedown', e => { this.onMouseDown(e) }, false)
        window.bindEvent.addEventListener(this.mesh, 'mouseup', e => { this.onMouseUp(e) }, false)
        window.bindEvent.addEventListener(this.mesh, 'mouseover', e => { this.onMouseOver(e) }, false)
        window.bindEvent.addEventListener(this.mesh, 'mouseout', e => { this.onMouseOut(e) }, false)
    }
    setInitialProps (props) {
        for (let prop in props) this.setProp(prop, props[prop])
    }
    setProp (prop, value) {
        this.props[prop].value = value
    }
    getProp (prop) {
        return this.props[prop].value
    }
    setPos (obj = {}, forceRate) {
        // Merging obj and current position together
        obj = Object.assign({}, this.position, obj)
        // check if it's string
        if (typeof obj.x === 'string') obj.x = parseFloat(obj.x) + this.position.x
        if (typeof obj.y === 'string') obj.y = parseFloat(obj.y) + this.position.y
        if (typeof obj.z === 'string') obj.z = parseFloat(obj.z) + this.position.z
        // Setting mesh position
        this.getObject3D().position.set(obj.x, obj.y, obj.z)
        const textSize = this.text.getSize(forceRate)
        this.text.getObject3D().position.set(-(textSize.width / 2), -(textSize.height / 2), -(textSize.depth / 2))
        this.position = obj
    }
    addText (text) {
        this.text = new GLText(text, this.size)
        this.getObject3D().add(this.text.getObject3D())
    }
    setText (text) {
        this.text.setText(text)
        this.setPos()
    }
    getObject3D () {
        return this.mesh
    }
    setSize (size) {
        this.size = size || this.size
        this.getObject3D().scale.x = this.getObject3D().scale.y = size / 50
        this.text.nodeSize = size
    }
    // Binding Events
    onClick (e) { if (this.scene.focusNode !== this) this.scene.focusCameraOn(this) }
    onDoubleClick (e) {}
    onMouseOver (e) { document.body.style.cursor = 'pointer' }
    onMouseOut (e) { document.body.style.cursor = 'default' }
    onMouseDown (e) {}
    onMouseUp (e) {}

    // Sources and Refers Handling
    connectTo (object) {
        let arrow = null
        arrow = this.nodeManage.connect(this, object)
        return arrow
    }


    // Properties set
    setPropertyText (value) {
        this.setProp('text', value)
        document.querySelector('.panel > .header > span').innerHTML = value
        this.setText(value)
    }
    setPropertyX (value) {
        this.setProp('x', value)
        this.position.x = value
        this.setPos({x: parseFloat(value)})
        this.scene.lookToNode(this)
    }
    setPropertyY (value) {
        this.setProp('y', value)
        this.position.y = value
        this.setPos({y: parseFloat(value)})
        this.scene.lookToNode(this)
    }
}

export default Node