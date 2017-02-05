import lights from './Lights'
import NodesManage from './NodesManage'

const ease = (from, to, rate = 6) => {
    return from + (to - from) / rate
}

class Scene {
    constructor (options) {
        // Adding Scene
        this.object = new THREE.Scene()
        // Adding Camera
        this.camera = new THREE.PerspectiveCamera(35, innerWidth / innerHeight, 0.1, 30000)
        // set camera status from localStorage
        this.loadStoredCameraDataFromLocalStorage()
        // Adding lights to Scene
        this.object.add(lights.globalAmbient)
        this.object.add(lights.topLight)
        this.object.add(lights.bottomLight)
        // Adding nodes to Scene
        this.nodesManage = new NodesManage(this.object)
        this.nodesManage.addNode(200, 0, -1000)
        this.nodesManage.addNode(0, 0, -1000, 100)
        this.nodesManage.addNode(-200, 0, -1000)
        // add zoom out and in on mouse wheel
        window.addEventListener('mousewheel', e => { this.onMouseWheel(e) })
    }
    onResize () {
        // Storing current position and rotation
        const cameraPos = this.camera.position
        const cameraRot = this.camera.rotation
        // building a new camera
        this.camera = new THREE.PerspectiveCamera(35, innerWidth / innerHeight, 0.1, 30000)
        // pasting previous position and rotation
        this.camera.position.set(cameraPos.x, cameraPos.y, cameraPos.z)
        this.camera.rotation.set(cameraRot.x, cameraRot.y, cameraRot.z)
    }
    onMouseWheel (e) {
        this.camera.position.z -= e.deltaY
    }
    render () {
        const W = window.innerWidth
        const H = window.innerHeight
        // Ease positions with animations relating to mouse movement
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
        // Store camera data in every frame
        this.storeCameraDataToLocalStorage()
    }
    storeCameraDataToLocalStorage () {
        // stringify and store camera position and rotation to localStorage
        localStorage.setItem('camera', JSON.stringify({
            position: {x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z},
            rotation: {x: this.camera.rotation.x, y: this.camera.rotation.y, z: this.camera.rotation.z}
        }))
    }
    loadStoredCameraDataFromLocalStorage () {
        // if there was a camera item in localStorage set initial position and rotation of camera
        if (localStorage.getItem('camera') !== undefined) {
            const storedData = JSON.parse(localStorage.getItem('camera'))
            this.camera.position.set(storedData.position.x, storedData.position.y, storedData.position.z)
            this.camera.rotation.set(storedData.rotation.x, storedData.rotation.y, storedData.rotation.z)
        }
    }
}

export default Scene