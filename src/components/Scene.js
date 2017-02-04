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
            lights.topLight.position.x,
            (MOUSE.x - W/2) / W * -2000
        )
        lights.bottomLight.position.x = ease (
            lights.bottomLight.position.x,
            (MOUSE.x - W/2) / W * 2000
        )
        this.camera.rotation.y = ease (
            this.camera.rotation.y,
            (MOUSE.x - W/2) / W * -0.09
        )
        this.camera.rotation.x = ease (
            this.camera.rotation.x,
            (MOUSE.y - H/2) / H * 0.015
        )
    }
}

export default Scene