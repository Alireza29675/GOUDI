import lights from './Lights'
import NodesManage from './NodesManage'
import Node from './Node'

const ease = (from, to, rate = 6) => {
    return from + (to - from) / rate
}

class Scene {
    constructor (options, renderer) {
        this.globalEditable = true // if this was false all editing options disabled
        this.editingMode = true // editing mode boolean in realtime for short whiles
        this.frame = 0
        this.isDragging = false
        this.renderer = renderer
        // Adding Scene
        this.object = new THREE.Scene()
        // Adding Camera
        this.camera = new THREE.PerspectiveCamera(35, innerWidth / innerHeight, 0.1, 30000)
        this.camera.position.set(0, 0, 1000)
        // defining Handler of Dom Events
        window.bindEvent = new THREEx.DomEvents(this.camera, this.renderer.domElement)
        // set camera status from localStorage
        this.wishCameraPosition = { x: 0, y: 0 }
        this.loadStoredCameraDataFromLocalStorage()
        // Ghost node
        this.ghostNode = new Node('GHOST', { text: 'New Node', x: 0, y: 0, initialSize: 50 })
        this.object.add(this.ghostNode.getObject3D())
        // Adding lights to Scene
        this.object.add(lights.globalAmbient)
        this.object.add(lights.topLight)
        this.object.add(lights.bottomLight)
        // Handling adding nodes by User
        window.addEventListener('click', e => {
            if (window.KEYBOARD.checkPressed('Meta') || window.KEYBOARD.checkPressed('Control')) {
                this.nodesManage.addNode({
                    text: '',
                    x: window.MOUSE.scene.x,
                    y: window.MOUSE.scene.y,
                    initialSize: 50
                })
            }
        })
        // Adding nodes to Scene
        this.nodesManage = new NodesManage(this)
        const b = this.nodesManage.addNode({
            id: 0,
            text: 'Application',
            x: 0,
            y: 50,
            initialSize: 100
        })
        a.connectTo(b)
        c.connectTo(a)
        c.connectTo(b)
        d.connectTo(b)
        // Set Focus Node
        this.focusedNode = null
        this.nodesManage.loadNodeManageStatus()
        // add zoom out and in on mouse wheel
        window.addEventListener('mousewheel', e => { this.onMouseWheel(e) })
        // Mouse hover and click detect
        window.addEventListener('mousemove', e => {
            // Calculating Mouse Position on screen
            window.MOUSE.x = e.clientX
            window.MOUSE.y = e.clientY
            // Calculating Mouse Position on 3D Scene of Space
            const vector = new THREE.Vector3()
            vector.set((e.clientX / window.innerWidth)*2 - 1, -(e.clientY / window.innerHeight)*2 + 1, 0.5)
            vector.unproject(this.camera)
            const dir = vector.sub(this.camera.position).normalize()
            const distance = -this.camera.position.z / dir.z
            const pos = this.camera.position.clone().add(dir.multiplyScalar(distance))
            window.MOUSE.scene.x = pos.x
            window.MOUSE.scene.y = pos.y
            window.MOUSE.scene.z = pos.z
        })
        window.addEventListener('mousedown', e => {
            window.MOUSE.down = true
            window.MOUSE.downPos.x = e.clientX
            window.MOUSE.downPos.y = e.clientY
        })
        window.addEventListener('mouseup', e => {
            window.MOUSE.down = false
            window.MOUSE.upPos.x = e.clientX
            window.MOUSE.upPos.y = e.clientY
        })
        // Handling making connection with Shift key
        window.addEventListener('keydown', e => {
            if (e.key == 'Shift' && window.MOUSE.hoverOn instanceof Node) window.MOUSE.hoverOn.connectTo('MOUSE')
        })
    }
    onResize (W, H) {
        this.camera.aspect	= W / H
		this.camera.updateProjectionMatrix()
    }
    onMouseWheel (e) {
        this.camera.position.z -= e.deltaY
    }
    // Disable and Enable Editing
    disableEditingMode (force) {
        if (this.globalEditable && this.editingMode || force) {
            this.nodesManage.DragControl.deactivate()
            this.nodesManage.panel.deactivate()
        }
        this.editingMode = false
    }
    enableEditingMode (force) {
        if (this.globalEditable && !this.editingMode || force) {
            this.editingMode = true
            this.nodesManage.DragControl.activate()
            this.nodesManage.panel.activate()
        }
    }
    // Flow code in every frame
    render () {
        this.frame++
        // Handle Ghost Node
        this.handleGhostNode()
        // Flow rendering to Node Management
        this.nodesManage.render()
        // Ease positions with animations relating to mouse movement
        this.easeParameters()
        // Store camera data in every frame
        if (this.frame % 300 === 0 && !this.isDragging) this.storeCameraDataToLocalStorage()
    }
    handleGhostNode () {
        this.ghostNode.setPropertyX(window.MOUSE.scene.x)
        this.ghostNode.setPropertyY(window.MOUSE.scene.y)
        if (window.KEYBOARD.checkPressed('Meta') || window.KEYBOARD.checkPressed('Control')) {
            this.disableEditingMode()
            this.ghostNode.getObject3D().visible = true
            this.renderer.domElement.style.cursor = 'copy'
        }
        else {
            this.enableEditingMode()
            this.ghostNode.getObject3D().visible = false
            this.renderer.domElement.style.cursor = 'default'
        }
    }
    easeParameters () {
        const W = window.innerWidth
        const H = window.innerHeight
        lights.topLight.position.x = ease (
            lights.topLight.position.x, // from
            (MOUSE.x - W/2) / W * -2000 // to
        )
        lights.bottomLight.position.x = ease (
            lights.bottomLight.position.x, // from
            (MOUSE.x - W/2) / W * 2000 // to
        )
        this.camera.rotation.y = ease (
            this.camera.rotation.y, // from
            (MOUSE.x - W/2) / W * -0.09 // to
        )
        this.camera.rotation.x = ease (
            this.camera.rotation.x, // from
            (MOUSE.y - H/2) / H * 0.015 // to
        )
        this.camera.position.x = ease (
            this.camera.position.x, // from
            this.wishCameraPosition.x // to
        , 10)
        this.camera.position.y = ease (
            this.camera.position.y, // from
            this.wishCameraPosition.y // to
        , 10)
    }
    focusCameraOn (node) {
        if (node !== null) {
            this.nodesManage.onFocusOnNode(node)
            this.lookToNode(node)
        } else {
            this.focusedNode = null
            this.nodesManage.storeNodeManageStatus(null)
            document.querySelector('.panel').classList.remove('show')
            this.wishCameraPosition = {x: 0, y: 0}
            this.camera.position.set(0, 0, 1000)
            this.storeCameraDataToLocalStorage()
        }
    }
    lookToNode (node) {
        this.wishCameraPosition = {
            x: node.getObject3D().position.x,
            y: node.getObject3D().position.y
        }
    }
    // Store and Load Camera position on LocalStorage
    storeCameraDataToLocalStorage () {
        // stringify and store camera position and rotation to localStorage
        localStorage.setItem('camera', JSON.stringify({
            position: {x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z},
            rotation: {x: this.camera.rotation.x, y: this.camera.rotation.y, z: this.camera.rotation.z},
            wishCameraPosition: {x: this.wishCameraPosition.x, y: this.wishCameraPosition.y}
        }))
    }
    loadStoredCameraDataFromLocalStorage () {
        // if there was a camera item in localStorage set initial position and rotation of camera
        if (localStorage.getItem('camera') !== null) {
            const storedData = JSON.parse(localStorage.getItem('camera'))
            if (storedData.position)
                this.camera.position.set(storedData.position.x, storedData.position.y, storedData.position.z)
            if (storedData.rotation)
                this.camera.rotation.set(storedData.rotation.x, storedData.rotation.y, storedData.rotation.z)
            if (storedData.wishCameraPosition)
                this.wishCameraPosition = {x: storedData.wishCameraPosition.x, y: storedData.wishCameraPosition.y}
        }
    }
}

export default Scene