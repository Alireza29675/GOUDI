import Property from './Property'

// Panel css
import './styles/PropertiesPanel.css'

// get elements fast function
const get = (query) => {
    return document.querySelectorAll(query)
}

class PropertiesPanel {
    constructor (scene) {
        // Define scene and panel
        this.scene = scene
        this.panel = get('.panel > .table')[0]

        // reseting panel for first use
        this.resetPanel()

        // add some properties
        this.addProperty('Name', 'text', {value: 'Application'}, (value)=>{
            console.log(value)
        })
        this.addProperty('size', 'range', {label: 'Element Size', min:20, max:40, step:2, value:20}, (value)=>{
            console.log(value)
        })
        this.addProperty('gender', 'select', {
                options: [
                    {label: 'Male', value: 1},
                    {label: 'Female', value: 2},
                    {label: 'Other', value: 0}
                ],
                value: 2
            }, (value) => {
                console.log(value)
        })
        this.addProperty('Default Size', 'number', {min: 50, value: 100}, (value) => {
            console.log(value)
        })
        this.addProperty('Toggle', 'button', {}, () => {
            console.log('tapped!')
        })
    }
    resetPanel () {
        this.panel.innerHTML = ''
    }
    addProperty (name, type, options, onchange) {
        const prop = new Property(name, type, options, onchange)
        this.panel.appendChild(prop.getElement())
        return prop
    }
}

export default PropertiesPanel