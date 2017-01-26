import MindNode from './MindNode'

class MindNodes {

    constructor () {
        this.Nodes = []
        this.mindNodeShouldRenderMap = []
        this.addMindNodes()
    }
    addMindNodes () {
        const names = ['Customer Relationship', 'Value Proposition', 'Revenue Structure', 'Marketing', 'Events', 'Doing things well']
        for (let i of new Array(100))
            this.addMindNode(names[Math.floor(Math.random()*names.length)], {
                size: Math.random() * 60 + 30,
                x: Math.random() * innerWidth,
                y: Math.random() * innerHeight
            })
    }
    addMindNode (text = "", style = {}) {
        this.Nodes.push(new MindNode(text, style, this, this.Nodes.length))
        this.mindNodeShouldRenderMap.push(false)
    }
    addToRenderer(index) {
        this.mindNodeShouldRenderMap[index] = true
    }
    removeFromRenderer(index) {
        this.mindNodeShouldRenderMap[index] = false
    }
    render () {
        for (let i = 0; i < this.Nodes.length; i++) {
            if(this.mindNodeShouldRenderMap[i]) {
                this.Nodes[i].render()
            }
        }
    }

}

export default MindNodes