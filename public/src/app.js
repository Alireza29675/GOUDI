import Goudi from '../../src/index.js'

class App {
    start () {
        window.Presentation = new Goudi('.board')
    }
}
window.app = new App()

// loading basic fonts
window.GL_FONTS = {}
const fontLoader = new THREE.FontLoader();
fontLoader.load('./js/droid_sans_regular.typeface.json', response => {
    window.GL_FONTS["droid"] = response
    window.app.start()
})