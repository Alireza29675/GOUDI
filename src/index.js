import Scene from './components/Scene'

// Initializing mouse status
window.MOUSE = {
    x: 0, y: 0, down: false,
    downPos: {x: 0, y: 0},
    upPos: {x: 0, y: 0}
}

// Goudi
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
        this.renderer = this.makeRenderer()
        this.scene = new Scene(this.options, this.renderer)
        // Responsive
        window.addEventListener('resize', this.onResize.bind(this))
        // start rendering
        this.render()
    }
    onResize () {
        this.options.W = window.innerWidth
        this.options.H = window.innerHeight
        this.renderer.setSize(this.options.W, this.options.H)
        this.scene.onResize()
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