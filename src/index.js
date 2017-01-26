import './components/styles/Basics.css'
import MindNodes from './components/MindNodes'

class Goudi {

    constructor () {
        this.init()
    }

    init () {
        this.MindNodes = new MindNodes()
        this.render()
    }
    render () {
        requestAnimationFrame(this.render.bind(this))
        this.MindNodes.render()
    }

}

export default Goudi