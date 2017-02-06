class GLText {
    constructor (text, nodeSize) {
        this.nodeSize = nodeSize
        this.storedRadius = 50
        this.geometry = this.getGeometry(text)
        this.material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            roughness: 0.8,
            metalness: 0.5
        })
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.size = this.getSize(1)
        this.setScale()
    }
    setText (text) {
        this.mesh.geometry = this.getGeometry(text)
        this.mesh.scale.x = this.mesh.scale.y = 1
        this.size = this.getSize()
        this.setScale ()
    }
    getGeometry (text) {
        const geometry = new THREE.TextGeometry(text, {
            font: window.GL_FONTS.droid,
            height: 5,
            size: 15,
            curveSegments: 5,
            bevelThickness: 0.5,
            bevelSize: 0.3,
            bevelEnabled: true
        })
        geometry.dispose()
        return geometry
    }
    getSize (forceRate) {
        const sizeRate = forceRate || this.nodeSize / 50
        const box = new THREE.Box3().setFromObject(this.mesh)
        const ret = {
            width: (box.max.x - box.min.x) / sizeRate,
            height: (box.max.y - box.min.y) / sizeRate,
            depth: (box.max.z - box.min.z) / sizeRate
        }
        return ret
    }
    getObject3D () {
        return this.mesh
    }
    setScale () {
        const defaultSize = 50
        const padding = 30
        const idealWidth = defaultSize*2 - padding
        const scaleRate = idealWidth / Math.max(this.size.width, this.size.height * 1.5)
        this.getObject3D().scale.x = this.getObject3D().scale.y = scaleRate
    }
}

export default GLText