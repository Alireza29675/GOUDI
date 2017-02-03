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

	var _index = __webpack_require__(1);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var App = function App() {
	    _classCallCheck(this, App);

	    window.Presentation = new _index2.default('.board');
	};

	window.app = new App();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Scene = __webpack_require__(9);

	var _Scene2 = _interopRequireDefault(_Scene);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Lights = __webpack_require__(10);

	var _Lights2 = _interopRequireDefault(_Lights);

	var _NodesManage = __webpack_require__(13);

	var _NodesManage2 = _interopRequireDefault(_NodesManage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Scene = function () {
	    function Scene(options) {
	        _classCallCheck(this, Scene);

	        // Adding Scene
	        this.object = new THREE.Scene();
	        // Adding Camera
	        this.camera = new THREE.PerspectiveCamera(35, innerWidth / innerHeight, 0.1, 3000);
	        // Adding lights to Scene
	        this.object.add(_Lights2.default.globalAmbient);
	        this.object.add(_Lights2.default.cameraLight);
	        // Adding nodes to Scene
	        this.nodesManage = new _NodesManage2.default(this.object);
	    }

	    _createClass(Scene, [{
	        key: 'render',
	        value: function render() {}
	    }]);

	    return Scene;
	}();

	exports.default = Scene;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    globalAmbient: new THREE.AmbientLight(0xffffff, 0.5),
	    cameraLight: new THREE.PointLight(0xffffff, 0.4)
	};

/***/ },
/* 11 */,
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Node = function () {
	    function Node() {
	        var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	        var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	        var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

	        _classCallCheck(this, Node);

	        // Position object for storing current position
	        this.position = { x: x, y: y, z: z };
	        // Node Geometry
	        this.geometry = new THREE.SphereGeometry(50, 50, 50);
	        // Node Material
	        this.material = new THREE.MeshNormalMaterial();
	        // Combining geometry and material
	        this.mesh = new THREE.Mesh(this.geometry, this.material);
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
	            this.mesh.position.set(obj.x, obj.y, obj.z);
	            this.position = obj;
	        }
	    }]);

	    return Node;
	}();

	exports.default = Node;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Node = __webpack_require__(12);

	var _Node2 = _interopRequireDefault(_Node);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NodesManage = function NodesManage(scene) {
	    _classCallCheck(this, NodesManage);

	    this.scene = scene;
	};

	exports.default = NodesManage;

/***/ }
/******/ ]);