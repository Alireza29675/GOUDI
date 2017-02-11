// create elements fast function
const create = (tagname) => {
    return document.createElement(tagname)
}

// captilize prototype for String class
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

class Property {
    constructor (name, type, options, onchange) {
        this.options = Object.assign({}, options, {
            name: name,
            type: type,
            label: options.label || name
        })
        this.onchange = onchange
        this.createBasics()
    }
    createBasics () {
        // creating container
        this.container = create('div')
        this.container.className = 'row'
        this.container.setAttribute('data-name', this.options.name)
        // set cell contents include this.changebarContent and this.valueContent
        this.setCellContents()
        // creating label cell
        this.label = create('div')
        this.label.className = 'name'
        this.label.innerHTML = this.options.label
        this.container.appendChild(this.label)
        // creating changing bar cell
        this.changebar = create('div')
        this.changebar.className = 'changebar'
        if (this.changebarContent !== null) this.changebar.appendChild(this.changebarContent)
        this.container.appendChild(this.changebar)
        // creating changing bar cell
        this.value = create('div')
        this.value.className = 'value'
        if (this.valueContent !== null) this.value.appendChild(this.valueContent)
        this.container.appendChild(this.value)
    }
    setCellContents () {
        this.changebarContent = null
        this.valueContent = null
        const func = this[`set${ this.options.type.capitalize() }Contents`]
        if (func !== undefined) func.bind(this).call()
        else console.error('Invalid type of property')
    }
    getElement () {
        return this.container
    }
    destroy () {
        // free up memory
        this.changebarContent = null
        this.valueContent = null
        this.container = null
        this.changebar = null
        this.value = null
    }
    // ==== types of property ====
    setTextContents () {
        this.changebarContent = create('input')
        this.changebarContent.type = 'text'
        this.changebarContent.value = this.options.value || ''
        this.changebarContent.onkeyup = () => {
            this.onchange(this.changebarContent.value)
        }
    }
    setNumberContents () {
        this.changebarContent = create('input')
        this.changebarContent.type = 'number'
        this.changebarContent.min = this.options.min || ''
        this.changebarContent.max = this.options.max || ''
        this.changebarContent.step = this.options.step || ''
        this.changebarContent.value = this.options.value || ''
        this.changebarContent.onchange = () => {
            this.onchange(this.changebarContent.value)
        }
    }
    setRangeContents () {
        this.changebarContent = create('input')
        this.changebarContent.type = 'range'
        this.changebarContent.min = this.options.min || ''
        this.changebarContent.max = this.options.max || ''
        this.changebarContent.step = this.options.step || ''
        this.changebarContent.value = this.options.value || this.options.min || ''
        this.valueContent = create('input')
        this.valueContent.disabled = true
        this._value = this.valueContent.value = this.changebarContent.value
        this.changebarContent.onmousemove = () => {
            if (this._value !== this.changebarContent.value) {
                this._value = this.valueContent.value
                this.valueContent.value = this.changebarContent.value
                this.onchange(this.changebarContent.value)
            }
        }
    }
    setButtonContents () {
        this.changebarContent = create('button')
        this.changebarContent.innerHTML = 'Do it!'
        this.changebarContent.onclick = (e) => {
            this.onchange(e)
        }
    }
    setSelectContents () {
        this.changebarContent = create('select')
        for (let option of this.options.options) {
            let el = create('option')
            el.value = option.value
            el.innerHTML = option.label
            this.changebarContent.appendChild(el)
        }
        this.changebarContent.value = this.options.value || ''
        this.changebarContent.onchange = () => {
            this.onchange(this.changebarContent.value)
        }
    }
}

export default Property