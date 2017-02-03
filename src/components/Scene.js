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
        this.object.add(lights.cameraLight)
        // Adding nodes to Scene
        this.nodesManage = new NodesManage(this.object)
    }
    render () {
        
    }
}

export default Scene