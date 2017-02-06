import GLText from './GLText'

class Node {
    constructor (scene, x = 0, y = 0, z = 0, size = 50) {
        this.scene = scene
        // Position object for storing current position
        this.position = {x: x, y: y, z: z}
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
        this.addText('Application')
        // set Node's size and scale
        this.size = size
        this.setSize(size)
        // Set position of mesh
        this.setPos(this.position, 1)
        // Binding mouse actions to Node
        window.bindEvent.addEventListener(this.mesh, 'click', e => { this.onClick(e) }, false)
        window.bindEvent.addEventListener(this.mesh, 'mouseover', e => { this.onMouseOver(e) }, false)
        window.bindEvent.addEventListener(this.mesh, 'mouseout', e => { this.onMouseOut(e) }, false)
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
        this.size = size
        this.getObject3D().scale.x = this.getObject3D().scale.y = size / 50
        this.text.nodeSize = size
    }
    // Binding Events
    onClick (e) {
        if (this.scene.focusNode !== this) {
            this.scene.focusCameraOn(this)
        }
    }
    onMouseOver (e) {

    }
    onMouseOut (e) {
        
    }
}

export default Node