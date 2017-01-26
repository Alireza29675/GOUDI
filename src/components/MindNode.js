import CssToMatrix from 'css-to-matrix'
import './styles/MindNode.css'

class MindNode {

    constructor (text, style = {}, parent, i) {
        this.text = text
        this.parent = parent
        this.index = i
        this.moveRate = Math.floor(Math.random() * 10) + 10
        this.style = {
            size: style.size || 50,
            x: style.x || 0,
            y: style.y || 0
        }
        this.wishStyle = this.style
        this.init()
    }

    init () {
        this.element = document.createElement('div')
        this.REAL_ELEMENT_SIZE = 600
        this.element.style.width = this.element.style.height = `${this.REAL_ELEMENT_SIZE}px`
        this.addClass('mind-node')
        this.addTextElement(this.text)
        document.body.appendChild(this.element)
        this.render()
    }

    addTextElement (text) {
        this.textElement = document.createElement('span')
        this.textElement.classList = 'node-text'
        this.textElement.style.maxWidth = this.REAL_ELEMENT_SIZE + 'px'
        this.setElementText(text)
        this.element.appendChild(this.textElement)
    }

    fitText () {
        const limitBorder = this.REAL_ELEMENT_SIZE * 0.7
        const {offsetWidth, offsetHeight} = this.textElement;
        const biggestEdge = Math.max(offsetWidth, offsetHeight)
        const scale = limitBorder / biggestEdge
        const matrix = (new CssToMatrix()).translate3d(-offsetWidth/2,-offsetHeight/2,-1).scale(scale, scale).getMatrixCSS()
        this.textElement.style.transform = matrix
    }

    setElementText (text) {
        this.text = text
        this.textElement.innerHTML = text
        setTimeout(this.fitText.bind(this), 1)
    }

    addClass (name) {
        this.element.classList.add(name)
    }
    removeClass (name) {
        this.element.classList.remove(name)
    }

    getMatrix () {
        const {size, x, y} = this.style
        return new CssToMatrix()
            .translate3d(x - (this.REAL_ELEMENT_SIZE / 2), y - (this.REAL_ELEMENT_SIZE / 2), -1)
            .scale(size / this.REAL_ELEMENT_SIZE, size / this.REAL_ELEMENT_SIZE)
            .getMatrixCSS()
    }

    set (styleObject) {
        this.wishStyle = {
            size: styleObject.size || this.wishStyle.size,
            x: styleObject.x || this.wishStyle.x,
            y: styleObject.y || this.wishStyle.y
        }
        this.parent.addToRenderer(this.index)
    }

    fixTransformChanges () {
        const RATE = this.moveRate
        this.style = {
            size: this.style.size + ((this.wishStyle.size - this.style.size) / RATE),
            x: this.style.x + ((this.wishStyle.x - this.style.x) / RATE),
            y: this.style.y + ((this.wishStyle.y - this.style.y) / RATE)
        }
        return this
    }

    needRender () {
        if (Math.abs(this.style.size - this.wishStyle.size) > 2) return true
        if (Math.abs(this.style.x - this.wishStyle.x) > 2) return true
        if (Math.abs(this.style.y - this.wishStyle.y) > 2) return true
        return false
    }

    render () {
        this.fixTransformChanges()
        this.element.style.transform = this.getMatrix()
        if (!this.needRender()) this.parent.removeFromRenderer(this.index)
    }

}

export default MindNode