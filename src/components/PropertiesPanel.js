import Property from './Property'

// Panel css
import './styles/PropertiesPanel.css'

// get elements fast function
const get = (query) => {
    return document.querySelectorAll(query)
}

class PropertiesPanel {
    constructor (nodesManage) {
        // Define scene and panel
        this.nodesManage = nodesManage
        this.panelHeader = {
            icon: get('.panel > .header > i')[0],
            title: get('.panel > .header > span')[0]
        }
        this.panel = get('.panel > .table')[0]
        // reseting panel for first use
        this.panelProperties = []
        this.resetPanel()
    }
    focus (node) {
        const props = node.props
        this.panelHeader.title.innerHTML = props.text.value
        this.resetPanel()
        for (let property in props) {
            const { label, type, value, options } = props[ property ]
            this.addProperty(property, type, Object.assign({}, options, { label: label || property, value: value }), (prop, value) => {
                if (node['setProperty' + prop.capitalize()] !== undefined) node['setProperty' + prop.capitalize()](value)
            })
        }
    }
    resetPanel () {
        // freeing up memory
        for (let panelProperty of this.panelProperties) {
            panelProperty.destroy()
            panelProperty = null
        }
        this.panelProperties = []
        this.panel.innerHTML = ''
    }
    addProperty (name, type, options, onchange) {
        const prop = new Property(name, type, options, onchange)
        this.panelProperties.push(prop)
        this.panel.appendChild(prop.getElement())
        return prop
    }
}

export default PropertiesPanel