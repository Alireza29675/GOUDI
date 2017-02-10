class Arrow {
    constructor (from = {x: 0, y: 0, z: 0}, to = {x: 0, y: 0, z: 0}) {
        this.from = from
        this.to = to
        this.arrowHeight = 20
        this.arrow = new THREE.Object3D()
        this.material = new THREE.MeshStandardMaterial({ color: 0xffffff })
        this.cone = this.getCone()
        this.cylinder = this.getCylinder()
        this.arrow.add(this.cone)
        this.arrow.add(this.cylinder)
        this.fix()
    }
    setFrom (pos) {
        this.from = pos
        this.fix()
    }
    setTo (pos) {
        this.to = pos
        this.fix()
    }
    fix () {
        const deltaX = this.to.x - this.from.x
        const deltaY = this.to.y - this.from.y
        const deltaZ = this.to.z - this.from.z
        this.height = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2) + Math.pow(deltaZ, 2))
        this.cone.geometry.translate(0, (this.height - this.arrowHeight)/2, 0)
        this.cylinder.geometry = this.getCylinderGeo()
        this.cylinder.geometry.translate(0, -this.arrowHeight/2, 0)
        this.setX((this.to.x + this.from.x)/2)
        this.setY((this.to.y + this.from.y)/2)
        this.setZ((this.to.z + this.from.z)/2)
        // ==========================================
        // ISSUE -> It just work for 2D Rotations now
        this.rotateZ(Math.atan2(deltaY, deltaX))
        // ==========================================
    }
    getCone () {
        this.coneGeometry = new THREE.ConeGeometry(10, this.arrowHeight, 32)
        const mesh = new THREE.Mesh(this.coneGeometry, this.material)
        return mesh
    }
    getCylinder () {
        this.cylinderGeometry = this.getCylinderGeo()
        const mesh = new THREE.Mesh(this.cylinderGeometry, this.material)
        return mesh
    }
    getCylinderGeo () {
        const height = (this.height || this.arrowHeight+1) - this.arrowHeight
        return new THREE.CylinderBufferGeometry(4, 4, height, 10)
    }
    getObject3D () {
        return this.arrow
    }
    setX (x) {
        this.getObject3D().position.x = x
    }
    setY (y) {
        this.getObject3D().position.y = y
    }
    setZ (z) {
        this.getObject3D().position.z = z + 5
    }
    rotateZ (deg) {
        this.getObject3D().rotation.z = deg - Math.PI/2
    }
}

export default Arrow