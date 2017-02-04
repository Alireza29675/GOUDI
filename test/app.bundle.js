/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _index = __webpack_require__(1);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var App = function () {
	    function App() {
	        _classCallCheck(this, App);
	    }

	    _createClass(App, [{
	        key: 'start',
	        value: function start() {
	            window.Presentation = new _index2.default('.board');
	        }
	    }]);

	    return App;
	}();

	window.app = new App();

	// loading basic fonts
	window.GL_FONTS = {};
	var fontLoader = new THREE.FontLoader();
	fontLoader.load('droid_sans_regular.typeface.json', function (response) {
	    window.GL_FONTS["droid"] = response;
	    window.app.start();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Scene = __webpack_require__(2);

	var _Scene2 = _interopRequireDefault(_Scene);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// Calculating mouse status
	window.MOUSE = {
	    x: 0, y: 0, down: false,
	    downPos: { x: 0, y: 0 },
	    upPos: { x: 0, y: 0 }
	};
	window.addEventListener('mousemove', function (e) {
	    window.MOUSE.x = e.clientX;
	    window.MOUSE.y = e.clientY;
	});
	window.addEventListener('mousedown', function (e) {
	    window.MOUSE.down = true;
	    window.MOUSE.downPos.x = e.clientX;
	    window.MOUSE.downPos.y = e.clientY;
	});
	window.addEventListener('mouseup', function (e) {
	    window.MOUSE.down = false;
	    window.MOUSE.upPos.x = e.clientX;
	    window.MOUSE.upPos.y = e.clientY;
	});

	// Goudi

	var Goudi = function () {
	    function Goudi(query) {
	        _classCallCheck(this, Goudi);

	        // Getting the base canvas
	        this.canvas = document.querySelector(query);
	        // application options
	        this.options = {
	            background: 0x000000,
	            W: window.innerWidth,
	            H: window.innerHeight
	        };
	        // define the scene and renderer
	        this.scene = new _Scene2.default(this.options);
	        this.renderer = this.makeRenderer();
	        // start rendering
	        this.render();
	    }

	    _createClass(Goudi, [{
	        key: 'makeRenderer',
	        value: function makeRenderer() {
	            // defining the renderer
	            var renderer = new THREE.WebGLRenderer({
	                canvas: document.querySelector('canvas'),
	                antialias: true
	            });
	            renderer.setClearColor(this.options.background);
	            renderer.setPixelRatio(devicePixelRatio);
	            renderer.setSize(this.options.W, this.options.H);
	            return renderer;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            // making a loop for rendering
	            requestAnimationFrame(this.render.bind(this));
	            // flow rendering to the scene
	            this.scene.render();
	            // paint THREE.js export to the canvas
	            this.renderer.render(this.scene.object, this.scene.camera);
	        }
	    }]);

	    return Goudi;
	}();

	exports.default = Goudi;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Lights = __webpack_require__(3);

	var _Lights2 = _interopRequireDefault(_Lights);

	var _NodesManage = __webpack_require__(4);

	var _NodesManage2 = _interopRequireDefault(_NodesManage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Scene = function () {
	    function Scene(options) {
	        var _this = this;

	        _classCallCheck(this, Scene);

	        // Adding Scene
	        this.object = new THREE.Scene();
	        // Adding Camera
	        this.camera = new THREE.PerspectiveCamera(35, innerWidth / innerHeight, 0.1, 30000);
	        // Adding lights to Scene
	        this.object.add(_Lights2.default.globalAmbient);
	        this.object.add(_Lights2.default.topLight);
	        this.object.add(_Lights2.default.bottomLight);
	        // Adding nodes to Scene
	        this.nodesManage = new _NodesManage2.default(this.object);
	        this.nodesManage.addNode(0, 0, -1000);
	        // add zoom out and in on mouse wheel
	        window.addEventListener('mousewheel', function (e) {
	            _this.onMouseWheel(e);
	        });
	    }

	    _createClass(Scene, [{
	        key: 'onMouseWheel',
	        value: function onMouseWheel(e) {
	            this.camera.position.z -= e.deltaY;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            _Lights2.default.topLight.position.x = (MOUSE.x - window.innerWidth / 2) / window.innerWidth * 2000;
	            _Lights2.default.bottomLight.position.x = (MOUSE.x - window.innerWidth / 2) / window.innerWidth * -2000;
	            this.camera.rotation.y = (MOUSE.x - window.innerWidth / 2) / window.innerWidth * 0.01;
	            this.camera.rotation.x = (MOUSE.y - window.innerHeight / 2) / window.innerHeight * 0.015;
	        }
	    }]);

	    return Scene;
	}();

	exports.default = Scene;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// define lights
	var lights = {
	    globalAmbient: new THREE.AmbientLight(0xffffff, 0.5),
	    topLight: new THREE.PointLight(0xffffff, 0.6),
	    bottomLight: new THREE.PointLight(0xffffff, 0.1)
	};
	// Changing positions and etc
	lights.topLight.position.y = 5000;
	lights.bottomLight.position.y = -5000;
	// exporting all of them
	exports.default = lights;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Node = __webpack_require__(5);

	var _Node2 = _interopRequireDefault(_Node);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NodesManage = function () {
	    function NodesManage(scene) {
	        _classCallCheck(this, NodesManage);

	        this.nodes = [];
	        this.scene = scene;
	    }

	    _createClass(NodesManage, [{
	        key: 'addNode',
	        value: function addNode() {
	            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	            var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

	            var node = new _Node2.default(x, y, z);
	            this.scene.add(node.getObject3D());
	            this.nodes.push(node);
	            return node;
	        }
	    }]);

	    return NodesManage;
	}();

	exports.default = NodesManage;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _GLText = __webpack_require__(7);

	var _GLText2 = _interopRequireDefault(_GLText);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Node = function () {
	    function Node() {
	        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	        var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	        var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 50;

	        _classCallCheck(this, Node);

	        // Position object for storing current position
	        this.position = { x: x, y: y, z: z };
	        // Node Geometry
	        this.geometry = new THREE.SphereGeometry(50, 50, 50);
	        // Node Material
	        this.material = new THREE.MeshStandardMaterial({
	            transparent: true,
	            opacity: 0.3,
	            roughness: 0.7,
	            metalness: 0.5
	        });
	        // Combining geometry and material
	        this.mesh = new THREE.Mesh(this.geometry, this.material);
	        // set text
	        this.addText('Customer');
	        // set Node's size and scale
	        this.size = size;
	        this.setSize(size);
	        // Set position of mesh
	        this.setPos(this.position);
	    }

	    _createClass(Node, [{
	        key: 'setPos',
	        value: function setPos() {
	            var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	            // Merging obj and current position together
	            obj = Object.assign({}, this.position, obj);
	            // check if it's string
	            if (typeof obj.x === 'string') obj.x = parseFloat(obj.x) + this.position.x;
	            if (typeof obj.y === 'string') obj.y = parseFloat(obj.y) + this.position.y;
	            if (typeof obj.z === 'string') obj.z = parseFloat(obj.z) + this.position.z;
	            // Setting mesh position
	            this.getObject3D().position.set(obj.x, obj.y, obj.z);
	            this.text.getObject3D().position.set(-(this.text.getSize().width / 2), -(this.text.getSize().height / 2), -(this.text.getSize().depth / 2));
	            this.position = obj;
	        }
	    }, {
	        key: 'addText',
	        value: function addText(text) {
	            this.text = new _GLText2.default(text);
	            this.getObject3D().add(this.text.getObject3D());
	        }
	    }, {
	        key: 'setText',
	        value: function setText(text) {
	            this.text.setText(text);
	            this.setSize(this.size);
	            this.setPos();
	        }
	    }, {
	        key: 'getObject3D',
	        value: function getObject3D() {
	            return this.mesh;
	        }
	    }, {
	        key: 'setSize',
	        value: function setSize(size) {
	            this.size = size;
	            this.getObject3D().scale.x = this.getObject3D().scale.y = size / 50;
	            this.text.setScale(size);
	        }
	    }]);

	    return Node;
	}();

	exports.default = Node;

/***/ },
/* 6 */,
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GLText = function () {
	    function GLText(text) {
	        var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	        _classCallCheck(this, GLText);

	        this.storedRadius = 50;
	        this.geometry = this.getGeometry(text);
	        this.material = new THREE.MeshStandardMaterial({
	            color: 0xffffff,
	            roughness: 0.8,
	            metalness: 0.5
	        });
	        this.mesh = new THREE.Mesh(this.geometry, this.material);
	        this.size = this.getSize();
	    }

	    _createClass(GLText, [{
	        key: "setText",
	        value: function setText(text) {
	            this.mesh.scale.x = this.mesh.scale.y = 1;
	            this.mesh.geometry = this.getGeometry(text);
	        }
	    }, {
	        key: "getGeometry",
	        value: function getGeometry(text) {
	            var geometry = new THREE.TextGeometry(text, {
	                font: window.GL_FONTS.droid,
	                height: 5,
	                size: 15
	            });
	            geometry.dispose();
	            return geometry;
	        }
	    }, {
	        key: "getSize",
	        value: function getSize() {
	            var box = new THREE.Box3().setFromObject(this.mesh);
	            return {
	                width: box.max.x - box.min.x,
	                height: box.max.y - box.min.y,
	                depth: box.max.z - box.min.z
	            };
	        }
	    }, {
	        key: "getObject3D",
	        value: function getObject3D() {
	            return this.mesh;
	        }
	    }, {
	        key: "setScale",
	        value: function setScale(radius) {
	            var padding = 30;
	            var idealWidth = radius * 2 - padding;
	            this.size = this.getSize();
	            var scaleRate = idealWidth / Math.max(this.size.width, this.size.height * 1.5);
	            this.getObject3D().scale.x = this.getObject3D().scale.y = scaleRate;
	        }
	    }]);

	    return GLText;
	}();

	exports.default = GLText;

/***/ }
/******/ ]);