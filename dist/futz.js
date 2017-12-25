(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Futz = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FutzButton = function () {

  /**
   * Create a Futz button
   */

  function FutzButton(futz, config) {
    _classCallCheck(this, FutzButton);

    this.futz = futz;
    this.id = config.id;
    this.title = config.title;
    this.callback = config.callback;

    this.createDOM();
    this.listen();
  }

  /**
   * Create necessary DOM elements
   */

  _createClass(FutzButton, [{
    key: 'createDOM',
    value: function createDOM() {
      this.dom = {};

      // control
      this.dom.control = document.createElement('div');
      this.dom.control.classList.add(this.futz.namespace + '-control');

      // button
      this.dom.button = document.createElement('button');
      this.dom.button.classList.add(this.futz.namespace + '-control-button');
      this.dom.button.textContent = this.title;
      this.dom.control.appendChild(this.dom.button);

      // add control to panel
      this.futz.dom.controls.appendChild(this.dom.control);
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
    value: function onButtonClick(e) {
      this.callback();
    }
  }]);

  return FutzButton;
}();

module.exports = FutzButton;

},{}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Create a Futz control
 */

var FutzControl = function () {
  function FutzControl(futz, config) {
    _classCallCheck(this, FutzControl);

    this.futz = futz;
    this.type = config.type;
    this.id = config.id;
    this.title = config.title;
    this.default = config.default;
    this.randomizable = config.randomizable !== undefined ? config.locked : true;
    this.mutable = config.mutable !== undefined ? config.mutable : true;
    this.locked = config.locked !== undefined ? config.locked : false;
    this.value = this.default;

    this.createDOM();
  }

  _createClass(FutzControl, [{
    key: 'createDOM',
    value: function createDOM() {
      this.dom = {};

      // control
      this.dom.control = document.createElement('div');
      this.dom.control.classList.add(this.futz.namespace + '-control');

      // title
      this.dom.title = document.createElement('h3');
      this.dom.title.classList.add(this.futz.namespace + '-control-title');
      this.dom.title.textContent = this.title;
      this.dom.control.appendChild(this.dom.title);

      // value
      this.dom.value = document.createElement('input');
      this.dom.value.classList.add(this.futz.namespace + '-control-value');
      this.dom.control.appendChild(this.dom.value);

      // add control to panel
      this.futz.dom.controls.appendChild(this.dom.control);
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

  return FutzControl;
}();

module.exports = FutzControl;

},{}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FutzControl = require('./futz-control');

/**
 * Create a Futz range control
 *
 * @extends FutzControl
 */

var FutzRangeControl = function (_FutzControl) {
  _inherits(FutzRangeControl, _FutzControl);

  function FutzRangeControl(futz, config) {
    _classCallCheck(this, FutzRangeControl);

    var _this = _possibleConstructorReturn(this, (FutzRangeControl.__proto__ || Object.getPrototypeOf(FutzRangeControl)).call(this, futz, config));

    _this.min = config.min;
    _this.max = config.max;
    _this.step = config.step !== undefined ? Math.abs(config.step) : 1;
    _this.places = _this.step.toString().indexOf('.') > -1 ? _this.step.toString().split('.')[1].length : 0;
    _this.valueTarget = _this.value;

    _this.mouseIsDown = false;
    _this.settled = false;

    _this.listen();

    _this.set(_this.value);
    return _this;
  }

  _createClass(FutzRangeControl, [{
    key: 'createDOM',
    value: function createDOM() {
      _get(FutzRangeControl.prototype.__proto__ || Object.getPrototypeOf(FutzRangeControl.prototype), 'createDOM', this).call(this);

      // range
      this.dom.range = document.createElement('div');
      this.dom.range.classList.add(this.futz.namespace + '-control-range');

      // range inner
      this.dom.rangeInner = document.createElement('div');
      this.dom.rangeInner.classList.add(this.futz.namespace + '-control-range-inner');
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
      this.dom.range.addEventListener('mousedown', function (e) {
        return _this2.onValueMousedown(e);
      });
    }
  }, {
    key: 'onValueChange',
    value: function onValueChange(e) {
      this.set(this.dom.value.value);
      this.valueTarget = this.value;
    }
  }, {
    key: 'onValueMousedown',
    value: function onValueMousedown(e) {
      this.futz.mouse.down = true;
      this.futz.mouse.anchor.x = e.clientX;
      this.futz.mouse.anchor.y = e.clientY;
      this.mouseIsDown = true;
      this.setDragValue();
    }
  }, {
    key: 'onWindowMouseup',
    value: function onWindowMouseup(e) {
      this.mouseIsDown = false;
    }
  }, {
    key: 'onWindowMousemove',
    value: function onWindowMousemove(e) {
      if (this.mouseIsDown) {
        this.setDragValue();
      }
    }
  }, {
    key: 'setDragValue',
    value: function setDragValue() {
      var left = this.dom.range.offsetLeft;
      var width = this.dom.range.offsetWidth;
      var val = this.futz.map(this.futz.mouse.x, left, left + width, this.min, this.max);
      this.set(val);
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
      val = this.futz.clamp(val, this.min, this.max);
      val = bypassRounding ? val : this.futz.roundToNearestInterval(val, this.step);
      this.value = val;

      // set input value
      this.dom.value.value = this.value.toFixed(this.places);

      // set range value
      this.dom.rangeInner.style.transform = 'scaleX(' + this.futz.map(this.value, this.min, this.max, 0, 1) + ')';

      // set the title attribute for the control
      this.dom.control.setAttribute('title', this.title + ': ' + this.value.toFixed(this.places));
    }
  }]);

  return FutzRangeControl;
}(FutzControl);

module.exports = FutzRangeControl;

},{"./futz-control":2}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FutzButton = require('./futz-button');
var FutzRangeControl = require('./futz-range-control');

var Futz = function () {

  /**
   * Create a Futz control panel
   *
   * @param {object} config - Configuration object
   * @param {object|string} [config.container=document.body] - DOM element or CSS selector
   * @param {string} [config.title="Control Panel"] - Title of the panel
   *
   * @requires {@linkcode FutzButton}
   * @requires {@linkcode FutzRangeControl}
   */

  function Futz(config) {
    _classCallCheck(this, Futz);

    this.namespace = 'futz';
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

    this.container = config.container !== undefined ? config.container : document.body;
    this.title = config.title !== undefined ? config.title : 'Futz';

    this.createDOM();
    this.listen();
  }

  /**
   * Create necessary DOM elements
   */

  _createClass(Futz, [{
    key: 'createDOM',
    value: function createDOM() {
      this.dom = {};

      // container
      this.dom.container = this.container;

      // panel
      this.dom.panel = document.createElement('div');
      this.dom.panel.classList.add(this.namespace + '-panel');

      // title
      this.dom.title = document.createElement('h1');
      this.dom.title.classList.add(this.namespace + '-title');
      this.dom.title.textContent = this.title;
      this.dom.panel.appendChild(this.dom.title);

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
        control.onWindowMousemove(e);
      }
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
          this.controls[key].easeSet();
          if (!this.controls[key].settled) {
            this.needsUpdate = true;
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
     */

  }, {
    key: 'addButton',
    value: function addButton(config) {
      for (var key in this.buttons) {
        if (config.id === this.buttons[key].id) {
          console.error('Futz: A button with an id of \'' + config.id + '\' is already in use.');
          return;
        }
      }
      this.buttons[config.id] = new FutzButton(this, config);
    }
  }, {
    key: 'addControl',
    value: function addControl(config) {
      var control = null;

      for (var key in this.controls) {
        if (config.id === this.controls[key].id) {
          console.error('Futz: A control with an id of \'' + config.id + '\' is already in use.');
          return;
        }
      }

      switch (config.type) {
        case 'range':
          control = new FutzRangeControl(this, config);
          break;
      }

      if (control) {
        this.controls[control.id] = control;
      }
    }
  }, {
    key: 'get',
    value: function get(id) {
      return this.controls[id].value;
    }
  }, {
    key: 'randomize',
    value: function randomize() {
      for (var key in this.controls) {
        var control = this.controls[key];
        control.settled = false;
        control.valueTarget = this.rand(control.min, control.max);
        cancelAnimationFrame(this.raf);
        this.update();
      }
    }
  }, {
    key: 'mutate',
    value: function mutate() {
      for (var key in this.controls) {
        var control = this.controls[key];
        var size = (control.max - control.min) / 15;
        control.settled = false;
        if (control.value <= control.min) {
          control.valueTarget = this.rand(control.step, control.min + size);
        } else if (control.value >= control.max) {
          control.valueTarget = this.rand(control.max - size, control.max - control.step);
        } else {
          control.valueTarget = control.value + this.rand(-size, size);
        }
        cancelAnimationFrame(this.raf);
        this.update();
      }
    }
  }, {
    key: 'rand',
    value: function rand(min, max, ease) {
      if (max === undefined) {
        max = min;
        min = 0;
      }
      var random = Math.random();
      return random * (max - min) + min;
    }
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

  return Futz;
}();

module.exports = Futz;

},{"./futz-button":1,"./futz-range-control":3}]},{},[4])(4)
});

//# sourceMappingURL=sourcemaps/futz.js.map
