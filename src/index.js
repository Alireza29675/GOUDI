import './components/styles/Basics.css'
import MindNode from './components/MindNode'

class Goudi {

    constructor () {
        this.init()
        let index = 0
        setInterval(()=>{
            this.mindNodes[index].set({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 30 + 10
            })
            index++
        }, 50) 
    }

    init () {
        this.mindNodes = []
        this.mindNodeShouldRenderMap = []
        this.addMindNodes()
        this.render()
    }
    addMindNodes () {
        for (let i of new Array(200)) this.addMindNode()
    }
    addMindNode () {
        this.mindNodes.push(new MindNode(this, this.mindNodes.length))
        this.mindNodeShouldRenderMap.push(false)
    }

    addToRenderer(index) {
        this.mindNodeShouldRenderMap[index] = true
    }
    removeFromRenderer(index) {
        this.mindNodeShouldRenderMap[index] = false
    }
    render () {
        requestAnimationFrame(this.render.bind(this))
        for (let i = 0; i < this.mindNodes.length; i++)
            if(this.mindNodeShouldRenderMap[i])
                this.mindNodes[i].render()
    }

}

export default Goudi