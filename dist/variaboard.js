(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.VariaBoard = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Create a button
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Button = function () {
  function Button(variaboard, config) {
    _classCallCheck(this, Button);

    this.variaboard = variaboard;
    this.id = config.id;
    this.title = config.title;
    this.description = config.description;
    this.callback = config.callback !== undefined ? config.callback : function () {};

    this.createDOM();
    this.listen();
  }

  /**
   * Create necessary DOM elements
   */

  _createClass(Button, [{
    key: 'createDOM',
    value: function createDOM() {
      this.dom = {};

      // control
      this.dom.control = document.createElement('div');
      this.dom.control.classList.add(this.variaboard.namespace + '-control');

      // button
      this.dom.button = document.createElement('button');
      this.dom.button.classList.add(this.variaboard.namespace + '-button');
      this.dom.button.textContent = this.title;
      this.dom.control.setAttribute('title', this.title + ': ' + this.description);
      this.dom.control.appendChild(this.dom.button);

      // add to control to panel
      this.variaboard.dom.controls.appendChild(this.dom.control);
    }

    /**
     * Setup event listeners
     */

  }, {
    key: 'listen',
    value: function listen() {
      var _this = this;

      this.dom.button.addEventListener('click', function (e) {
        return _this.onButtonClick(e);
      });
    }

    /**
     * On button click event
     *
     * @param {object} e - Event object
     */

  }, {
    key: 'onButtonClick',
    value: function onButtonClick() {
      this.callback();
    }
  }]);

  return Button;
}();

module.exports = Button;

},{}],2:[function(require,module,exports){
'use strict';

/**
 * Create a control
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Control = function () {
  function Control(variaboard, config) {
    _classCallCheck(this, Control);

    this.variaboard = variaboard;
    this.type = config.type;
    this.id = config.id;
    this.title = config.title;
    this.default = config.default;
    this.randomizable = config.randomizable !== undefined ? config.randomizable : true;
    this.mutable = config.mutable !== undefined ? config.mutable : true;
    this.locked = config.locked !== undefined ? config.locked : false;
    this.value = this.default;

    this.createDOM();
  }

  _createClass(Control, [{
    key: 'createDOM',
    value: function createDOM() {
      this.dom = {};

      // control
      this.dom.control = document.createElement('div');
      this.dom.control.classList.add(this.variaboard.namespace + '-control');

      // title
      this.dom.title = document.createElement('label');
      this.dom.title.classList.add(this.variaboard.namespace + '-control-title');
      this.dom.title.textContent = this.title;
      this.dom.title.setAttribute('for', this.variaboard.namespace + '-' + this.id + '-' + this.variaboard.id);
      this.dom.control.appendChild(this.dom.title);

      // value
      this.dom.value = document.createElement('input');
      this.dom.value.classList.add(this.variaboard.namespace + '-control-value');
      this.dom.value.setAttribute('id', this.variaboard.namespace + '-' + this.id + '-' + this.variaboard.id);
      this.dom.control.appendChild(this.dom.value);

      // add control to panel
      this.variaboard.dom.controls.appendChild(this.dom.control);
    }
  }, {
    key: 'get',
    value: function get() {
      return this.value;
    }
  }, {
    key: 'lock',
    value: function lock() {
      this.locked = true;
    }
  }, {
    key: 'unlock',
    value: function unlock() {
      this.locked = false;
    }
  }]);

  return Control;
}();

module.exports = Control;

},{}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Control = require('./control');
var Calc = require('../util/calc');

/**
 * Create a range control
 *
 * @param {object} variaboard - Reference to parent VariaBoard instance
 * @param {object} config - Configuration object
 * @param {string} config.id - Unique id/slug
 * @param {string} config.title - UI display title
 * @param {number} config.min - Minimum value
 * @param {number} config.max - Maximum value
 * @param {number} config.step - Step size
 * @param {number} config.default - Starting value
 * @param {boolean} config.randomizable - Can be randomized individually and by randomizing all
 * @param {boolean} config.mutable - Can be mutated individually and by mutating all
 * @param {boolean} config.locked - Temporarily toggle whether the control is affected by randomization and mutation
 *
 * @extends Control
 *
 * @requires {@link Control}
 * @requires {@link Calc}
 */

var Range = function (_Control) {
  _inherits(Range, _Control);

  function Range(variaboard, config) {
    _classCallCheck(this, Range);

    var _this = _possibleConstructorReturn(this, (Range.__proto__ || Object.getPrototypeOf(Range)).call(this, variaboard, config));

    _this.type = 'range';

    _this.min = config.min;
    _this.max = config.max;
    _this.step = config.step !== undefined ? Math.abs(config.step) : 1;
    _this.places = _this.step.toString().indexOf('.') > -1 ? _this.step.toString().split('.')[1].length : 0;
    _this.valueTarget = _this.value;

    _this.isMouseDown = false;
    _this.settled = false;
    _this.isFocused = false;

    _this.onWindowResize();

    _this.listen();
    _this.set(_this.value);
    return _this;
  }

  _createClass(Range, [{
    key: 'createDOM',
    value: function createDOM() {
      _get(Range.prototype.__proto__ || Object.getPrototypeOf(Range.prototype), 'createDOM', this).call(this);

      // randomize
      this.dom.randomize = document.createElement('div');
      this.dom.randomize.classList.add(this.variaboard.namespace + '-control-randomize');
      this.dom.randomize.setAttribute('title', 'Randomize');
      this.dom.randomize.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" class="' + this.variaboard.namespace + '-control-randomize-svg"><path d="M2 7h-2v-2h2c3.49 0 5.48 1.221 6.822 2.854-.41.654-.754 1.312-1.055 1.939-1.087-1.643-2.633-2.793-5.767-2.793zm16 10c-3.084 0-4.604-1.147-5.679-2.786-.302.627-.647 1.284-1.06 1.937 1.327 1.629 3.291 2.849 6.739 2.849v3l6-4-6-4v3zm0-10v3l6-4-6-4v3c-5.834 0-7.436 3.482-8.85 6.556-1.343 2.921-2.504 5.444-7.15 5.444h-2v2h2c5.928 0 7.543-3.511 8.968-6.609 1.331-2.893 2.479-5.391 7.032-5.391z"/></svg>';
      this.dom.control.appendChild(this.dom.randomize);

      // mutate
      this.dom.mutate = document.createElement('div');
      this.dom.mutate.classList.add(this.variaboard.namespace + '-control-mutate');
      this.dom.randomize.setAttribute('title', 'Mutate');
      this.dom.mutate.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" class="' + this.variaboard.namespace + '-control-mutate-svg"><path d="M20.759 20.498c-2.342-3.663-5.575-6.958-5.743-11.498h-2.016c.173 5.212 3.512 8.539 5.953 12.356.143.302-.068.644-.377.644h-1.264l-4.734-7h-3.52c.873-1.665 1.85-3.414 1.936-6h-2.01c-.169 4.543-3.421 7.864-5.743 11.498-.165.347-.241.707-.241 1.057 0 1.283 1.023 2.445 2.423 2.445h13.153c1.4 0 2.424-1.162 2.424-2.446 0-.35-.076-.709-.241-1.056zm-4.759-15.498c0 1.105-.896 2-2 2s-2-.895-2-2 .896-2 2-2 2 .895 2 2zm-5-1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5.672-1.5 1.5-1.5 1.5.671 1.5 1.5zm0 3.5c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm3-6c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1z"/></svg>\n';
      this.dom.control.appendChild(this.dom.mutate);

      // range
      this.dom.range = document.createElement('div');
      this.dom.range.classList.add(this.variaboard.namespace + '-control-range');

      // range inner
      this.dom.rangeInner = document.createElement('div');
      this.dom.rangeInner.classList.add(this.variaboard.namespace + '-control-range-inner');
      this.dom.range.appendChild(this.dom.rangeInner);

      this.dom.control.appendChild(this.dom.range);
    }
  }, {
    key: 'listen',
    value: function listen() {
      var _this2 = this;

      this.dom.value.addEventListener('change', function (e) {
        return _this2.onValueChange(e);
      });
      this.dom.value.addEventListener('focus', function (e) {
        return _this2.onValueFocus(e);
      });
      this.dom.value.addEventListener('blur', function (e) {
        return _this2.onValueBlur(e);
      });
      this.dom.value.addEventListener('keydown', function (e) {
        return _this2.onValueKeydown(e);
      });
      this.dom.value.addEventListener('wheel', function (e) {
        return _this2.onValueMousewheel(e);
      });

      this.dom.range.addEventListener('mousedown', function (e) {
        return _this2.onRangeMousedown(e);
      });

      this.dom.randomize.addEventListener('click', function (e) {
        return _this2.onRandomizeClick(e);
      });
      this.dom.mutate.addEventListener('click', function (e) {
        return _this2.onMutateClick(e);
      });
    }
  }, {
    key: 'onValueChange',
    value: function onValueChange() {
      this.set(this.dom.value.value);
      this.valueTarget = this.value;
    }
  }, {
    key: 'onValueFocus',
    value: function onValueFocus() {
      this.isFocused = true;
    }
  }, {
    key: 'onValueBlur',
    value: function onValueBlur() {
      this.isFocused = false;
    }
  }, {
    key: 'onValueKeydown',
    value: function onValueKeydown(e) {
      var change = e.shiftKey ? this.step * 10 : this.step;
      switch (e.which) {
        case 38:
          this.set(this.get() + change);
          break;
        case 40:
          this.set(this.get() - change);
          break;
      }
    }
  }, {
    key: 'onValueMousewheel',
    value: function onValueMousewheel(e) {
      if (this.isFocused) {
        var change = this.step;
        if (e.deltaY < 0) {
          this.set(this.get() + change);
        } else if (e.deltaY > 0) {
          this.set(this.get() - change);
        }
      }
    }
  }, {
    key: 'onRangeMousedown',
    value: function onRangeMousedown(e) {
      this.variaboard.onDragStart();
      this.variaboard.mouse.down = true;
      this.variaboard.mouse.anchor.x = e.clientX;
      this.variaboard.mouse.anchor.y = e.clientY;
      this.isMouseDown = true;
      this.setDragValue();
    }
  }, {
    key: 'onRandomizeClick',
    value: function onRandomizeClick() {
      this.randomize();
    }
  }, {
    key: 'onMutateClick',
    value: function onMutateClick() {
      this.mutate();
    }
  }, {
    key: 'onWindowMouseup',
    value: function onWindowMouseup() {
      this.variaboard.onDragEnd();
      this.isMouseDown = false;
    }
  }, {
    key: 'onWindowMousemove',
    value: function onWindowMousemove() {
      if (this.isMouseDown) {
        this.setDragValue();
      }
    }
  }, {
    key: 'onWindowResize',
    value: function onWindowResize() {
      this.bcr = this.dom.range.getBoundingClientRect();
    }
  }, {
    key: 'randomize',
    value: function randomize() {
      if (this.locked) {
        return;
      }

      this.settled = false;
      this.valueTarget = Calc.rand(this.min, this.max);

      cancelAnimationFrame(this.variaboard.raf);
      this.variaboard.update();
    }
  }, {
    key: 'mutate',
    value: function mutate() {
      if (this.locked) {
        return;
      }

      var size = (this.max - this.min) / 15;
      this.settled = false;
      this.valueTarget = this.get() + Calc.rand(-size, size);

      cancelAnimationFrame(this.variaboard.raf);
      this.variaboard.update();
    }
  }, {
    key: 'setDragValue',
    value: function setDragValue() {
      this.set(Calc.map(this.variaboard.mouse.x, this.bcr.left, this.bcr.right, this.min, this.max));
      this.valueTarget = this.value;
    }
  }, {
    key: 'easeSet',
    value: function easeSet() {
      if (Math.abs(this.value - this.valueTarget) > this.step / 2) {
        this.value += (this.valueTarget - this.value) * 0.2;
        this.set(this.value, true);
      } else {
        this.settled = true;
        this.value = this.valueTarget;
        this.set(this.value);
      }
    }
  }, {
    key: 'set',
    value: function set(val, bypassRounding) {
      // sanitize value
      val = parseFloat(val);
      val = isNaN(val) ? this.default : val;
      val = Calc.clamp(val, this.min, this.max);
      val = bypassRounding ? val : Calc.roundToNearestInterval(val, this.step);
      this.value = val;

      // set input value
      this.dom.value.value = this.value.toFixed(this.places);

      // set range value
      this.dom.rangeInner.style.transform = 'scaleX(' + Calc.map(this.value, this.min, this.max, 0, 1) + ')';

      // set the title attribute for the control
      this.dom.control.setAttribute('title', this.title + ': ' + this.value.toFixed(this.places));

      this.variaboard.changeCallback.call(this.variaboard);
    }
  }]);

  return Range;
}(Control);

module.exports = Range;

},{"../util/calc":5,"./control":2}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Button = require('./button');
var Range = require('./controls/range');

var VariaBoard = function () {

  /**
   * Create a VariaBoard control panel
   *
   * @param {object} config - Configuration object
   * @param {object|string} [config.container=document.body] - DOM element or CSS selector
   * @param {string} [config.title] - Title of the panel
   *
   * @requires {@link Button}
   * @requires {@link Range}
   */

  function VariaBoard(config) {
    _classCallCheck(this, VariaBoard);

    this.namespace = 'variaboard';
    this.id = Math.random().toString(36).substr(2, 8);
    this.controls = {};
    this.buttons = {};

    this.mouse = {
      down: false,
      x: 0,
      y: 0,
      anchor: {
        x: 0,
        y: 0
      }
    };

    this.needsUpdate = false;
    this.raf = null;
    this.isDragging = false;

    this.container = config.container !== undefined ? config.container : document.body;
    this.class = config.class !== undefined ? config.class : null;
    this.title = config.title !== undefined ? config.title : null;
    this.changeCallback = config.changeCallback !== undefined ? config.changeCallback : function () {};

    this.createDOM();
    this.listen();
  }

  /**
   * Create necessary DOM elements
   */

  _createClass(VariaBoard, [{
    key: 'createDOM',
    value: function createDOM() {
      this.dom = {};

      // container
      this.dom.container = this.container;

      // panel
      this.dom.panel = document.createElement('div');
      this.dom.panel.classList.add(this.namespace + '-panel');
      if (this.class) {
        this.dom.panel.classList.add(this.class);
      }

      // title
      if (this.title) {
        this.dom.title = document.createElement('h1');
        this.dom.title.classList.add(this.namespace + '-title');
        this.dom.title.textContent = this.title;
        this.dom.panel.appendChild(this.dom.title);
      }

      // controls
      this.dom.controls = document.createElement('div');
      this.dom.controls.classList.add(this.namespace + '-controls');
      this.dom.panel.appendChild(this.dom.controls);

      // add panel to container
      this.dom.container.appendChild(this.dom.panel);
    }

    /**
     * Setup event listeners
     */

  }, {
    key: 'listen',
    value: function listen() {
      var _this = this;

      window.addEventListener('mouseup', function (e) {
        return _this.onWindowMouseup(e);
      });
      window.addEventListener('mousemove', function (e) {
        return _this.onWindowMousemove(e);
      });
      window.addEventListener('resize', function () {
        return _this.onWindowResize();
      });
    }

    /**
     * On window mouse up event
     *
     * @param {object} e - Event object
     */

  }, {
    key: 'onWindowMouseup',
    value: function onWindowMouseup(e) {
      this.mouse.down = false;
      for (var key in this.controls) {
        var control = this.controls[key];
        control.onWindowMouseup(e);
      }
    }

    /**
     * On window mouse move event
     *
     * @param {object} e - Event object
     */

  }, {
    key: 'onWindowMousemove',
    value: function onWindowMousemove(e) {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      for (var key in this.controls) {
        var control = this.controls[key];
        if (control) {
          control.onWindowMousemove(e);
        }
      }
    }

    /**
     * On window resize event
     */

  }, {
    key: 'onWindowResize',
    value: function onWindowResize() {
      for (var key in this.controls) {
        var control = this.controls[key];
        if (control) {
          control.onWindowResize();
        }
      }
    }
  }, {
    key: 'onDragStart',
    value: function onDragStart() {
      this.isDragging = true;
      this.dom.panel.classList.add(this.namespace + '-is-dragging');
    }
  }, {
    key: 'onDragEnd',
    value: function onDragEnd() {
      this.isDragging = false;
      this.dom.panel.classList.remove(this.namespace + '-is-dragging');
    }

    /**
     * Update based on requestAnimationFrame()
     */

  }, {
    key: 'update',
    value: function update() {
      var _this2 = this;

      this.needsUpdate = false;
      for (var key in this.controls) {
        if (this.controls[key].type === 'range') {
          if (!this.controls[key].settled) {
            this.needsUpdate = true;
            this.controls[key].easeSet();
          }
        }
      }

      if (this.needsUpdate) {
        this.raf = requestAnimationFrame(function () {
          return _this2.update();
        });
      }
    }

    /**
     * Add a button
     *
     * @param {object} config - Configuration object
     * @param {object} config.id - ID slug
     * @param {object} config.title - Title text
     * @param {object} [config.callback=() => {}] - Callback function for button press
     *
     * @returns {object} Button object
     */

  }, {
    key: 'addButton',
    value: function addButton(config) {
      this.buttons[config.id] = new Button(this, config);
      return this;
    }

    /**
     * Add a range control via {@linkcode Range}
     *
     * @param {object} config - Configuration object
     * @param {string} config.id - Unique id/slug
     * @param {string} config.title - UI display title
     * @param {number} config.min - Minimum value
     * @param {number} config.max - Maximum value
     * @param {number} config.step - Step size
     * @param {number} config.default - Starting value
     * @param {boolean} config.randomizable - Can be randomized individually and by randomizing all
     * @param {boolean} config.mutable - Can be mutated individually and by mutating all
     * @param {boolean} config.locked - Temporarily toggle whether the control is affected by randomization and mutation
     *
     * @returns {object} Range object
     */

  }, {
    key: 'addRange',
    value: function addRange(config) {
      this.controls[config.id] = new Range(this, config);
      return this;
    }
  }, {
    key: 'get',
    value: function get(id) {
      var control = this.controls[id];
      if (control) {
        return control.get();
      }
    }
  }, {
    key: 'randomize',
    value: function randomize() {
      for (var key in this.controls) {
        this.controls[key].randomize();
      }
    }
  }, {
    key: 'mutate',
    value: function mutate() {
      for (var key in this.controls) {
        this.controls[key].mutate();
      }
    }
  }]);

  return VariaBoard;
}();

module.exports = VariaBoard;

},{"./button":1,"./controls/range":3}],5:[function(require,module,exports){
'use strict';

/**
 * Calculation functions and helpers
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Calc = function () {
  function Calc() {
    _classCallCheck(this, Calc);
  }

  _createClass(Calc, null, [{
    key: 'rand',


    /**
    * Get a random float within a range. If only one argument is passed, it is used as the max and the min becomes zero.
    *
    * @param {number} min - Minimum range value
    * @param {number} max - Maximum range value
    *
    * @example
    * // two arguments
    * Calc.rand(2, 18);
    * // -> random float between 2 and 18
    *
    * // single argument
    * Calc.rand(42.5);
    * // -> random float between 0 and 42.5
    *
    * @returns {number} Random float within the range
    */
    value: function rand(min, max) {
      if (max === undefined) {
        max = min;
        min = 0;
      }
      return Math.random() * (max - min) + min;
    }

    /**
    * Clamp a value to a range
    *
    * @param {number} val - Input value
    * @param {number} min - Minimum range value
    * @param {number} max - Maximum range value
    *
    * @example
    * Calc.clamp(3, 10, 150);
    * // -> 10
    *
    * Calc.clamp(400, 10, 150);
    * // -> 150
    *
    * Calc.clamp(75, 10, 100);
    * // -> 75
    *
    * @returns {number} Clamped value within range
    */

  }, {
    key: 'clamp',
    value: function clamp(val, min, max) {
      return Math.max(Math.min(val, max), min);
    }
  }, {
    key: 'map',
    value: function map(val, inMin, inMax, outMin, outMax) {
      return (outMax - outMin) * ((val - inMin) / (inMax - inMin)) + outMin;
    }
  }, {
    key: 'roundToNearestInterval',
    value: function roundToNearestInterval(value, interval) {
      return Math.round(value / interval) * interval;
    }
  }]);

  return Calc;
}();

module.exports = Calc;

},{}]},{},[4])(4)
});