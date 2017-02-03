import Goudi from '../../src/index.js'


class App {

    constructor () {
        window.Presentation = new Goudi('.board')
    }

}

window.app = new App()