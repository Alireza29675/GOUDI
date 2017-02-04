class GLText {
    constructor (text, parameters = {}) {
        this.storedRadius = 50
        this.geometry = this.getGeometry(text)
        this.material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.8,
            metalness: 0.5
        })
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.size = this.getSize()
    }
    setText (text) {
        this.mesh.scale.x = this.mesh.scale.y = 1
        this.mesh.geometry = this.getGeometry(text)
    }
    getGeometry (text) {
        const geometry = new THREE.TextGeometry(text, {
            font: window.GL_FONTS.droid,
            height: 5,
            size: 15
        })
        geometry.dispose()
        return geometry
    }
    getSize () {
        const box = new THREE.Box3().setFromObject(this.mesh)
        return {
            width: box.max.x - box.min.x,
            height: box.max.y - box.min.y,
            depth: box.max.z - box.min.z
        }
    }
    getObject3D () {
        return this.mesh
    }
    setScale () {
        const padding = 30
        const idealWidth = 100 - padding
        this.size = this.getSize()
        const scaleRate = idealWidth / Math.max(this.size.width, this.size.height * 1.5)
        this.getObject3D().scale.x = this.getObject3D().scale.y = scaleRate
    }
}

export default GLText