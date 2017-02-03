import Scene from './components/Scene'

class Goudi {
    constructor (query) {
        // Getting the base canvas
        this.canvas = document.querySelector(query)
        // application options
        this.options = {
            background: 0x000000,
            W: window.innerWidth,
            H: window.innerHeight
        }
        // define the scene and renderer
        this.scene = new Scene(this.options)
        this.renderer = this.makeRenderer()
        // start rendering
        this.render()
    }
    makeRenderer () {
        // defining the renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector('canvas'),
            antialias: true
        })
        renderer.setClearColor(this.options.background)
        renderer.setPixelRatio(devicePixelRatio)
        renderer.setSize(this.options.W, this.options.H)
        return renderer
    }
    render () {
        // making a loop for rendering
        requestAnimationFrame(this.render.bind(this))
        // flow rendering to the scene
        this.scene.render()
        // paint THREE.js export to the canvas
        this.renderer.render(this.scene.object, this.scene.camera)
    }
}

export default Goudi