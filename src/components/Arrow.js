// importing Node for checking instanceof objects
import Node from './Node'

// Arrow Class
class Arrow {
    constructor (nodeManage, from = {x: 0, y: 0, z: 0}, to = {x: 0, y: 0, z: 0}) {
        this.nodeManage = nodeManage
        // listener functions
        this.fixListener = this.fix.bind(this)
        this.checkStickListener = this.checkStick.bind(this)
        // Initializing from and to for Nodes and Pos-Objects
        this.setFrom(from)
        this.setTo(to)
        // arrow basics
        this.arrowHeight = 20
        this.height = 0
        this.arrow = new THREE.Object3D()
        // arrow material
        this.material = new THREE.MeshStandardMaterial({ color: 0xffffff })
        // Getting Cone and Cylinder for sticking together
        this.cone = this.getCone()
        this.cylinder = this.getCylinder()
        // Sticking to make an arrow
        this.arrow.add(this.cone)
        this.arrow.add(this.cylinder)
        // binding mouse events
        window.bindEvent.addEventListener(this.cone, 'click', e => { this.onClick(e) }, false)
        window.bindEvent.addEventListener(this.cylinder, 'click', e => { this.onClick(e) }, false)
        window.bindEvent.addEventListener(this.cone, 'mouseover', e => { this.onMouseOver(e) }, false)
        window.bindEvent.addEventListener(this.cylinder, 'mouseover', e => { this.onMouseOver(e) }, false)
        window.bindEvent.addEventListener(this.cone, 'mouseout', e => { this.onMouseOut(e) }, false)
        window.bindEvent.addEventListener(this.cylinder, 'mouseout', e => { this.onMouseOut(e) }, false)
        // fixing position and rotation
        this.fix()
    }
    // change from to another Node or Pos-Object
    setFrom (from) {
        if (from instanceof Node) {
            this.from = from
            from.refreshRefers()
        }
        else {
            from = Object.assign({x: 0, y: 0, z: 0}, from)
            this.from = { position: from, size: 0 }
        }
    }
    // change to to another Node or Pos-Object
    setTo (to) {
        window.removeEventListener('mousemove', this.fixListener, false)
        if (to instanceof Node) {
            this.to = to
            to.refreshSources()
        }
        else if (to == 'MOUSE') {
            this.to = { type: 'MOUSE', size: 0 }
            window.addEventListener('mousemove', this.fixListener, false)
            window.addEventListener('keyup', this.checkStickListener, false)
        }
        else {
            to = Object.assign({x: 0, y: 0, z: 0}, to)
            this.to = { position: to, size: 0 }
        }
    }
    // Handle sticking arrow to Nodes
    checkStick (e) {
        if (e.key == 'Shift') {
            window.removeEventListener('keyup', this.checkStickListener, false)
            if (
                window.MOUSE.hoverOn instanceof Node && // check Shift upped on a node
                this.from !== window.MOUSE.hoverOn && // check hoverOn node should dont be from Node
                this.nodeManage.getArrowByFromAndTo(this.from, window.MOUSE.hoverOn).length == 0 // check that there's no arrow like this
            ) {
                console.log('new arrow')
                this.setTo(window.MOUSE.hoverOn)
                this.fix()
            }
            else this.remove()
        }
    }
    // fixing position and rotation of arrow
    fix () {
        if (this.to.type == 'MOUSE') {
            this.to.position = {
                x: window.MOUSE.scene.x,
                y: window.MOUSE.scene.y,
                z: this.from.position.z
            }
        }
        // Calculating distances
        let deltaX = this.to.position.x - this.from.position.x
        let deltaY = this.to.position.y - this.from.position.y
        let deltaZ = this.to.position.z - this.from.position.z
        // Calculating rotateZ
        let rotateZ = Math.atan2(deltaY, deltaX)
        // Calculating from and to excatly position by node size
        const from = {
            x: this.from.position.x + (Math.cos(rotateZ) * this.from.size),
            y: this.from.position.y + (Math.sin(rotateZ) * this.from.size),
            z: this.from.position.z
        }
        const to = {
            x: this.to.position.x + (Math.cos(rotateZ - Math.PI) * this.to.size),
            y: this.to.position.y + (Math.sin(rotateZ - Math.PI) * this.to.size),
            z: this.to.position.z
        }
        // reCalculate Delta x, y, z and rotateZ
        deltaX = to.x - from.x
        deltaY = to.y - from.y
        deltaZ = to.z - from.z
        rotateZ = Math.atan2(deltaY, deltaX)
        // last height
        const lastHeight = this.height
        // Calculating length of arrow
        this.height = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2) + Math.pow(deltaZ, 2))
        // fixing geometry of cone and cylinder
        this.cone.geometry.translate(0, (this.height - lastHeight)/2, 0)
        this.cylinder.geometry = this.getCylinderGeo()
        this.cylinder.geometry.translate(0, -this.arrowHeight/2, 0)
        // setting Object3D position of arrow
        this.setX((to.x + from.x)/2)
        this.setY((to.y + from.y)/2)
        this.setZ((to.z + from.z)/2)
        // setting Object3D rotation of arrow
        // * It just work for 2D Rotations now *
        this.rotateZ(rotateZ)
    }
    checkVisibility () {
        const fromVisiblity = this.from.visible == undefined || this.from.visible == true
        const toVisiblity = this.to.visible == undefined || this.to.visible == true
        if (fromVisiblity && toVisiblity) this.arrow.visible = true
        else this.arrow.visible = false
    }
    getCone () {
        // Making a cone mesh
        this.coneGeometry = new THREE.ConeGeometry(10, this.arrowHeight, 32)
        this.coneGeometry.translate(0, -(this.arrowHeight)/2, 0)
        const mesh = new THREE.Mesh(this.coneGeometry, this.material)
        return mesh
    }
    getCylinder () {
        // Making a cylinder mesh
        this.cylinderGeometry = this.getCylinderGeo()
        const mesh = new THREE.Mesh(this.cylinderGeometry, this.material)
        return mesh
    }
    getCylinderGeo () {
        // make cylinder geometry by it's height
        const height = (this.height || this.arrowHeight+1) - this.arrowHeight
        return new THREE.CylinderBufferGeometry(4, 4, height, 10)
    }
    // get Object3D of arrow
    getObject3D () { return this.arrow }
    // remove Object3D
    remove () { this.nodeManage.removeArrow(this) }
    // Mouse Events
    onClick () {
        // Remove if alt click on a node
        if (window.KEYBOARD.checkPressed('Alt')) this.remove()
    }
    onMouseOver (e) {
        window.MOUSE.hoverOn = this
        this.hovered = true
    }
    onMouseOut (e) {
        if (window.MOUSE.hoverOn == this) window.MOUSE.hoverOn = null
        this.hovered = false
    }
    // set Object3D position and rotation
    setX (x) { this.getObject3D().position.x = x }
    setY (y) { this.getObject3D().position.y = y }
    setZ (z) { this.getObject3D().position.z = z + 5 }
    rotateZ (deg) { this.getObject3D().rotation.z = deg - Math.PI/2 }
    // render
    render () {
        // Deleting Danger Detection
        if (window.KEYBOARD.checkPressed('Alt') && this.hovered) {
            this.material.color.setHex(0xff0000)
            document.body.style.cursor = 'pointer'
        }
        else {
            this.material.color.setHex(0xffffff)
            document.body.style.cursor = 'default'
        }
    }
}

// Exporting Arrow
export default Arrow