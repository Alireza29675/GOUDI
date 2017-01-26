import Goudi from '../../src/index.js'


class App {

    constructor () {
        window.Presentation = new Goudi()
    }

}

window.app = new App()