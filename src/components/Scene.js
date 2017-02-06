import lights from './Lights'
import NodesManage from './NodesManage'
import keyboard from 'mousetrap'

const ease = (from, to, rate = 6) => {
    return from + (to - from) / rate
}

class Scene {
    constructor (options, renderer) {
        this.renderer = renderer
        // Adding Scene
        this.object = new THREE.Scene()
        // Adding Camera
        this.camera = new THREE.PerspectiveCamera(35, innerWidth / innerHeight, 0.1, 30000)
        // defining Handler of Dom Events
        window.bindEvent = new THREEx.DomEvents(this.camera, this.renderer.domElement)
        // set camera status from localStorage
        this.loadStoredCameraDataFromLocalStorage()
        // Adding lights to Scene
        this.object.add(lights.globalAmbient)
        this.object.add(lights.topLight)
        this.object.add(lights.bottomLight)
        // Adding nodes to Scene
        this.nodesManage = new NodesManage(this)
        this.nodesManage.addNode(200, 0, -1000)
        this.nodesManage.addNode(0, 0, -1000, 100)
        this.nodesManage.addNode(-200, 0, -1000)
        // Set Focus Node
        this.focusNode = null
        this.wishCameraPosition = { x: 0, y: 0 }
        // add zoom out and in on mouse wheel
        window.addEventListener('mousewheel', e => { this.onMouseWheel(e) })
        // reset camera // DEBUGGING
        keyboard.bind('r e s e t c a m', e => {
            this.camera.position.set(0, 0, 0)
            this.camera.rotation.set(0, 0, 0)
        })
        // Mouse hover and click detect
        window.addEventListener('mousemove', e => {
            window.MOUSE.x = e.clientX
            window.MOUSE.y = e.clientY
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
    }
    onResize (W, H) {
        this.camera.aspect	= W / H
		this.camera.updateProjectionMatrix()
    }
    onMouseWheel (e) {
        this.camera.position.z -= e.deltaY
    }
    render () {
        // Ease positions with animations relating to mouse movement
        this.easeParameters()
        // Store camera data in every frame
        this.storeCameraDataToLocalStorage()
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
        this.focusNode = node
        this.wishCameraPosition = {
            x: node.getObject3D().position.x,
            y: node.getObject3D().position.y
        }
    }
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
        if (localStorage.getItem('camera') !== undefined) {
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