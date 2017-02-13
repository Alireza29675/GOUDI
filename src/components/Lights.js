// define lights
const lights = {
    globalAmbient: new THREE.AmbientLight(0xffffff, 0.5),
    topLight: new THREE.PointLight(0xffffff, 0.6),
    bottomLight: new THREE.PointLight(0xffffff, 0.1),
}
// Changing positions and etc
lights.topLight.position.y = 5000
lights.topLight.position.z = 1000
lights.bottomLight.position.y = -5000
lights.bottomLight.position.z = 1000
// exporting all of them
export default lights