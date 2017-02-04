import lights from './Lights'
import NodesManage from './NodesManage'

class Scene {
    constructor (options) {
        // Adding Scene
        this.object = new THREE.Scene()
        // Adding Camera
        this.camera = new THREE.PerspectiveCamera(35, innerWidth / innerHeight, 0.1, 3000)
        // Adding lights to Scene
        this.object.add(lights.globalAmbient)
        this.object.add(lights.topLight)
        this.object.add(lights.bottomLight)
        // Adding nodes to Scene
        this.nodesManage = new NodesManage(this.object)
        this.nodesManage.addNode(0, 0, -1000)
    }
    render () {
        lights.topLight.position.x = (MOUSE.x - (window.innerWidth / 2)) / window.innerWidth * 2000
        lights.bottomLight.position.x = (MOUSE.x - (window.innerWidth / 2)) / window.innerWidth * -2000
        this.camera.rotation.y = (MOUSE.x - (window.innerWidth / 2)) / window.innerWidth * 0.01
        this.camera.rotation.x = (MOUSE.y - (window.innerHeight / 2)) / window.innerHeight * 0.015
    }
}

export default Scene