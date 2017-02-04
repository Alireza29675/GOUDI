import GLText from './GLText'

class Node {
    constructor (x = 0, y = 0, z = 0, size = 50) {
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
        this.addText('Customer')
        // set Node's size and scale
        this.size = size
        this.setSize(size)
        // Set position of mesh
        this.setPos(this.position)
    }
    setPos (obj = {}) {
        // Merging obj and current position together
        obj = Object.assign({}, this.position, obj)
        // check if it's string
        if (typeof obj.x === 'string') obj.x = parseFloat(obj.x) + this.position.x
        if (typeof obj.y === 'string') obj.y = parseFloat(obj.y) + this.position.y
        if (typeof obj.z === 'string') obj.z = parseFloat(obj.z) + this.position.z
        // Setting mesh position
        this.getObject3D().position.set(obj.x, obj.y, obj.z)
        this.text.getObject3D().position.set(
            -(this.text.getSize().width / 2),
            -(this.text.getSize().height / 2),
            -(this.text.getSize().depth / 2),
        )
        this.position = obj
    }
    addText (text) {
        this.text = new GLText(text)
        this.getObject3D().add(this.text.getObject3D())
    }
    setText (text) {
        this.text.setText(text)
        this.setSize(this.size)
        this.setPos()
    }
    getObject3D () {
        return this.mesh
    }
    setSize (size) {
        this.size = size
        this.getObject3D().scale.x = this.getObject3D().scale.y = size / 50
        this.text.setScale()
    }
}

export default Node