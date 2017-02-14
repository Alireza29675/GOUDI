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
	fontLoader.load('./js/droid_sans_regular.typeface.json', function (response) {
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

	// Initializing mouse status
	window.MOUSE = {
	    x: 0, y: 0, down: false,
	    downPos: { x: 0, y: 0 },
	    upPos: { x: 0, y: 0 }
	};

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
	        this.renderer = this.makeRenderer();
	        this.scene = new _Scene2.default(this.options, this.renderer);
	        // Responsive
	        window.addEventListener('resize', this.onResize.bind(this));
	        // start rendering
	        this.render();
	    }

	    _createClass(Goudi, [{
	        key: 'onResize',
	        value: function onResize() {
	            this.options.W = window.innerWidth;
	            this.options.H = window.innerHeight;
	            this.renderer.setSize(this.options.W, this.options.H);
	            this.scene.onResize(this.options.W, this.options.H);
	        }
	    }, {
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

	var _Lights = __webpack_require__(10);

	var _Lights2 = _interopRequireDefault(_Lights);

	var _NodesManage = __webpack_require__(11);

	var _NodesManage2 = _interopRequireDefault(_NodesManage);

	var _mousetrap = __webpack_require__(15);

	var _mousetrap2 = _interopRequireDefault(_mousetrap);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ease = function ease(from, to) {
	    var rate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 6;

	    return from + (to - from) / rate;
	};

	var Scene = function () {
	    function Scene(options, renderer) {
	        var _this = this;

	        _classCallCheck(this, Scene);

	        this.frame = 0;
	        this.renderer = renderer;
	        // Adding Scene
	        this.object = new THREE.Scene();
	        // Adding Camera
	        this.camera = new THREE.PerspectiveCamera(35, innerWidth / innerHeight, 0.1, 30000);
	        // defining Handler of Dom Events
	        window.bindEvent = new THREEx.DomEvents(this.camera, this.renderer.domElement);
	        // set camera status from localStorage
	        this.wishCameraPosition = { x: 0, y: 0 };
	        this.loadStoredCameraDataFromLocalStorage();
	        // Adding lights to Scene
	        this.object.add(_Lights2.default.globalAmbient);
	        this.object.add(_Lights2.default.topLight);
	        this.object.add(_Lights2.default.bottomLight);
	        // Adding nodes to Scene
	        this.nodesManage = new _NodesManage2.default(this);
	        var a = this.nodesManage.addNode({
	            text: 'Programming',
	            x: 200,
	            y: -50,
	            initialSize: 50
	        });
	        var b = this.nodesManage.addNode({
	            text: 'Application',
	            x: 0,
	            y: 50,
	            initialSize: 100
	        });
	        var c = this.nodesManage.addNode({
	            text: 'Manage',
	            x: -200,
	            y: -200,
	            initialSize: 50
	        });
	        var d = this.nodesManage.addNode({
	            text: 'Marketing',
	            x: -200,
	            y: 200,
	            initialSize: 50
	        });
	        a.connectTo(b);
	        c.connectTo(a);
	        c.connectTo(b);
	        d.connectTo(b);
	        d.connectTo({ x: -100, y: 250, z: 0 });
	        // Set Focus Node
	        this.focusNode = null;
	        this.nodesManage.loadNodeManageStatus();
	        // add zoom out and in on mouse wheel
	        window.addEventListener('mousewheel', function (e) {
	            _this.onMouseWheel(e);
	        });
	        // reset camera // DEBUGGING
	        _mousetrap2.default.bind('r e s e t c a m', function (e) {
	            _this.camera.position.set(0, 0, 0);
	            _this.camera.rotation.set(0, 0, 0);
	        });
	        // Mouse hover and click detect
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
	    }

	    _createClass(Scene, [{
	        key: 'onResize',
	        value: function onResize(W, H) {
	            this.camera.aspect = W / H;
	            this.camera.updateProjectionMatrix();
	        }
	    }, {
	        key: 'onMouseWheel',
	        value: function onMouseWheel(e) {
	            this.camera.position.z -= e.deltaY;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            this.frame++;
	            // Flow rendering to Node Management
	            this.nodesManage.render();
	            // Ease positions with animations relating to mouse movement
	            this.easeParameters();
	            // Store camera data in every frame
	            if (this.frame % 300 === 0) this.storeCameraDataToLocalStorage();
	        }
	    }, {
	        key: 'easeParameters',
	        value: function easeParameters() {
	            var W = window.innerWidth;
	            var H = window.innerHeight;
	            _Lights2.default.topLight.position.x = ease(_Lights2.default.topLight.position.x, // from
	            (MOUSE.x - W / 2) / W * -2000 // to
	            );
	            _Lights2.default.bottomLight.position.x = ease(_Lights2.default.bottomLight.position.x, // from
	            (MOUSE.x - W / 2) / W * 2000 // to
	            );
	            this.camera.rotation.y = ease(this.camera.rotation.y, // from
	            (MOUSE.x - W / 2) / W * -0.09 // to
	            );
	            this.camera.rotation.x = ease(this.camera.rotation.x, // from
	            (MOUSE.y - H / 2) / H * 0.015 // to
	            );
	            this.camera.position.x = ease(this.camera.position.x, // from
	            this.wishCameraPosition.x // to
	            , 10);
	            this.camera.position.y = ease(this.camera.position.y, // from
	            this.wishCameraPosition.y // to
	            , 10);
	        }
	    }, {
	        key: 'focusCameraOn',
	        value: function focusCameraOn(node) {
	            this.focusNode = node;
	            this.nodesManage.onFocusOnNode(node);
	            this.lookToNode(node);
	        }
	    }, {
	        key: 'lookToNode',
	        value: function lookToNode(node) {
	            this.wishCameraPosition = {
	                x: node.getObject3D().position.x,
	                y: node.getObject3D().position.y
	            };
	        }
	    }, {
	        key: 'storeCameraDataToLocalStorage',
	        value: function storeCameraDataToLocalStorage() {
	            // stringify and store camera position and rotation to localStorage
	            localStorage.setItem('camera', JSON.stringify({
	                position: { x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z },
	                rotation: { x: this.camera.rotation.x, y: this.camera.rotation.y, z: this.camera.rotation.z },
	                wishCameraPosition: { x: this.wishCameraPosition.x, y: this.wishCameraPosition.y }
	            }));
	        }
	    }, {
	        key: 'loadStoredCameraDataFromLocalStorage',
	        value: function loadStoredCameraDataFromLocalStorage() {
	            // if there was a camera item in localStorage set initial position and rotation of camera
	            if (localStorage.getItem('camera') !== null) {
	                var storedData = JSON.parse(localStorage.getItem('camera'));
	                if (storedData.position) this.camera.position.set(storedData.position.x, storedData.position.y, storedData.position.z);
	                if (storedData.rotation) this.camera.rotation.set(storedData.rotation.x, storedData.rotation.y, storedData.rotation.z);
	                if (storedData.wishCameraPosition) this.wishCameraPosition = { x: storedData.wishCameraPosition.x, y: storedData.wishCameraPosition.y };
	            }
	        }
	    }]);

	    return Scene;
	}();

	exports.default = Scene;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	// Panel css


	var _Property = __webpack_require__(16);

	var _Property2 = _interopRequireDefault(_Property);

	__webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// get elements fast function
	var get = function get(query) {
	    return document.querySelectorAll(query);
	};

	var PropertiesPanel = function () {
	    function PropertiesPanel(nodesManage) {
	        var _this = this;

	        _classCallCheck(this, PropertiesPanel);

	        // Define scene and panel
	        this.nodesManage = nodesManage;
	        this.panel = {
	            container: get('.panel')[0],
	            header: get('.panel > .header')[0],
	            icon: get('.panel > .header > i')[0],
	            title: get('.panel > .header > span')[0],
	            table: get('.panel > .table')[0]
	        };
	        // open and closing panel
	        this.isOpen = false;
	        this.panel.container.style.height = '40px';
	        this.panel.header.onclick = function () {
	            _this.isOpen = !_this.isOpen;
	            if (_this.isOpen) _this.panel.container.style.height = _this.panel.table.offsetHeight + 40 /* header height */ + 16 /* 8*2 = margins */ + 'px';else _this.panel.container.style.height = '40px';
	        };
	        // reseting panel for first use
	        this.panelProperties = [];
	        this.resetPanel();
	    }

	    _createClass(PropertiesPanel, [{
	        key: 'focus',
	        value: function focus(node) {
	            var _this2 = this;

	            this.panel.container.classList.remove('show');
	            setTimeout(function () {
	                _this2.resetPanel();
	                _this2.addNodePropsItems(node);
	                _this2.panel.container.classList.add('show');
	            }, 300);
	        }
	    }, {
	        key: 'addNodePropsItems',
	        value: function addNodePropsItems(node) {
	            var props = node.props;
	            this.panel.title.innerHTML = props.text.value;
	            for (var property in props) {
	                var _props$property = props[property],
	                    label = _props$property.label,
	                    type = _props$property.type,
	                    value = _props$property.value,
	                    options = _props$property.options;

	                this.addProperty(property, type, Object.assign({}, options, { label: label || property, value: value }), function (prop, value) {
	                    if (node['setProperty' + prop.capitalize()] !== undefined) node['setProperty' + prop.capitalize()](value);
	                });
	            }
	        }
	    }, {
	        key: 'resetPanel',
	        value: function resetPanel() {
	            // freeing up memory
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this.panelProperties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var panelProperty = _step.value;

	                    panelProperty.destroy();
	                    panelProperty = null;
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            this.panelProperties = [];
	            this.panel.table.innerHTML = '';
	        }
	    }, {
	        key: 'addProperty',
	        value: function addProperty(name, type, options, onchange) {
	            var prop = new _Property2.default(name, type, options, onchange);
	            this.panelProperties.push(prop);
	            this.panel.table.appendChild(prop.getElement());
	            return prop;
	        }
	    }]);

	    return PropertiesPanel;
	}();

	exports.default = PropertiesPanel;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(5);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./PropertiesPanel.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./PropertiesPanel.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports


	// module
	exports.push([module.id, ".panel {\n    position: absolute;\n    top: 10px;\n    right: 10px;\n    background: #333;\n    width: 250px;\n    color: white;\n    border-radius: 10px;\n    overflow: hidden;\n    -webkit-user-select: none;\n    user-select: none;\n    font-family: Arial;\n    -webkit-font-smoothing: antialiased;\n    opacity: 0;\n    transform: scale(0.95);\n    transition-duration: 0.5s;\n}\n.panel.show {\n    transform: scale(1);\n    opacity: 1;\n}\n.panel > .header {\n    width: 250px;\n    height: 40px;\n    position: relative;\n    cursor: pointer;\n    background: linear-gradient(#555, #555, #333);\n    border-radius: 10px;\n}\n.panel > .header:hover {\n    opacity: 0.9;\n}\n.panel > .header > i {\n    margin: 5px;\n    width: 30px;\n    height: 30px;\n    display: inline-block;\n    background-size: contain;\n}\n.panel > .header > i.node-icon {\n    background-image: url(" + __webpack_require__(7) + ")\n}\n/*.panel > .header > i.arrow-icon {\n    background-image: url(./images/arrow_icon.png)\n}*/\n.panel > .header > span {\n    font-size: 13px;\n    display: inline-block;\n    position: absolute;\n    left: 43px;\n    top: 12px;\n}\n.panel > .table {\n    display: table;\n    margin: 0;\n    width: 100%;\n    margin: 8px 0;\n}\n.panel > .table > .row {\n    display: table-row;\n    font-size: 11px;\n}\n.panel > .table > .row:nth-child(even) {\n    background: rgba(0,0,0,0.1)\n}\n.panel > .table > .row > div {\n    display: table-cell;\n    padding: 4px 2px;\n    height: 31px;\n    vertical-align: middle;\n}\n.panel > .table > .row > div.name {\n    text-align: right;\n    padding-left: 8px;\n    padding-right: 5px;\n    border-left: 4px solid red;\n}\n.panel > .table > .row > div.changebar {\n    padding-left: 5px;\n    padding-right: 5px;\n}\n.panel > .table > .row > div.value {\n    width: 30px;\n    padding-right: 10px;\n}\n.panel > .table > .row > div > input, .panel > .table > .row > div > select {\n    width: 100%;\n    height: 100%;\n    background: #333;\n    background: linear-gradient(#222, #292929);\n    outline: none;\n    border: none;\n    border-radius: 3px;\n    padding: 0 4px;\n    color: white;\n}\n.panel > .table > .row > div > button {\n    width: 100%;\n    height: 100%;\n}", ""]);

	// exports


/***/ },
/* 6 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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/GMzLdsAADo+aVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzMiA3OS4xNTkyODQsIDIwMTYvMDQvMTktMTM6MTM6NDAgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgICAgICAgICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICAgICAgICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8eG1wOkNyZWF0b3JUb29sPkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1LjUgKE1hY2ludG9zaCk8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICAgPHhtcDpDcmVhdGVEYXRlPjIwMTctMDItMTBUMTM6NTI6MjErMDM6MzA8L3htcDpDcmVhdGVEYXRlPgogICAgICAgICA8eG1wOk1ldGFkYXRhRGF0ZT4yMDE3LTAyLTEwVDEzOjUyOjIxKzAzOjMwPC94bXA6TWV0YWRhdGFEYXRlPgogICAgICAgICA8eG1wOk1vZGlmeURhdGU+MjAxNy0wMi0xMFQxMzo1MjoyMSswMzozMDwveG1wOk1vZGlmeURhdGU+CiAgICAgICAgIDx4bXBNTTpJbnN0YW5jZUlEPnhtcC5paWQ6ZDYyOGM4MDItYzg1OC00MTk3LTk1Y2UtNTY3NjAzYzQ2YjY2PC94bXBNTTpJbnN0YW5jZUlEPgogICAgICAgICA8eG1wTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6MmQxNGVhYTAtMmZiYS0xMTdhLTk1YmMtOWNmMmIzZTE4YTc4PC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6ZGYwYTdjNzAtYjMyMS00ZjM1LTk1M2YtZDRhYzE4MjA3NGRiPC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmRmMGE3YzcwLWIzMjEtNGYzNS05NTNmLWQ0YWMxODIwNzRkYjwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNy0wMi0xMFQxMzo1MjoyMSswMzozMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6ZDYyOGM4MDItYzg1OC00MTk3LTk1Y2UtNTY3NjAzYzQ2YjY2PC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTAyLTEwVDEzOjUyOjIxKzAzOjMwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChNYWNpbnRvc2gpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6U2VxPgogICAgICAgICA8L3htcE1NOkhpc3Rvcnk+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvcG5nPC9kYzpmb3JtYXQ+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDxwaG90b3Nob3A6SUNDUHJvZmlsZT5zUkdCIElFQzYxOTY2LTIuMTwvcGhvdG9zaG9wOklDQ1Byb2ZpbGU+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjE8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjEwMDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4xMDA8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Pl5TvawAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAHyxJREFUeNrsfVmQHMeZ3peVWUdXdffMYA4MMMBAAAGCBAhiSIEUCJESqAXF5YallXft9YbXliMUVjjkVWzE+tGPfvSD1w6t7QjFHrJeFN5VSNy1CfGQQNBBAiAIEARJEOfgGMwMBph7uuuuzPQDuyqqa6qvmcFBihnRMd09deX//ff/ZzaRUuKL8eAM5QsSPFiDxW82b97c9klSSjDGYBgGACAMQzDGwBhDFEWoVCro7u6G67pwHAd9fX3wPA+6rkPXdUgpIaWEpmmglEJRFExOTsIwDNLT06MsLi72BEGwuaenZ1OhUNjOGNvBGBuklPYRQvoA9Eopu+LnF0IglnRCCABIAB6ABULIrBBiJgiCGc75OOf8gm3bo/Pz8+OKokyVy2V7ZmZG9PT0wLIsVCoVWJYF3/dRKBTAOUcYhiCEwLZtMMYw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"

/***/ },
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 10 */
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
	lights.topLight.position.z = 1000;
	lights.bottomLight.position.y = -5000;
	lights.bottomLight.position.z = 1000;
	// exporting all of them
	exports.default = lights;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _PropertiesPanel = __webpack_require__(3);

	var _PropertiesPanel2 = _interopRequireDefault(_PropertiesPanel);

	var _Node = __webpack_require__(12);

	var _Node2 = _interopRequireDefault(_Node);

	var _Arrow = __webpack_require__(14);

	var _Arrow2 = _interopRequireDefault(_Arrow);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NodesManage = function () {
	    function NodesManage(scene) {
	        _classCallCheck(this, NodesManage);

	        this.nodes = [];
	        this.arrows = [];
	        this.scene = scene;
	        // Adding Properties Panel
	        this.panel = new _PropertiesPanel2.default(this);
	        // set focused node
	        this.focusedNode = null;
	    }
	    // Set and Get Nodes Management


	    _createClass(NodesManage, [{
	        key: 'addNode',
	        value: function addNode(props) {
	            var id = 0;
	            while (this.nodes[id] !== undefined) {
	                id++;
	            }Object.assign(props, { id: id });
	            var node = new _Node2.default(this, props);
	            this.scene.object.add(node.getObject3D());
	            this.nodes[id] = node;
	            return node;
	        }
	    }, {
	        key: 'get',
	        value: function get(id) {
	            return this.nodes[id];
	        }
	        // Exploring and Focusing Management

	    }, {
	        key: 'onFocusOnNode',
	        value: function onFocusOnNode(node) {
	            this.panel.focus(node);
	            this.focusedNode = node;
	            this.storeNodeManageStatus();
	        }
	        // Connection Management

	    }, {
	        key: 'connect',
	        value: function connect(from, to) {
	            // connection can make with IDs
	            if (typeof from === 'number') from = this.get(from);
	            if (typeof to === 'number') to = this.get(to);
	            // Define a new Arrow
	            var arrow = new _Arrow2.default(from, to);
	            // adding arrow to arrows array
	            this.arrows.push(arrow);
	            // Refresh refers and sources
	            if (from.refreshRefers !== undefined) from.refreshRefers();
	            if (to.refreshSources !== undefined) to.refreshSources();
	            // Adding arrow to scene
	            this.scene.object.add(arrow.getObject3D());
	            return arrow;
	        }
	    }, {
	        key: 'getArrowByFrom',
	        value: function getArrowByFrom(from) {
	            return this.arrows.filter(function (arrow) {
	                return arrow.from == from;
	            });
	        }
	    }, {
	        key: 'getArrowByTo',
	        value: function getArrowByTo(to) {
	            return this.arrows.filter(function (arrow) {
	                return arrow.to == to;
	            });
	        }
	    }, {
	        key: 'getArrowByFromAndTo',
	        value: function getArrowByFromAndTo(from, to) {
	            return this.arrows.filter(function (arrow) {
	                return arrow.from == from && arrow.to == to;
	            });
	        }
	    }, {
	        key: 'getAllNodeToNodeArrows',
	        value: function getAllNodeToNodeArrows() {
	            return this.arrows.filter(function (arrow) {
	                return arrow.to instanceof _Node2.default;
	            });
	        }
	    }, {
	        key: 'getAllNodeToPositionArrows',
	        value: function getAllNodeToPositionArrows() {
	            return this.arrows.filter(function (arrow) {
	                return !(arrow.to instanceof _Node2.default);
	            });
	        }
	        // Storage Management

	    }, {
	        key: 'storeNodeManageStatus',
	        value: function storeNodeManageStatus(id) {
	            localStorage.setItem('nodemanage', JSON.stringify({
	                focusedNodeId: this.focusedNode.getProp('id')
	            }));
	        }
	    }, {
	        key: 'loadNodeManageStatus',
	        value: function loadNodeManageStatus() {
	            if (localStorage.getItem('nodemanage') !== null) {
	                var storedData = JSON.parse(localStorage.getItem('nodemanage'));
	                var focusedNodeId = storedData.focusedNodeId;
	                this.focusedNode = this.get(parseInt(focusedNodeId));
	                this.scene.focusCameraOn(this.focusedNode);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {}
	    }]);

	    return NodesManage;
	}();

	exports.default = NodesManage;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _GLText = __webpack_require__(13);

	var _GLText2 = _interopRequireDefault(_GLText);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Node = function () {
	    function Node(nodeManage, initialProps) {
	        var _this = this;

	        _classCallCheck(this, Node);

	        this.nodeManage = nodeManage;
	        this.scene = nodeManage.scene;
	        // set props of node
	        this.props = {
	            id: {},
	            text: {
	                label: 'Text',
	                type: 'text'
	            },
	            initialSize: {
	                label: 'Initial Size',
	                type: 'range',
	                options: {
	                    min: 50,
	                    max: 100
	                }
	            },
	            x: {
	                label: 'Position x',
	                type: 'number'
	            },
	            y: {
	                label: 'Position y',
	                type: 'number'
	            }
	        };
	        // Define srcs and rfrs objects
	        this.rfrs = []; // refer arrows
	        this.srcs = []; // source arrows
	        // set initial props
	        this.setInitialProps(initialProps);
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
	        this.addText(this.getProp('text'));
	        // set Node's size and scale
	        this.size = this.getProp('initialSize');
	        this.setSize(this.size);
	        // Set position of mesh
	        this.setPos({
	            x: this.props.x.value,
	            y: this.props.y.value,
	            z: 0
	        }, 1);
	        // Binding mouse actions to Node
	        window.bindEvent.addEventListener(this.mesh, 'click', function (e) {
	            _this.onClick(e);
	        }, false);
	        window.bindEvent.addEventListener(this.mesh, 'dblclick', function (e) {
	            _this.onDoubleClick(e);
	        }, false);
	        window.bindEvent.addEventListener(this.mesh, 'mousedown', function (e) {
	            _this.onMouseDown(e);
	        }, false);
	        window.bindEvent.addEventListener(this.mesh, 'mouseup', function (e) {
	            _this.onMouseUp(e);
	        }, false);
	        window.bindEvent.addEventListener(this.mesh, 'mouseover', function (e) {
	            _this.onMouseOver(e);
	        }, false);
	        window.bindEvent.addEventListener(this.mesh, 'mouseout', function (e) {
	            _this.onMouseOut(e);
	        }, false);
	    }

	    _createClass(Node, [{
	        key: 'setInitialProps',
	        value: function setInitialProps(props) {
	            for (var prop in props) {
	                this.setProp(prop, props[prop]);
	            }
	        }
	    }, {
	        key: 'setProp',
	        value: function setProp(prop, value) {
	            this.props[prop].value = value;
	        }
	    }, {
	        key: 'getProp',
	        value: function getProp(prop) {
	            return this.props[prop].value;
	        }
	    }, {
	        key: 'setPos',
	        value: function setPos() {
	            var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	            var forceRate = arguments[1];

	            // Merging obj and current position together
	            obj = Object.assign({}, this.position, obj);
	            // check if it's string
	            if (typeof obj.x === 'string') obj.x = parseFloat(obj.x) + this.position.x;
	            if (typeof obj.y === 'string') obj.y = parseFloat(obj.y) + this.position.y;
	            if (typeof obj.z === 'string') obj.z = parseFloat(obj.z) + this.position.z;
	            // Setting mesh position
	            this.getObject3D().position.set(obj.x, obj.y, obj.z);
	            var textSize = this.text.getSize(forceRate);
	            this.text.getObject3D().position.set(-(textSize.width / 2), -(textSize.height / 2), -(textSize.depth / 2));
	            this.position = obj;
	        }
	    }, {
	        key: 'addText',
	        value: function addText(text) {
	            this.text = new _GLText2.default(text, this.size);
	            this.getObject3D().add(this.text.getObject3D());
	        }
	    }, {
	        key: 'setText',
	        value: function setText(text) {
	            this.text.setText(text);
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
	            this.size = size || this.size;
	            this.getObject3D().scale.x = this.getObject3D().scale.y = size / 50;
	            this.text.nodeSize = size;
	        }
	        // Binding Events

	    }, {
	        key: 'onClick',
	        value: function onClick(e) {
	            if (this.scene.focusNode !== this) this.scene.focusCameraOn(this);
	        }
	    }, {
	        key: 'onDoubleClick',
	        value: function onDoubleClick(e) {}
	    }, {
	        key: 'onMouseOver',
	        value: function onMouseOver(e) {
	            document.body.style.cursor = 'pointer';
	        }
	    }, {
	        key: 'onMouseOut',
	        value: function onMouseOut(e) {
	            document.body.style.cursor = 'default';
	        }
	    }, {
	        key: 'onMouseDown',
	        value: function onMouseDown(e) {}
	    }, {
	        key: 'onMouseUp',
	        value: function onMouseUp(e) {}

	        // Sources and Refers Handling

	    }, {
	        key: 'connectTo',
	        value: function connectTo(object) {
	            var arrow = null;
	            arrow = this.nodeManage.connect(this, object);
	            return arrow;
	        }
	    }, {
	        key: 'refreshRefers',
	        value: function refreshRefers() {
	            this.rfrs = this.nodeManage.getArrowByFrom(this);
	        }
	    }, {
	        key: 'refreshSources',
	        value: function refreshSources() {
	            this.srcs = this.nodeManage.getArrowByTo(this);
	        }

	        // Properties set

	    }, {
	        key: 'setPropertyText',
	        value: function setPropertyText(value) {
	            this.setProp('text', value);
	            document.querySelector('.panel > .header > span').innerHTML = value;
	            this.setText(value);
	        }
	    }, {
	        key: 'setPropertyX',
	        value: function setPropertyX(value) {
	            this.setProp('x', value);
	            this.position.x = value;
	            this.setPos({ x: parseFloat(value) });
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this.rfrs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var refer = _step.value;
	                    refer.fix();
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = this.srcs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var source = _step2.value;
	                    source.fix();
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }

	            this.scene.lookToNode(this);
	        }
	    }, {
	        key: 'setPropertyY',
	        value: function setPropertyY(value) {
	            this.setProp('y', value);
	            this.position.y = value;
	            this.setPos({ y: parseFloat(value) });
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;

	            try {
	                for (var _iterator3 = this.rfrs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var refer = _step3.value;
	                    refer.fix();
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }

	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;

	            try {
	                for (var _iterator4 = this.srcs[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                    var source = _step4.value;
	                    source.fix();
	                }
	            } catch (err) {
	                _didIteratorError4 = true;
	                _iteratorError4 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                        _iterator4.return();
	                    }
	                } finally {
	                    if (_didIteratorError4) {
	                        throw _iteratorError4;
	                    }
	                }
	            }

	            this.scene.lookToNode(this);
	        }
	    }]);

	    return Node;
	}();

	exports.default = Node;

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GLText = function () {
	    function GLText(text, nodeSize) {
	        _classCallCheck(this, GLText);

	        this.nodeSize = nodeSize;
	        this.storedRadius = 50;
	        this.material = new THREE.MeshStandardMaterial({
	            color: 0xffffff,
	            roughness: 0.8,
	            metalness: 0.5,
	            opacity: 0
	        });
	        this.geometry = this.getGeometry(text);
	        this.mesh = new THREE.Mesh(this.geometry, this.material);
	        this.size = this.getSize(1);
	        this.setScale();
	    }

	    _createClass(GLText, [{
	        key: 'setText',
	        value: function setText(text) {
	            this.mesh.geometry = this.getGeometry(text);
	            this.mesh.scale.x = this.mesh.scale.y = 1;
	            this.size = this.getSize();
	            this.setScale();
	        }
	    }, {
	        key: 'getGeometry',
	        value: function getGeometry(text) {
	            if (text === '' || text === undefined) {
	                text = '.';
	                this.material.transparent = true;
	            } else {
	                this.material.transparent = false;
	            }
	            var geometry = new THREE.TextGeometry(text, {
	                font: window.GL_FONTS.droid,
	                height: 5,
	                size: 15,
	                curveSegments: 5,
	                bevelThickness: 0.5,
	                bevelSize: 0.3,
	                bevelEnabled: true
	            });
	            geometry.dispose();
	            return geometry;
	        }
	    }, {
	        key: 'getSize',
	        value: function getSize(forceRate) {
	            var sizeRate = forceRate || this.nodeSize / 50;
	            var box = new THREE.Box3().setFromObject(this.mesh);
	            var ret = {
	                width: (box.max.x - box.min.x) / sizeRate,
	                height: (box.max.y - box.min.y) / sizeRate,
	                depth: (box.max.z - box.min.z) / sizeRate
	            };
	            return ret;
	        }
	    }, {
	        key: 'getObject3D',
	        value: function getObject3D() {
	            return this.mesh;
	        }
	    }, {
	        key: 'setScale',
	        value: function setScale() {
	            var defaultSize = 50;
	            var padding = 30;
	            var idealWidth = defaultSize * 2 - padding;
	            var scaleRate = idealWidth / Math.max(this.size.width, this.size.height * 1.5);
	            this.getObject3D().scale.x = this.getObject3D().scale.y = scaleRate;
	        }
	    }]);

	    return GLText;
	}();

	exports.default = GLText;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // importing Node for checking instanceof objects


	var _Node = __webpack_require__(12);

	var _Node2 = _interopRequireDefault(_Node);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// Arrow Class
	var Arrow = function () {
	    function Arrow() {
	        var from = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { x: 0, y: 0, z: 0 };
	        var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { x: 0, y: 0, z: 0 };

	        _classCallCheck(this, Arrow);

	        // Initializing from and to for Nodes and Pos-Objects
	        this.setFrom(from);
	        this.setTo(to);
	        // arrow basics
	        this.arrowHeight = 20;
	        this.height = 0;
	        this.arrow = new THREE.Object3D();
	        // arrow material
	        this.material = new THREE.MeshStandardMaterial({ color: 0xffffff });
	        // Getting Cone and Cylinder for sticking together
	        this.cone = this.getCone();
	        this.cylinder = this.getCylinder();
	        // Sticking to make an arrow
	        this.arrow.add(this.cone);
	        this.arrow.add(this.cylinder);
	        // fixing position and rotation
	        this.fix();
	    }
	    // change from to another Node or Pos-Object


	    _createClass(Arrow, [{
	        key: 'setFrom',
	        value: function setFrom(from) {
	            if (from instanceof _Node2.default) {
	                this.from = from;
	                from.refreshRefers();
	            } else {
	                from = Object.assign({ x: 0, y: 0, z: 0 }, from);
	                this.from = { position: from, size: 0 };
	            }
	        }
	        // change to to another Node or Pos-Object

	    }, {
	        key: 'setTo',
	        value: function setTo(to) {
	            if (to instanceof _Node2.default) {
	                this.to = to;
	                to.refreshSources();
	            } else {
	                to = Object.assign({ x: 0, y: 0, z: 0 }, to);
	                this.to = { position: to, size: 0 };
	            }
	        }
	        // fixing position and rotation of arrow

	    }, {
	        key: 'fix',
	        value: function fix() {
	            // Calculating distances
	            var deltaX = this.to.position.x - this.from.position.x;
	            var deltaY = this.to.position.y - this.from.position.y;
	            var deltaZ = this.to.position.z - this.from.position.z;
	            // Calculating rotateZ
	            var rotateZ = Math.atan2(deltaY, deltaX);
	            // Calculating from and to excatly position by node size
	            var from = {
	                x: this.from.position.x + Math.cos(rotateZ) * this.from.size,
	                y: this.from.position.y + Math.sin(rotateZ) * this.from.size,
	                z: this.from.position.z
	            };
	            var to = {
	                x: this.to.position.x + Math.cos(rotateZ - Math.PI) * this.to.size,
	                y: this.to.position.y + Math.sin(rotateZ - Math.PI) * this.to.size,
	                z: this.to.position.z
	            };
	            // reCalculate Delta x, y, z and rotateZ
	            deltaX = to.x - from.x;
	            deltaY = to.y - from.y;
	            deltaZ = to.z - from.z;
	            rotateZ = Math.atan2(deltaY, deltaX);
	            // last height
	            var lastHeight = this.height;
	            // Calculating length of arrow
	            this.height = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2) + Math.pow(deltaZ, 2));
	            // fixing geometry of cone and cylinder
	            this.cone.geometry.translate(0, (this.height - lastHeight) / 2, 0);
	            this.cylinder.geometry = this.getCylinderGeo();
	            this.cylinder.geometry.translate(0, -this.arrowHeight / 2, 0);
	            // setting Object3D position of arrow
	            this.setX((to.x + from.x) / 2);
	            this.setY((to.y + from.y) / 2);
	            this.setZ((to.z + from.z) / 2);
	            // setting Object3D rotation of arrow
	            // * It just work for 2D Rotations now *
	            this.rotateZ(rotateZ);
	        }
	    }, {
	        key: 'getCone',
	        value: function getCone() {
	            // Making a cone mesh
	            this.coneGeometry = new THREE.ConeGeometry(10, this.arrowHeight, 32);
	            this.coneGeometry.translate(0, -this.arrowHeight / 2, 0);
	            var mesh = new THREE.Mesh(this.coneGeometry, this.material);
	            return mesh;
	        }
	    }, {
	        key: 'getCylinder',
	        value: function getCylinder() {
	            // Making a cylinder mesh
	            this.cylinderGeometry = this.getCylinderGeo();
	            var mesh = new THREE.Mesh(this.cylinderGeometry, this.material);
	            return mesh;
	        }
	    }, {
	        key: 'getCylinderGeo',
	        value: function getCylinderGeo() {
	            // make cylinder geometry by it's height
	            var height = (this.height || this.arrowHeight + 1) - this.arrowHeight;
	            return new THREE.CylinderBufferGeometry(4, 4, height, 10);
	        }
	        // get Object3D of arrow

	    }, {
	        key: 'getObject3D',
	        value: function getObject3D() {
	            return this.arrow;
	        }
	        // set Object3D position and rotation

	    }, {
	        key: 'setX',
	        value: function setX(x) {
	            this.getObject3D().position.x = x;
	        }
	    }, {
	        key: 'setY',
	        value: function setY(y) {
	            this.getObject3D().position.y = y;
	        }
	    }, {
	        key: 'setZ',
	        value: function setZ(z) {
	            this.getObject3D().position.z = z + 5;
	        }
	    }, {
	        key: 'rotateZ',
	        value: function rotateZ(deg) {
	            this.getObject3D().rotation.z = deg - Math.PI / 2;
	        }
	    }]);

	    return Arrow;
	}();

	// Exporting Arrow


	exports.default = Arrow;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*global define:false */
	/**
	 * Copyright 2016 Craig Campbell
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 * Mousetrap is a simple keyboard shortcut library for Javascript with
	 * no external dependencies
	 *
	 * @version 1.6.0
	 * @url craig.is/killing/mice
	 */
	(function(window, document, undefined) {

	    // Check if mousetrap is used inside browser, if not, return
	    if (!window) {
	        return;
	    }

	    /**
	     * mapping of special keycodes to their corresponding keys
	     *
	     * everything in this dictionary cannot use keypress events
	     * so it has to be here to map to the correct keycodes for
	     * keyup/keydown events
	     *
	     * @type {Object}
	     */
	    var _MAP = {
	        8: 'backspace',
	        9: 'tab',
	        13: 'enter',
	        16: 'shift',
	        17: 'ctrl',
	        18: 'alt',
	        20: 'capslock',
	        27: 'esc',
	        32: 'space',
	        33: 'pageup',
	        34: 'pagedown',
	        35: 'end',
	        36: 'home',
	        37: 'left',
	        38: 'up',
	        39: 'right',
	        40: 'down',
	        45: 'ins',
	        46: 'del',
	        91: 'meta',
	        93: 'meta',
	        224: 'meta'
	    };

	    /**
	     * mapping for special characters so they can support
	     *
	     * this dictionary is only used incase you want to bind a
	     * keyup or keydown event to one of these keys
	     *
	     * @type {Object}
	     */
	    var _KEYCODE_MAP = {
	        106: '*',
	        107: '+',
	        109: '-',
	        110: '.',
	        111 : '/',
	        186: ';',
	        187: '=',
	        188: ',',
	        189: '-',
	        190: '.',
	        191: '/',
	        192: '`',
	        219: '[',
	        220: '\\',
	        221: ']',
	        222: '\''
	    };

	    /**
	     * this is a mapping of keys that require shift on a US keypad
	     * back to the non shift equivelents
	     *
	     * this is so you can use keyup events with these keys
	     *
	     * note that this will only work reliably on US keyboards
	     *
	     * @type {Object}
	     */
	    var _SHIFT_MAP = {
	        '~': '`',
	        '!': '1',
	        '@': '2',
	        '#': '3',
	        '$': '4',
	        '%': '5',
	        '^': '6',
	        '&': '7',
	        '*': '8',
	        '(': '9',
	        ')': '0',
	        '_': '-',
	        '+': '=',
	        ':': ';',
	        '\"': '\'',
	        '<': ',',
	        '>': '.',
	        '?': '/',
	        '|': '\\'
	    };

	    /**
	     * this is a list of special strings you can use to map
	     * to modifier keys when you specify your keyboard shortcuts
	     *
	     * @type {Object}
	     */
	    var _SPECIAL_ALIASES = {
	        'option': 'alt',
	        'command': 'meta',
	        'return': 'enter',
	        'escape': 'esc',
	        'plus': '+',
	        'mod': /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? 'meta' : 'ctrl'
	    };

	    /**
	     * variable to store the flipped version of _MAP from above
	     * needed to check if we should use keypress or not when no action
	     * is specified
	     *
	     * @type {Object|undefined}
	     */
	    var _REVERSE_MAP;

	    /**
	     * loop through the f keys, f1 to f19 and add them to the map
	     * programatically
	     */
	    for (var i = 1; i < 20; ++i) {
	        _MAP[111 + i] = 'f' + i;
	    }

	    /**
	     * loop through to map numbers on the numeric keypad
	     */
	    for (i = 0; i <= 9; ++i) {
	        _MAP[i + 96] = i;
	    }

	    /**
	     * cross browser add event method
	     *
	     * @param {Element|HTMLDocument} object
	     * @param {string} type
	     * @param {Function} callback
	     * @returns void
	     */
	    function _addEvent(object, type, callback) {
	        if (object.addEventListener) {
	            object.addEventListener(type, callback, false);
	            return;
	        }

	        object.attachEvent('on' + type, callback);
	    }

	    /**
	     * takes the event and returns the key character
	     *
	     * @param {Event} e
	     * @return {string}
	     */
	    function _characterFromEvent(e) {

	        // for keypress events we should return the character as is
	        if (e.type == 'keypress') {
	            var character = String.fromCharCode(e.which);

	            // if the shift key is not pressed then it is safe to assume
	            // that we want the character to be lowercase.  this means if
	            // you accidentally have caps lock on then your key bindings
	            // will continue to work
	            //
	            // the only side effect that might not be desired is if you
	            // bind something like 'A' cause you want to trigger an
	            // event when capital A is pressed caps lock will no longer
	            // trigger the event.  shift+a will though.
	            if (!e.shiftKey) {
	                character = character.toLowerCase();
	            }

	            return character;
	        }

	        // for non keypress events the special maps are needed
	        if (_MAP[e.which]) {
	            return _MAP[e.which];
	        }

	        if (_KEYCODE_MAP[e.which]) {
	            return _KEYCODE_MAP[e.which];
	        }

	        // if it is not in the special map

	        // with keydown and keyup events the character seems to always
	        // come in as an uppercase character whether you are pressing shift
	        // or not.  we should make sure it is always lowercase for comparisons
	        return String.fromCharCode(e.which).toLowerCase();
	    }

	    /**
	     * checks if two arrays are equal
	     *
	     * @param {Array} modifiers1
	     * @param {Array} modifiers2
	     * @returns {boolean}
	     */
	    function _modifiersMatch(modifiers1, modifiers2) {
	        return modifiers1.sort().join(',') === modifiers2.sort().join(',');
	    }

	    /**
	     * takes a key event and figures out what the modifiers are
	     *
	     * @param {Event} e
	     * @returns {Array}
	     */
	    function _eventModifiers(e) {
	        var modifiers = [];

	        if (e.shiftKey) {
	            modifiers.push('shift');
	        }

	        if (e.altKey) {
	            modifiers.push('alt');
	        }

	        if (e.ctrlKey) {
	            modifiers.push('ctrl');
	        }

	        if (e.metaKey) {
	            modifiers.push('meta');
	        }

	        return modifiers;
	    }

	    /**
	     * prevents default for this event
	     *
	     * @param {Event} e
	     * @returns void
	     */
	    function _preventDefault(e) {
	        if (e.preventDefault) {
	            e.preventDefault();
	            return;
	        }

	        e.returnValue = false;
	    }

	    /**
	     * stops propogation for this event
	     *
	     * @param {Event} e
	     * @returns void
	     */
	    function _stopPropagation(e) {
	        if (e.stopPropagation) {
	            e.stopPropagation();
	            return;
	        }

	        e.cancelBubble = true;
	    }

	    /**
	     * determines if the keycode specified is a modifier key or not
	     *
	     * @param {string} key
	     * @returns {boolean}
	     */
	    function _isModifier(key) {
	        return key == 'shift' || key == 'ctrl' || key == 'alt' || key == 'meta';
	    }

	    /**
	     * reverses the map lookup so that we can look for specific keys
	     * to see what can and can't use keypress
	     *
	     * @return {Object}
	     */
	    function _getReverseMap() {
	        if (!_REVERSE_MAP) {
	            _REVERSE_MAP = {};
	            for (var key in _MAP) {

	                // pull out the numeric keypad from here cause keypress should
	                // be able to detect the keys from the character
	                if (key > 95 && key < 112) {
	                    continue;
	                }

	                if (_MAP.hasOwnProperty(key)) {
	                    _REVERSE_MAP[_MAP[key]] = key;
	                }
	            }
	        }
	        return _REVERSE_MAP;
	    }

	    /**
	     * picks the best action based on the key combination
	     *
	     * @param {string} key - character for key
	     * @param {Array} modifiers
	     * @param {string=} action passed in
	     */
	    function _pickBestAction(key, modifiers, action) {

	        // if no action was picked in we should try to pick the one
	        // that we think would work best for this key
	        if (!action) {
	            action = _getReverseMap()[key] ? 'keydown' : 'keypress';
	        }

	        // modifier keys don't work as expected with keypress,
	        // switch to keydown
	        if (action == 'keypress' && modifiers.length) {
	            action = 'keydown';
	        }

	        return action;
	    }

	    /**
	     * Converts from a string key combination to an array
	     *
	     * @param  {string} combination like "command+shift+l"
	     * @return {Array}
	     */
	    function _keysFromString(combination) {
	        if (combination === '+') {
	            return ['+'];
	        }

	        combination = combination.replace(/\+{2}/g, '+plus');
	        return combination.split('+');
	    }

	    /**
	     * Gets info for a specific key combination
	     *
	     * @param  {string} combination key combination ("command+s" or "a" or "*")
	     * @param  {string=} action
	     * @returns {Object}
	     */
	    function _getKeyInfo(combination, action) {
	        var keys;
	        var key;
	        var i;
	        var modifiers = [];

	        // take the keys from this pattern and figure out what the actual
	        // pattern is all about
	        keys = _keysFromString(combination);

	        for (i = 0; i < keys.length; ++i) {
	            key = keys[i];

	            // normalize key names
	            if (_SPECIAL_ALIASES[key]) {
	                key = _SPECIAL_ALIASES[key];
	            }

	            // if this is not a keypress event then we should
	            // be smart about using shift keys
	            // this will only work for US keyboards however
	            if (action && action != 'keypress' && _SHIFT_MAP[key]) {
	                key = _SHIFT_MAP[key];
	                modifiers.push('shift');
	            }

	            // if this key is a modifier then add it to the list of modifiers
	            if (_isModifier(key)) {
	                modifiers.push(key);
	            }
	        }

	        // depending on what the key combination is
	        // we will try to pick the best event for it
	        action = _pickBestAction(key, modifiers, action);

	        return {
	            key: key,
	            modifiers: modifiers,
	            action: action
	        };
	    }

	    function _belongsTo(element, ancestor) {
	        if (element === null || element === document) {
	            return false;
	        }

	        if (element === ancestor) {
	            return true;
	        }

	        return _belongsTo(element.parentNode, ancestor);
	    }

	    function Mousetrap(targetElement) {
	        var self = this;

	        targetElement = targetElement || document;

	        if (!(self instanceof Mousetrap)) {
	            return new Mousetrap(targetElement);
	        }

	        /**
	         * element to attach key events to
	         *
	         * @type {Element}
	         */
	        self.target = targetElement;

	        /**
	         * a list of all the callbacks setup via Mousetrap.bind()
	         *
	         * @type {Object}
	         */
	        self._callbacks = {};

	        /**
	         * direct map of string combinations to callbacks used for trigger()
	         *
	         * @type {Object}
	         */
	        self._directMap = {};

	        /**
	         * keeps track of what level each sequence is at since multiple
	         * sequences can start out with the same sequence
	         *
	         * @type {Object}
	         */
	        var _sequenceLevels = {};

	        /**
	         * variable to store the setTimeout call
	         *
	         * @type {null|number}
	         */
	        var _resetTimer;

	        /**
	         * temporary state where we will ignore the next keyup
	         *
	         * @type {boolean|string}
	         */
	        var _ignoreNextKeyup = false;

	        /**
	         * temporary state where we will ignore the next keypress
	         *
	         * @type {boolean}
	         */
	        var _ignoreNextKeypress = false;

	        /**
	         * are we currently inside of a sequence?
	         * type of action ("keyup" or "keydown" or "keypress") or false
	         *
	         * @type {boolean|string}
	         */
	        var _nextExpectedAction = false;

	        /**
	         * resets all sequence counters except for the ones passed in
	         *
	         * @param {Object} doNotReset
	         * @returns void
	         */
	        function _resetSequences(doNotReset) {
	            doNotReset = doNotReset || {};

	            var activeSequences = false,
	                key;

	            for (key in _sequenceLevels) {
	                if (doNotReset[key]) {
	                    activeSequences = true;
	                    continue;
	                }
	                _sequenceLevels[key] = 0;
	            }

	            if (!activeSequences) {
	                _nextExpectedAction = false;
	            }
	        }

	        /**
	         * finds all callbacks that match based on the keycode, modifiers,
	         * and action
	         *
	         * @param {string} character
	         * @param {Array} modifiers
	         * @param {Event|Object} e
	         * @param {string=} sequenceName - name of the sequence we are looking for
	         * @param {string=} combination
	         * @param {number=} level
	         * @returns {Array}
	         */
	        function _getMatches(character, modifiers, e, sequenceName, combination, level) {
	            var i;
	            var callback;
	            var matches = [];
	            var action = e.type;

	            // if there are no events related to this keycode
	            if (!self._callbacks[character]) {
	                return [];
	            }

	            // if a modifier key is coming up on its own we should allow it
	            if (action == 'keyup' && _isModifier(character)) {
	                modifiers = [character];
	            }

	            // loop through all callbacks for the key that was pressed
	            // and see if any of them match
	            for (i = 0; i < self._callbacks[character].length; ++i) {
	                callback = self._callbacks[character][i];

	                // if a sequence name is not specified, but this is a sequence at
	                // the wrong level then move onto the next match
	                if (!sequenceName && callback.seq && _sequenceLevels[callback.seq] != callback.level) {
	                    continue;
	                }

	                // if the action we are looking for doesn't match the action we got
	                // then we should keep going
	                if (action != callback.action) {
	                    continue;
	                }

	                // if this is a keypress event and the meta key and control key
	                // are not pressed that means that we need to only look at the
	                // character, otherwise check the modifiers as well
	                //
	                // chrome will not fire a keypress if meta or control is down
	                // safari will fire a keypress if meta or meta+shift is down
	                // firefox will fire a keypress if meta or control is down
	                if ((action == 'keypress' && !e.metaKey && !e.ctrlKey) || _modifiersMatch(modifiers, callback.modifiers)) {

	                    // when you bind a combination or sequence a second time it
	                    // should overwrite the first one.  if a sequenceName or
	                    // combination is specified in this call it does just that
	                    //
	                    // @todo make deleting its own method?
	                    var deleteCombo = !sequenceName && callback.combo == combination;
	                    var deleteSequence = sequenceName && callback.seq == sequenceName && callback.level == level;
	                    if (deleteCombo || deleteSequence) {
	                        self._callbacks[character].splice(i, 1);
	                    }

	                    matches.push(callback);
	                }
	            }

	            return matches;
	        }

	        /**
	         * actually calls the callback function
	         *
	         * if your callback function returns false this will use the jquery
	         * convention - prevent default and stop propogation on the event
	         *
	         * @param {Function} callback
	         * @param {Event} e
	         * @returns void
	         */
	        function _fireCallback(callback, e, combo, sequence) {

	            // if this event should not happen stop here
	            if (self.stopCallback(e, e.target || e.srcElement, combo, sequence)) {
	                return;
	            }

	            if (callback(e, combo) === false) {
	                _preventDefault(e);
	                _stopPropagation(e);
	            }
	        }

	        /**
	         * handles a character key event
	         *
	         * @param {string} character
	         * @param {Array} modifiers
	         * @param {Event} e
	         * @returns void
	         */
	        self._handleKey = function(character, modifiers, e) {
	            var callbacks = _getMatches(character, modifiers, e);
	            var i;
	            var doNotReset = {};
	            var maxLevel = 0;
	            var processedSequenceCallback = false;

	            // Calculate the maxLevel for sequences so we can only execute the longest callback sequence
	            for (i = 0; i < callbacks.length; ++i) {
	                if (callbacks[i].seq) {
	                    maxLevel = Math.max(maxLevel, callbacks[i].level);
	                }
	            }

	            // loop through matching callbacks for this key event
	            for (i = 0; i < callbacks.length; ++i) {

	                // fire for all sequence callbacks
	                // this is because if for example you have multiple sequences
	                // bound such as "g i" and "g t" they both need to fire the
	                // callback for matching g cause otherwise you can only ever
	                // match the first one
	                if (callbacks[i].seq) {

	                    // only fire callbacks for the maxLevel to prevent
	                    // subsequences from also firing
	                    //
	                    // for example 'a option b' should not cause 'option b' to fire
	                    // even though 'option b' is part of the other sequence
	                    //
	                    // any sequences that do not match here will be discarded
	                    // below by the _resetSequences call
	                    if (callbacks[i].level != maxLevel) {
	                        continue;
	                    }

	                    processedSequenceCallback = true;

	                    // keep a list of which sequences were matches for later
	                    doNotReset[callbacks[i].seq] = 1;
	                    _fireCallback(callbacks[i].callback, e, callbacks[i].combo, callbacks[i].seq);
	                    continue;
	                }

	                // if there were no sequence matches but we are still here
	                // that means this is a regular match so we should fire that
	                if (!processedSequenceCallback) {
	                    _fireCallback(callbacks[i].callback, e, callbacks[i].combo);
	                }
	            }

	            // if the key you pressed matches the type of sequence without
	            // being a modifier (ie "keyup" or "keypress") then we should
	            // reset all sequences that were not matched by this event
	            //
	            // this is so, for example, if you have the sequence "h a t" and you
	            // type "h e a r t" it does not match.  in this case the "e" will
	            // cause the sequence to reset
	            //
	            // modifier keys are ignored because you can have a sequence
	            // that contains modifiers such as "enter ctrl+space" and in most
	            // cases the modifier key will be pressed before the next key
	            //
	            // also if you have a sequence such as "ctrl+b a" then pressing the
	            // "b" key will trigger a "keypress" and a "keydown"
	            //
	            // the "keydown" is expected when there is a modifier, but the
	            // "keypress" ends up matching the _nextExpectedAction since it occurs
	            // after and that causes the sequence to reset
	            //
	            // we ignore keypresses in a sequence that directly follow a keydown
	            // for the same character
	            var ignoreThisKeypress = e.type == 'keypress' && _ignoreNextKeypress;
	            if (e.type == _nextExpectedAction && !_isModifier(character) && !ignoreThisKeypress) {
	                _resetSequences(doNotReset);
	            }

	            _ignoreNextKeypress = processedSequenceCallback && e.type == 'keydown';
	        };

	        /**
	         * handles a keydown event
	         *
	         * @param {Event} e
	         * @returns void
	         */
	        function _handleKeyEvent(e) {

	            // normalize e.which for key events
	            // @see http://stackoverflow.com/questions/4285627/javascript-keycode-vs-charcode-utter-confusion
	            if (typeof e.which !== 'number') {
	                e.which = e.keyCode;
	            }

	            var character = _characterFromEvent(e);

	            // no character found then stop
	            if (!character) {
	                return;
	            }

	            // need to use === for the character check because the character can be 0
	            if (e.type == 'keyup' && _ignoreNextKeyup === character) {
	                _ignoreNextKeyup = false;
	                return;
	            }

	            self.handleKey(character, _eventModifiers(e), e);
	        }

	        /**
	         * called to set a 1 second timeout on the specified sequence
	         *
	         * this is so after each key press in the sequence you have 1 second
	         * to press the next key before you have to start over
	         *
	         * @returns void
	         */
	        function _resetSequenceTimer() {
	            clearTimeout(_resetTimer);
	            _resetTimer = setTimeout(_resetSequences, 1000);
	        }

	        /**
	         * binds a key sequence to an event
	         *
	         * @param {string} combo - combo specified in bind call
	         * @param {Array} keys
	         * @param {Function} callback
	         * @param {string=} action
	         * @returns void
	         */
	        function _bindSequence(combo, keys, callback, action) {

	            // start off by adding a sequence level record for this combination
	            // and setting the level to 0
	            _sequenceLevels[combo] = 0;

	            /**
	             * callback to increase the sequence level for this sequence and reset
	             * all other sequences that were active
	             *
	             * @param {string} nextAction
	             * @returns {Function}
	             */
	            function _increaseSequence(nextAction) {
	                return function() {
	                    _nextExpectedAction = nextAction;
	                    ++_sequenceLevels[combo];
	                    _resetSequenceTimer();
	                };
	            }

	            /**
	             * wraps the specified callback inside of another function in order
	             * to reset all sequence counters as soon as this sequence is done
	             *
	             * @param {Event} e
	             * @returns void
	             */
	            function _callbackAndReset(e) {
	                _fireCallback(callback, e, combo);

	                // we should ignore the next key up if the action is key down
	                // or keypress.  this is so if you finish a sequence and
	                // release the key the final key will not trigger a keyup
	                if (action !== 'keyup') {
	                    _ignoreNextKeyup = _characterFromEvent(e);
	                }

	                // weird race condition if a sequence ends with the key
	                // another sequence begins with
	                setTimeout(_resetSequences, 10);
	            }

	            // loop through keys one at a time and bind the appropriate callback
	            // function.  for any key leading up to the final one it should
	            // increase the sequence. after the final, it should reset all sequences
	            //
	            // if an action is specified in the original bind call then that will
	            // be used throughout.  otherwise we will pass the action that the
	            // next key in the sequence should match.  this allows a sequence
	            // to mix and match keypress and keydown events depending on which
	            // ones are better suited to the key provided
	            for (var i = 0; i < keys.length; ++i) {
	                var isFinal = i + 1 === keys.length;
	                var wrappedCallback = isFinal ? _callbackAndReset : _increaseSequence(action || _getKeyInfo(keys[i + 1]).action);
	                _bindSingle(keys[i], wrappedCallback, action, combo, i);
	            }
	        }

	        /**
	         * binds a single keyboard combination
	         *
	         * @param {string} combination
	         * @param {Function} callback
	         * @param {string=} action
	         * @param {string=} sequenceName - name of sequence if part of sequence
	         * @param {number=} level - what part of the sequence the command is
	         * @returns void
	         */
	        function _bindSingle(combination, callback, action, sequenceName, level) {

	            // store a direct mapped reference for use with Mousetrap.trigger
	            self._directMap[combination + ':' + action] = callback;

	            // make sure multiple spaces in a row become a single space
	            combination = combination.replace(/\s+/g, ' ');

	            var sequence = combination.split(' ');
	            var info;

	            // if this pattern is a sequence of keys then run through this method
	            // to reprocess each pattern one key at a time
	            if (sequence.length > 1) {
	                _bindSequence(combination, sequence, callback, action);
	                return;
	            }

	            info = _getKeyInfo(combination, action);

	            // make sure to initialize array if this is the first time
	            // a callback is added for this key
	            self._callbacks[info.key] = self._callbacks[info.key] || [];

	            // remove an existing match if there is one
	            _getMatches(info.key, info.modifiers, {type: info.action}, sequenceName, combination, level);

	            // add this call back to the array
	            // if it is a sequence put it at the beginning
	            // if not put it at the end
	            //
	            // this is important because the way these are processed expects
	            // the sequence ones to come first
	            self._callbacks[info.key][sequenceName ? 'unshift' : 'push']({
	                callback: callback,
	                modifiers: info.modifiers,
	                action: info.action,
	                seq: sequenceName,
	                level: level,
	                combo: combination
	            });
	        }

	        /**
	         * binds multiple combinations to the same callback
	         *
	         * @param {Array} combinations
	         * @param {Function} callback
	         * @param {string|undefined} action
	         * @returns void
	         */
	        self._bindMultiple = function(combinations, callback, action) {
	            for (var i = 0; i < combinations.length; ++i) {
	                _bindSingle(combinations[i], callback, action);
	            }
	        };

	        // start!
	        _addEvent(targetElement, 'keypress', _handleKeyEvent);
	        _addEvent(targetElement, 'keydown', _handleKeyEvent);
	        _addEvent(targetElement, 'keyup', _handleKeyEvent);
	    }

	    /**
	     * binds an event to mousetrap
	     *
	     * can be a single key, a combination of keys separated with +,
	     * an array of keys, or a sequence of keys separated by spaces
	     *
	     * be sure to list the modifier keys first to make sure that the
	     * correct key ends up getting bound (the last key in the pattern)
	     *
	     * @param {string|Array} keys
	     * @param {Function} callback
	     * @param {string=} action - 'keypress', 'keydown', or 'keyup'
	     * @returns void
	     */
	    Mousetrap.prototype.bind = function(keys, callback, action) {
	        var self = this;
	        keys = keys instanceof Array ? keys : [keys];
	        self._bindMultiple.call(self, keys, callback, action);
	        return self;
	    };

	    /**
	     * unbinds an event to mousetrap
	     *
	     * the unbinding sets the callback function of the specified key combo
	     * to an empty function and deletes the corresponding key in the
	     * _directMap dict.
	     *
	     * TODO: actually remove this from the _callbacks dictionary instead
	     * of binding an empty function
	     *
	     * the keycombo+action has to be exactly the same as
	     * it was defined in the bind method
	     *
	     * @param {string|Array} keys
	     * @param {string} action
	     * @returns void
	     */
	    Mousetrap.prototype.unbind = function(keys, action) {
	        var self = this;
	        return self.bind.call(self, keys, function() {}, action);
	    };

	    /**
	     * triggers an event that has already been bound
	     *
	     * @param {string} keys
	     * @param {string=} action
	     * @returns void
	     */
	    Mousetrap.prototype.trigger = function(keys, action) {
	        var self = this;
	        if (self._directMap[keys + ':' + action]) {
	            self._directMap[keys + ':' + action]({}, keys);
	        }
	        return self;
	    };

	    /**
	     * resets the library back to its initial state.  this is useful
	     * if you want to clear out the current keyboard shortcuts and bind
	     * new ones - for example if you switch to another page
	     *
	     * @returns void
	     */
	    Mousetrap.prototype.reset = function() {
	        var self = this;
	        self._callbacks = {};
	        self._directMap = {};
	        return self;
	    };

	    /**
	     * should we stop this event before firing off callbacks
	     *
	     * @param {Event} e
	     * @param {Element} element
	     * @return {boolean}
	     */
	    Mousetrap.prototype.stopCallback = function(e, element) {
	        var self = this;

	        // if the element has the class "mousetrap" then no need to stop
	        if ((' ' + element.className + ' ').indexOf(' mousetrap ') > -1) {
	            return false;
	        }

	        if (_belongsTo(element, self.target)) {
	            return false;
	        }

	        // stop for input, select, and textarea
	        return element.tagName == 'INPUT' || element.tagName == 'SELECT' || element.tagName == 'TEXTAREA' || element.isContentEditable;
	    };

	    /**
	     * exposes _handleKey publicly so it can be overwritten by extensions
	     */
	    Mousetrap.prototype.handleKey = function() {
	        var self = this;
	        return self._handleKey.apply(self, arguments);
	    };

	    /**
	     * allow custom key mappings
	     */
	    Mousetrap.addKeycodes = function(object) {
	        for (var key in object) {
	            if (object.hasOwnProperty(key)) {
	                _MAP[key] = object[key];
	            }
	        }
	        _REVERSE_MAP = null;
	    };

	    /**
	     * Init the global mousetrap functions
	     *
	     * This method is needed to allow the global mousetrap functions to work
	     * now that mousetrap is a constructor function.
	     */
	    Mousetrap.init = function() {
	        var documentMousetrap = Mousetrap(document);
	        for (var method in documentMousetrap) {
	            if (method.charAt(0) !== '_') {
	                Mousetrap[method] = (function(method) {
	                    return function() {
	                        return documentMousetrap[method].apply(documentMousetrap, arguments);
	                    };
	                } (method));
	            }
	        }
	    };

	    Mousetrap.init();

	    // expose mousetrap to the global object
	    window.Mousetrap = Mousetrap;

	    // expose as a common js module
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = Mousetrap;
	    }

	    // expose mousetrap as an AMD module
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	            return Mousetrap;
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	}) (typeof window !== 'undefined' ? window : null, typeof  window !== 'undefined' ? document : null);


/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// create elements fast function
	var create = function create(tagname) {
	    return document.createElement(tagname);
	};

	// captilize prototype for String class
	String.prototype.capitalize = function () {
	    return this.charAt(0).toUpperCase() + this.slice(1);
	};

	var Property = function () {
	    function Property(name, type, options, onchange) {
	        _classCallCheck(this, Property);

	        this.options = Object.assign({}, options, {
	            name: name,
	            type: type || 'readonly',
	            label: options.label || name
	        });
	        this.onchange = onchange;
	        this.createBasics();
	    }

	    _createClass(Property, [{
	        key: 'createBasics',
	        value: function createBasics() {
	            // creating container
	            this.container = create('div');
	            this.container.className = 'row';
	            this.container.setAttribute('data-name', this.options.name);
	            // set cell contents include this.changebarContent and this.valueContent
	            this.setCellContents();
	            // creating label cell
	            this.label = create('div');
	            this.label.className = 'name';
	            this.label.innerHTML = this.options.label;
	            this.container.appendChild(this.label);
	            // creating changing bar cell
	            this.changebar = create('div');
	            this.changebar.className = 'changebar';
	            if (this.changebarContent !== null) this.changebar.appendChild(this.changebarContent);
	            this.container.appendChild(this.changebar);
	            // creating changing bar cell
	            this.value = create('div');
	            this.value.className = 'value';
	            if (this.valueContent !== null) this.value.appendChild(this.valueContent);
	            this.container.appendChild(this.value);
	        }
	    }, {
	        key: 'setCellContents',
	        value: function setCellContents() {
	            this.changebarContent = null;
	            this.valueContent = null;
	            var func = this['set' + this.options.type.capitalize() + 'Contents'];
	            if (func !== undefined) func.bind(this).call();else console.error('Invalid type of property');
	        }
	    }, {
	        key: 'getElement',
	        value: function getElement() {
	            return this.container;
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            // free up memory
	            this.changebarContent = null;
	            this.valueContent = null;
	            this.container = null;
	            this.changebar = null;
	            this.value = null;
	        }
	        // ==== types of property ====

	    }, {
	        key: 'setTextContents',
	        value: function setTextContents() {
	            var _this = this;

	            var readonly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	            this.changebarContent = create('input');
	            this.changebarContent.type = 'text';
	            this.changebarContent.value = this.options.value;
	            if (!readonly) {
	                this.changebarContent.onkeyup = function () {
	                    _this.onchange(_this.options.name, _this.changebarContent.value);
	                };
	            } else {
	                this.changebarContent.disabled = true;
	            }
	        }
	    }, {
	        key: 'setNumberContents',
	        value: function setNumberContents() {
	            var _this2 = this;

	            this.changebarContent = create('input');
	            this.changebarContent.type = 'number';
	            this.changebarContent.min = this.options.min || '';
	            this.changebarContent.max = this.options.max || '';
	            this.changebarContent.step = this.options.step || '';
	            this.changebarContent.value = this.options.value;
	            this.changebarContent.onchange = this.changebarContent.onmouseup = function () {
	                _this2.onchange(_this2.options.name, _this2.changebarContent.value);
	            };
	        }
	    }, {
	        key: 'setRangeContents',
	        value: function setRangeContents() {
	            var _this3 = this;

	            this.changebarContent = create('input');
	            this.changebarContent.type = 'range';
	            this.changebarContent.min = this.options.min || '';
	            this.changebarContent.max = this.options.max || '';
	            this.changebarContent.step = this.options.step || '';
	            this.changebarContent.value = this.options.value;
	            this.valueContent = create('input');
	            this.valueContent.disabled = true;
	            this._value = this.valueContent.value = this.changebarContent.value;
	            this.changebarContent.onmousemove = this.changebarContent.onclick = function () {
	                if (_this3._value !== _this3.changebarContent.value) {
	                    _this3._value = _this3.valueContent.value;
	                    _this3.valueContent.value = _this3.changebarContent.value;
	                    _this3.onchange(_this3.options.name, _this3.changebarContent.value);
	                }
	            };
	        }
	    }, {
	        key: 'setButtonContents',
	        value: function setButtonContents() {
	            var _this4 = this;

	            this.changebarContent = create('button');
	            this.changebarContent.innerHTML = 'Do it!';
	            this.changebarContent.onclick = function (e) {
	                _this4.onchange(_this4.options.name, e);
	            };
	        }
	    }, {
	        key: 'setSelectContents',
	        value: function setSelectContents() {
	            var _this5 = this;

	            this.changebarContent = create('select');
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this.options.options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var option = _step.value;

	                    var el = create('option');
	                    el.value = option.value;
	                    el.innerHTML = option.label;
	                    this.changebarContent.appendChild(el);
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            this.changebarContent.value = this.options.value;
	            this.changebarContent.onchange = function () {
	                _this5.onchange(_this5.options.name, _this5.changebarContent.value);
	            };
	        }
	    }, {
	        key: 'setReadonlyContents',
	        value: function setReadonlyContents() {
	            this.setTextContents(true);
	        }
	    }]);

	    return Property;
	}();

	exports.default = Property;

/***/ }
/******/ ]);