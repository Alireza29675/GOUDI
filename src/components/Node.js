import GLText from './GLText'

class Node {
    constructor (x = 0, y = 0, z = 0) {
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
        this.setText('Alireza')
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
            obj.x - (this.text.getSize().width / 2),
            obj.y - (this.text.getSize().height / 2),
            obj.z - (this.text.getSize().depth / 2),
        )
        this.position = obj
    }
    setText (text) {
        this.text = new GLText(text)
    }
    getObject3D () {
        return this.mesh
    }
}

export default Node