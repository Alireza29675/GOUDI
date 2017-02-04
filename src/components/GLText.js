class GLText {
    constructor (message, parameters = {}) {
        this.geometry = new THREE.TextGeometry(message, {
            font: window.GL_FONTS.droid,
            height: 20,
            size: 15
        })
        this.material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.8,
            metalness: 0.5
        })
        this.mesh = new THREE.Mesh(this.geometry, this.material)
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
}

export default GLText