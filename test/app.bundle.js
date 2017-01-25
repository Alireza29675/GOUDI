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

	window.goudi = new _index2.default();

	var App = function App() {
	    _classCallCheck(this, App);
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

	__webpack_require__(7);

	var _MindNode = __webpack_require__(2);

	var _MindNode2 = _interopRequireDefault(_MindNode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Goudi = function () {
	    function Goudi() {
	        var _this = this;

	        _classCallCheck(this, Goudi);

	        this.init();
	        var index = 0;
	        setInterval(function () {
	            _this.mindNodes[index].set({
	                x: Math.random() * window.innerWidth,
	                y: Math.random() * window.innerHeight,
	                size: Math.random() * 30 + 10
	            });
	            index++;
	        }, 50);
	    }

	    _createClass(Goudi, [{
	        key: 'init',
	        value: function init() {
	            this.mindNodes = [];
	            this.mindNodeShouldRenderMap = [];
	            this.addMindNodes();
	            this.render();
	        }
	    }, {
	        key: 'addMindNodes',
	        value: function addMindNodes() {
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = new Array(200)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var i = _step.value;
	                    this.addMindNode();
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
	        }
	    }, {
	        key: 'addMindNode',
	        value: function addMindNode() {
	            this.mindNodes.push(new _MindNode2.default(this, this.mindNodes.length));
	            this.mindNodeShouldRenderMap.push(false);
	        }
	    }, {
	        key: 'addToRenderer',
	        value: function addToRenderer(index) {
	            this.mindNodeShouldRenderMap[index] = true;
	        }
	    }, {
	        key: 'removeFromRenderer',
	        value: function removeFromRenderer(index) {
	            this.mindNodeShouldRenderMap[index] = false;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            requestAnimationFrame(this.render.bind(this));
	            for (var i = 0; i < this.mindNodes.length; i++) {
	                if (this.mindNodeShouldRenderMap[i]) this.mindNodes[i].render();
	            }
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

	var _cssToMatrix = __webpack_require__(9);

	var _cssToMatrix2 = _interopRequireDefault(_cssToMatrix);

	__webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MindNode = function () {
	    function MindNode(parent, i) {
	        _classCallCheck(this, MindNode);

	        this.parent = parent;
	        this.index = i;
	        this.moveRate = Math.floor(Math.random() * 10) + 10;
	        this.style = {
	            size: 0,
	            x: 0,
	            y: 0
	        };
	        this.wishStyle = this.style;
	        this.init();
	    }

	    _createClass(MindNode, [{
	        key: 'init',
	        value: function init() {
	            this.element = document.createElement('div');
	            this.REAL_ELEMENT_SIZE = 600;
	            this.element.style.width = this.element.style.height = this.REAL_ELEMENT_SIZE + 'px';
	            this.addClass('mind-node');
	            document.body.appendChild(this.element);
	            this.render();
	        }
	    }, {
	        key: 'addClass',
	        value: function addClass(name) {
	            this.element.classList.add(name);
	        }
	    }, {
	        key: 'removeClass',
	        value: function removeClass(name) {
	            this.element.classList.remove(name);
	        }
	    }, {
	        key: 'getMatrix',
	        value: function getMatrix() {
	            var _style = this.style,
	                size = _style.size,
	                x = _style.x,
	                y = _style.y;

	            return new _cssToMatrix2.default().translate3d(x - this.REAL_ELEMENT_SIZE / 2, y - this.REAL_ELEMENT_SIZE / 2, -1).scale(size / this.REAL_ELEMENT_SIZE, size / this.REAL_ELEMENT_SIZE).getMatrixCSS();
	        }
	    }, {
	        key: 'set',
	        value: function set(styleObject) {
	            this.wishStyle = {
	                size: styleObject.size || this.wishStyle.size,
	                x: styleObject.x || this.wishStyle.x,
	                y: styleObject.y || this.wishStyle.y
	            };
	            this.parent.addToRenderer(this.index);
	        }
	    }, {
	        key: 'fixTransformChanges',
	        value: function fixTransformChanges() {
	            var RATE = this.moveRate;
	            this.style = {
	                size: this.style.size + (this.wishStyle.size - this.style.size) / RATE,
	                x: this.style.x + (this.wishStyle.x - this.style.x) / RATE,
	                y: this.style.y + (this.wishStyle.y - this.style.y) / RATE
	            };
	            return this;
	        }
	    }, {
	        key: 'needRender',
	        value: function needRender() {
	            if (Math.abs(this.style.size - this.wishStyle.size) > 2) return true;
	            if (Math.abs(this.style.x - this.wishStyle.x) > 2) return true;
	            if (Math.abs(this.style.y - this.wishStyle.y) > 2) return true;
	            return false;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            this.fixTransformChanges();
	            this.element.style.transform = this.getMatrix();
	            if (!this.needRender()) this.parent.removeFromRenderer(this.index);
	        }
	    }]);

	    return MindNode;
	}();

	exports.default = MindNode;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./MindNode.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./MindNode.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, ".mind-node {\n    min-width: 50px;\n    min-height: 50px;\n    background: grey;\n    position: absolute;\n    border-radius: 50%;\n}", ""]);

	// exports


/***/ },
/* 5 */
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
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./Basics.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./Basics.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, "body {\n    overflow: hidden;\n    background: radial-gradient(#FFF, #CCC)\n}", ""]);

	// exports


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	(function(root, factory) {
	    if(true) {
	        module.exports = factory(__webpack_require__(10), __webpack_require__(11), __webpack_require__(12));
	    }
	    else if(typeof define === 'function' && define.amd) {
	        define('css-to-matrix', ['transform-to-matrix', 'matrix-utilities', 'umodel'], factory);
	    }
	    else {
	        root['css-to-matrix'] = factory(root['transform-to-matrix'], root['matrix-utilities'], root.umodel);
	    }
	}(this, function(transformToMatrix, matrixUtilities, umodel) {
	var _ = {

	  // convert strings like "55deg" or ".75rad" to floats (in radians)
	  rad: function (string) {

	    if (typeof string === 'string') {

	      var angle = parseFloat(string, 10),
	          isDegrees = string.indexOf('deg') > -1

	      // convert deg -> rad?
	      if (isDegrees) angle *= Math.PI / 180 

	      return angle

	    }
	    
	    return string

	  },

	  // shallow object extend
	  extend: function (a, b) {

	    for (var key in b) {
	      a[key] = b[key]
	    }
	    
	    return a

	  },

	  // make functions return `this`, for easy chaining
	  fluent: function (fn) {

	    return function() {
	      fn.apply(this, arguments)
	      return this
	    }

	  },

	  isNumber: function (a) {
	    return typeof a === 'number'
	  }

	};

	function CssToMatrix (data) {

	  // default options
	  this.model = new umodel({
	    matrix: new matrixUtilities.Identity(),
	    transformations: {
	      perspective: new matrixUtilities.Identity(),
	      rotate: new matrixUtilities.Identity(),
	      scale: new matrixUtilities.Identity(),
	      skew: new matrixUtilities.Identity(),
	      translate: new matrixUtilities.Identity()
	    }
	  })

	  // set data?
	  if (data) {
	    this.matrix(data)
	  }

	}

	_.extend(CssToMatrix.prototype, {

	  // set matrix in model
	  matrix: function (data) {

	////DEV
	    if (data.length == null)
	      throw new TypeError('expected parameter `data` to be an Array, but was given a ' + typeof data)

	    var rows = data.length,
	        columns = rows > 0 ? rows : 0

	    if (rows !== 4 || columns !== 4)
	      throw new Error('expected parameter `data` to be a 4x4 matrix of arrays, but was given a ' + rows + 'x' + columns + ' matrix')
	////END DEV

	    this.model.set('matrix', data)

	  },

	  // apply transformations as defined in the model, and get back get calculated matrix
	  getMatrix: function() {

	    var matrix = this.model.get('matrix'),
	        t = this.model.get('transformations')

	    // perspective
	    matrix = matrixUtilities.multiply(matrix, t.perspective)

	    // translate
	    matrix = matrixUtilities.multiply(matrix, t.translate)

	    // rotate
	    matrix = matrixUtilities.multiply(matrix, t.rotate)

	    // skew
	    matrix = matrixUtilities.multiply(matrix, t.skew)

	    // scale
	    matrix = matrixUtilities.multiply(matrix, t.scale)

	    return matrixUtilities.flip(matrix)

	  },

	  // get matrix formatted as a string that can be plugged right into CSS's `transform` function 
	  getMatrixCSS: function() {

	    return 'matrix3d('
	      + this
	        .getMatrix()
	        .reduce(function (flat, row) {
	          flat.push.apply(flat, row)
	          return flat
	        }, [])
	        .join(',')
	      + ')'

	  },

	  // transform functions
	  // 1-to-1 with their CSS equivalents
	  rotate: function (a) { return this.rotateZ(a) },
	  rotateX: function (a) { return this.rotate3d(1, 0, 0, a) },
	  rotateY: function (a) { return this.rotate3d(0, 1, 0, a) },
	  rotateZ: function (a) { return this.rotate3d(0, 0, 1, a) },
	  scale: function (x, y) { return this.scale3d(x, y) },
	  scaleX: function (x) { return this.scale3d(x) },
	  scaleY: function (y) { return this.scale3d(null, y) },
	  scaleZ: function (z) { return this.scale3d(null, null, z) },
	  skewX: function (x) { return this.skew(x) },
	  skewY: function (y) { return this.skew(null, y) },
	  translate: function (x, y) { return this.translate3d(x, y) },
	  translateX: function (x) { return this.translate3d(x) },
	  translateY: function (y) { return this.translate3d(null, y) },
	  translateZ: function (z) { return this.translate3d(null, null, z) },

	  perspective: _.fluent(function (x) {

	    if (x == null) { x = 0 }

	////DEV
	    if (!_.isNumber(x))
	      throw new TypeError('expected parameter `x` to be a Number, but was given a ' + typeof x)
	////END DEV

	    this.model.set('transformations/perspective', transformToMatrix.perspective(x))

	  }),

	  rotate3d: _.fluent(function (x, y, z, a) {

	    if (x == null) { x = 0 }
	    if (y == null) { y = 0 }
	    if (z == null) { z = 0 }
	    if (a == null) { a = 0 }

	////DEV
	    if (!_.isNumber(x))
	      throw new TypeError('expected parameter `x` to be a Number, but was given a ' + typeof x)
	    if (!_.isNumber(y))
	      throw new TypeError('expected parameter `y` to be a Number, but was given a ' + typeof y)
	    if (!_.isNumber(z))
	      throw new TypeError('expected parameter `z` to be a Number, but was given a ' + typeof z)
	////END DEV

	    // if angle was passed as a string, convert it to a float first
	    this.model.set('transformations/rotate', transformToMatrix.rotate3d(x, y, z, _.rad(a)))

	  }),

	  scale3d: _.fluent(function (x, y, z) {

	    if (x == null) { x = 1 }
	    if (y == null) { y = 1 }
	    if (z == null) { z = 1 }

	////DEV
	    if (!_.isNumber(x))
	      throw new TypeError('expected parameter `x` to be a Number, but was given a ' + typeof x)
	    if (!_.isNumber(y))
	      throw new TypeError('expected parameter `y` to be a Number, but was given a ' + typeof y)
	    if (!_.isNumber(z))
	      throw new TypeError('expected parameter `z` to be a Number, but was given a ' + typeof z)
	////END DEV

	    this.model.set('transformations/scale', transformToMatrix.scale3d(x, y, z))

	  }),

	  skew: _.fluent(function (x, y) {

	    if (x == null) { x = 0 }
	    if (y == null) { y = 0 }

	    this.model.set('transformations/skew', matrixUtilities.to3d(transformToMatrix.skew(_.rad(x), _.rad(y))))

	  }),

	  translate3d: _.fluent(function(x, y, z) {

	    if (x == null) { x = 0 }
	    if (y == null) { y = 0 }
	    if (z == null) { z = 0 }

	////DEV
	    if (!_.isNumber(x))
	      throw new TypeError('expected parameter `x` to be a Number, but was given a ' + typeof x)
	    if (!_.isNumber(y))
	      throw new TypeError('expected parameter `y` to be a Number, but was given a ' + typeof y)
	    if (!_.isNumber(z))
	      throw new TypeError('expected parameter `z` to be a Number, but was given a ' + typeof z)
	////END DEV

	    this.model.set('transformations/translate', transformToMatrix.translate3d(x, y, z))

	  })

	})
	    return CssToMatrix;
	}));

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	(function(root, factory) {
	    if(true) {
	        module.exports = factory();
	    }
	    else if(typeof define === 'function' && define.amd) {
	        define('transform-to-matrix', [], factory);
	    }
	    else {
	        root['transform-to-matrix'] = factory();
	    }
	}(this, function() {
	var transformtomatrix;

	transformtomatrix = (function() {
	  var fns;
	  return fns = {
	    perspective: function(d) {
	      return [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, -1 / d, 1]];
	    },
	    rotate: function(a) {
	      return fns.rotateZ(a);
	    },
	    rotateX: function(a) {
	      return fns.rotate3d(1, 0, 0, a);
	    },
	    rotateY: function(a) {
	      return fns.rotate3d(0, 1, 0, a);
	    },
	    rotateZ: function(a) {
	      var c, n;
	      c = Math.cos(a);
	      n = Math.sin(a);
	      return [[c, -n, 0], [n, c, 0]];
	    },
	    rotate3d: function(x, y, z, a) {
	      var c, i, n, rs, s;
	      s = x * x + y * y + z * z;
	      c = Math.cos(a);
	      n = Math.sin(a);
	      i = 1 - c;
	      rs = Math.sqrt(s) * n;
	      return [[(x * x + (y * y + z * z) * c) / s, (x * y * i - z * rs) / s, (x * z * i + y * rs) / s, 0], [(x * y * i + z * rs) / s, (y * y + (x * x + z * z) * c) / s, (y * z * i - x * rs) / s, 0], [(x * z * i - y * rs) / s, (y * z * i + x * rs) / s, (z * z + (x * x + y * y) * c) / s, 0], [0, 0, 0, 1]];
	    },
	    scale: function(x, y) {
	      return [[x, 0, 0], [0, y, 0]];
	    },
	    scaleX: function(x) {
	      return fns.scale(x, 1);
	    },
	    scaleY: function(y) {
	      return fns.scale(1, y);
	    },
	    scaleZ: function(z) {
	      return fns.scale3d(1, 1, z);
	    },
	    scale3d: function(x, y, z) {
	      return [[x, 0, 0, 0], [0, y, 0, 0], [0, 0, z, 0], [0, 0, 0, 1]];
	    },
	    skew: function(x, y) {
	      return [[1, Math.tan(x), 0], [Math.tan(y), 1, 0]];
	    },
	    skewX: function(x) {
	      return [[1, Math.tan(x), 0], [0, 1, 0]];
	    },
	    skewY: function(y) {
	      return [[1, 0, 0], [Math.tan(y), 1, 0]];
	    },
	    translate: function(x, y) {
	      return [[1, 0, x], [0, 1, y]];
	    },
	    translateX: function(x) {
	      return fns.translate(x, 0);
	    },
	    translateY: function(y) {
	      return fns.translate(0, y);
	    },
	    translateZ: function(z) {
	      return fns.translate3d(0, 0, z);
	    },
	    translate3d: function(x, y, z) {
	      return [[1, 0, 0, x], [0, 1, 0, y], [0, 0, 1, z], [0, 0, 0, 1]];
	    }
	  };
	})();

	    return transformtomatrix;
	}));

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	(function(root, factory) {
	    if(true) {
	        module.exports = factory();
	    }
	    else if(typeof define === 'function' && define.amd) {
	        define('matrix-utilities', [], factory);
	    }
	    else {
	        root['matrix-utilities'] = factory();
	    }
	}(this, function() {
	var matrixutilities;

	matrixutilities = (function() {
	  var util;
	  return util = {
	    add: function(one, two) {
	      var i, j, result, row, value, _i, _j, _len, _len1;
	      if (one.length !== two.length) {
	        throw new Error('Matrix y dimensions do not match');
	      }
	      result = [];
	      for (i = _i = 0, _len = one.length; _i < _len; i = ++_i) {
	        row = one[i];
	        if (row.length !== two[i].length) {
	          throw new Error("Matrix x dimensions do not match on row " + (i + 1));
	        }
	        result[i] = [];
	        for (j = _j = 0, _len1 = row.length; _j < _len1; j = ++_j) {
	          value = row[j];
	          result[i][j] = value + two[i][j];
	        }
	      }
	      return result;
	    },
	    multiply: function(one, two) {
	      var j, k, l, result, row, size, sum, value, _i, _j, _len, _len1;
	      if (one[0].length !== two.length) {
	        throw new Error('Matrix 1\'s row count should equal matrix 2\'s column count');
	      }
	      size = one[0].length;
	      result = [];
	      for (j = _i = 0, _len = two.length; _i < _len; j = ++_i) {
	        row = two[j];
	        result[j] = [];
	        for (k = _j = 0, _len1 = row.length; _j < _len1; k = ++_j) {
	          value = row[k];
	          l = size;
	          sum = 0;
	          while (l--) {
	            sum += one[j][l] * two[l][k];
	          }
	          result[j][k] = sum;
	        }
	      }
	      return result;
	    },
	    flip: function(matrix) {
	      var j, k, result, row, value, _i, _j, _len, _len1;
	      result = [];
	      for (j = _i = 0, _len = matrix.length; _i < _len; j = ++_i) {
	        row = matrix[j];
	        for (k = _j = 0, _len1 = row.length; _j < _len1; k = ++_j) {
	          value = row[k];
	          (result[k] || (result[k] = []))[j] = value;
	        }
	      }
	      return result;
	    },
	    to2d: function(matrix) {
	      return [[matrix[0][0] || 1, matrix[0][1] || 0, matrix[0][3] || 0], [matrix[1][0] || 0, matrix[1][1] || 1, matrix[1][3] || 0]];
	    },
	    to3d: function(matrix) {
	      return [[matrix[0][0] || 1, matrix[0][1] || 0, 0, matrix[0][2] || 0], [matrix[1][0] || 0, matrix[1][1] || 1, 0, matrix[1][2] || 0], [0, 0, 1, 0], [0, 0, 0, 1]];
	    },
	    Identity: function() {
	      return [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
	    }
	  };
	})();

	    return matrixutilities;
	}));

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	(function(root, factory) {
	    if(true) {
	        module.exports = factory();
	    }
	    else if(typeof define === 'function' && define.amd) {
	        define('umodel', [], factory);
	    }
	    else {
	        root.umodel = factory();
	    }
	}(this, function() {
	var umodel, _,
	  __hasProp = {}.hasOwnProperty;

	_ = {
	  extend: function(a, b) {
	    var key;
	    for (key in b) {
	      if (!__hasProp.call(b, key)) continue;
	      a[key] = b[key];
	    }
	    return a;
	  },
	  trim: (function() {
	    var head, tail;
	    if (''.trim) {
	      return function(string) {
	        return string.trim();
	      };
	    } else {
	      head = /^\s\s*/;
	      tail = /\s\s*$/;
	      return function(string) {
	        return string.replace(head, '').replace(tail, '');
	      };
	    }
	  })()
	};

	umodel = (function() {
	  function umodel(_data, options) {
	    this._data = _data != null ? _data : {};
	    this.options = {
	      separator: '/'
	    };
	    if (options) {
	      _.extend(this.options, options);
	    }
	    this.events = {};
	  }

	  umodel.prototype.get = function(key) {
	    this.trigger('get', key);
	    return this._get(this._split(key), this._data);
	  };

	  umodel.prototype.set = function(key, value) {
	    var old;
	    old = this._get(this._split(key), this._data);
	    this._set(this._split(key), value, false, this._data);
	    return this.trigger('set', key, value, old);
	  };

	  umodel.prototype.setnx = function(key, value) {
	    var old;
	    old = this._get(this._split(key), this._data);
	    this._set(this._split(key), value, true, this._data);
	    return this.trigger('setnx', key, value, old);
	  };

	  umodel.prototype.on = function(eventAndProperty, fn) {
	    var e, _results;
	    if (fn) {
	      return this._on(eventAndProperty, fn);
	    } else {
	      _results = [];
	      for (e in eventAndProperty) {
	        fn = eventAndProperty[e];
	        _results.push(this._on(e, fn));
	      }
	      return _results;
	    }
	  };

	  umodel.prototype.trigger = function(event, path, value, oldValue) {
	    var e, fn, fns, _ref, _results;
	    if (path == null) {
	      path = '*';
	    }
	    path = this._normalize(path);
	    if (event in this.events) {
	      _ref = this.events[event];
	      _results = [];
	      for (e in _ref) {
	        fns = _ref[e];
	        if (e === '*' || (path + '/').indexOf(e + '/') === 0) {
	          _results.push((function() {
	            var _i, _len, _results1;
	            _results1 = [];
	            for (_i = 0, _len = fns.length; _i < _len; _i++) {
	              fn = fns[_i];
	              if (oldValue != null) {
	                _results1.push(fn.call(this, path, value, oldValue));
	              } else {
	                _results1.push(fn.call(this, path, value));
	              }
	            }
	            return _results1;
	          }).call(this));
	        } else {
	          _results.push(void 0);
	        }
	      }
	      return _results;
	    }
	  };

	  umodel.prototype._get = function(key, parent, accumulator) {
	    var head;
	    if (accumulator == null) {
	      accumulator = [];
	    }
	    head = key.shift();
	    if (head) {
	      if (!(head in parent)) {
	        return void 0;
	      }
	      accumulator.push(head);
	      return this._get(key, parent[head], accumulator);
	    }
	    return parent;
	  };

	  umodel.prototype._set = function(key, value, nx, parent, accumulator) {
	    var head;
	    if (nx == null) {
	      nx = false;
	    }
	    if (accumulator == null) {
	      accumulator = [];
	    }
	    head = key.shift();
	    if (key.length) {
	      if (!(head in parent)) {
	        parent[head] = {};
	      }
	      accumulator.push(head);
	      return this._set(key, value, nx, parent[head], accumulator);
	    }
	    if (!(nx && head in parent)) {
	      return parent[head] = value;
	    }
	  };

	  umodel.prototype._on = function(eventAndProperty, fn) {
	    var event, events, parts, property, _i, _len, _results;
	    parts = eventAndProperty.split(':');
	    events = parts[0].split(' ');
	    property = this._normalize(parts[1] || '*');
	    _results = [];
	    for (_i = 0, _len = events.length; _i < _len; _i++) {
	      event = events[_i];
	      event = _.trim(event);
	      if (!(event in this.events)) {
	        this.events[event] = {};
	      }
	      if (!(property in this.events[event])) {
	        this.events[event][property] = [];
	      }
	      _results.push(this.events[event][property].push(fn));
	    }
	    return _results;
	  };

	  umodel.prototype._normalize = function(key) {
	    var separator;
	    separator = this.options.separator;
	    key = _.trim(key);
	    if (key.charAt(0) === separator) {
	      key = key.slice(1);
	    }
	    if (key.charAt(key.length - 1) === separator) {
	      key = key.slice(0, -1);
	    }
	    return key;
	  };

	  umodel.prototype._split = function(key) {
	    return (this._normalize(key)).split(this.options.separator);
	  };

	  return umodel;

	})();

	    return umodel;
	}));


/***/ }
/******/ ]);