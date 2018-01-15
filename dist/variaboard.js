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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Control = require('./control');
var Calc = require('../util/calc');

var BooleanControl = function (_Control) {
  _inherits(BooleanControl, _Control);

  function BooleanControl(variaboard, config) {
    _classCallCheck(this, BooleanControl);

    var _this = _possibleConstructorReturn(this, (BooleanControl.__proto__ || Object.getPrototypeOf(BooleanControl)).call(this));

    _this.type = 'boolean';
    _this.variaboard = variaboard;
    _this.id = config.id;
    _this.title = config.title;
    _this.default = config.default;
    _this.randomizable = config.randomizable !== undefined ? config.randomizable : true;
    _this.mutable = config.mutable !== undefined ? config.mutable : true;
    _this.locked = config.locked !== undefined ? config.locked : false;
    _this.suffix = config.suffix !== undefined ? config.suffix : '';
    _this.isFocused = false;
    _this.createDOM();
    _this.listen();
    _this.set(_this.default, true, false);

    return _this;
  }

  _createClass(BooleanControl, [{
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

      // checkbox wrap
      this.dom.checkboxWrap = document.createElement('div');
      this.dom.checkboxWrap.classList.add(this.variaboard.namespace + '-control-checkbox-wrap');
      this.dom.control.appendChild(this.dom.checkboxWrap);

      // checkbox
      this.dom.checkbox = document.createElement('input');
      this.dom.checkbox.classList.add(this.variaboard.namespace + '-control-checkbox');
      this.dom.checkbox.setAttribute('type', 'checkbox');
      this.dom.checkbox.setAttribute('id', this.variaboard.namespace + '-' + this.id + '-' + this.variaboard.id);
      this.dom.checkboxWrap.appendChild(this.dom.checkbox);

      // add control to panel
      this.variaboard.dom.controls.appendChild(this.dom.control);

      // suffix
      this.dom.suffix = document.createElement('div');
      this.dom.suffix.classList.add(this.variaboard.namespace + '-control-suffix');
      this.dom.suffix.textContent = this.suffix;
      this.dom.control.appendChild(this.dom.suffix);

      // randomize
      this.dom.randomize = document.createElement('div');
      this.dom.randomize.classList.add(this.variaboard.namespace + '-control-randomize');
      this.dom.randomize.setAttribute('title', 'Randomize');
      this.dom.randomize.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" class="' + this.variaboard.namespace + '-control-randomize-svg"><path d="M2 7h-2v-2h2c3.49 0 5.48 1.221 6.822 2.854-.41.654-.754 1.312-1.055 1.939-1.087-1.643-2.633-2.793-5.767-2.793zm16 10c-3.084 0-4.604-1.147-5.679-2.786-.302.627-.647 1.284-1.06 1.937 1.327 1.629 3.291 2.849 6.739 2.849v3l6-4-6-4v3zm0-10v3l6-4-6-4v3c-5.834 0-7.436 3.482-8.85 6.556-1.343 2.921-2.504 5.444-7.15 5.444h-2v2h2c5.928 0 7.543-3.511 8.968-6.609 1.331-2.893 2.479-5.391 7.032-5.391z"/></svg>';
      this.dom.control.appendChild(this.dom.randomize);

      // mutate
      this.dom.mutate = document.createElement('div');
      this.dom.mutate.classList.add(this.variaboard.namespace + '-control-mutate');
      this.dom.mutate.setAttribute('title', 'Mutate');
      this.dom.mutate.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" class="' + this.variaboard.namespace + '-control-mutate-svg"><path d="M20.759 20.498c-2.342-3.663-5.575-6.958-5.743-11.498h-2.016c.173 5.212 3.512 8.539 5.953 12.356.143.302-.068.644-.377.644h-1.264l-4.734-7h-3.52c.873-1.665 1.85-3.414 1.936-6h-2.01c-.169 4.543-3.421 7.864-5.743 11.498-.165.347-.241.707-.241 1.057 0 1.283 1.023 2.445 2.423 2.445h13.153c1.4 0 2.424-1.162 2.424-2.446 0-.35-.076-.709-.241-1.056zm-4.759-15.498c0 1.105-.896 2-2 2s-2-.895-2-2 .896-2 2-2 2 .895 2 2zm-5-1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5.672-1.5 1.5-1.5 1.5.671 1.5 1.5zm0 3.5c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm3-6c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1z"/></svg>\n';
      this.dom.control.appendChild(this.dom.mutate);
    }
  }, {
    key: 'listen',
    value: function listen() {
      var _this2 = this;

      this.dom.checkbox.addEventListener('change', function (e) {
        return _this2.onCheckboxChange(e);
      });
      // this.dom.value.addEventListener('focus', (e) => this.onValueFocus(e));
      // this.dom.value.addEventListener('blur', (e) => this.onValueBlur(e));
      this.dom.randomize.addEventListener('click', function (e) {
        return _this2.onRandomizeClick(e);
      });
      this.dom.mutate.addEventListener('click', function (e) {
        return _this2.onMutateClick(e);
      });
    }
  }, {
    key: 'onCheckboxChange',
    value: function onCheckboxChange() {
      this.set(this.dom.checkbox.checked);
    }

    // onValueFocus() {
    //   this.isFocused = true;
    // }

    // onValueBlur() {
    //   this.isFocused = false;
    // }

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
    key: 'randomize',
    value: function randomize() {
      if (this.locked) {
        return;
      }

      var val = Math.random() > 0.5 ? true : false;
      this.set(val);

      this.dom.control.classList.add(this.variaboard.namespace + '-control-randomizing');
      void this.dom.control.offsetWidth;
      this.dom.control.classList.remove(this.variaboard.namespace + '-control-randomizing');
    }
  }, {
    key: 'mutate',
    value: function mutate() {
      if (this.locked) {
        return;
      }

      var val = Math.random() > 0.5 ? true : false;
      this.set(val);

      this.dom.control.classList.add(this.variaboard.namespace + '-control-mutating');
      void this.dom.control.offsetWidth;
      this.dom.control.classList.remove(this.variaboard.namespace + '-control-mutating');
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
  }, {
    key: 'set',
    value: function set(val) {
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var triggerChange = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      // exit out if the value hasn't changed and it is not forced
      if (val === this.value && !force) {
        return;
      }

      // set the new value
      this.value = val;

      // set checkbox value
      this.dom.checkbox.checked = this.value;

      // set the title attribute for the control
      this.dom.control.setAttribute('title', this.title + ': ' + this.value);

      // queue up change callback
      if (triggerChange) {
        window.cancelAnimationFrame(this.variaboard.changeRaf);
        this.variaboard.changeRaf = window.requestAnimationFrame(this.variaboard.changeCallback.bind(this.variaboard));
      }
    }
  }]);

  return BooleanControl;
}(Control);

module.exports = BooleanControl;

},{"../util/calc":6,"./control":3}],3:[function(require,module,exports){
'use strict';

/**
 * Create a control
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Control = function Control() {
  _classCallCheck(this, Control);
};

module.exports = Control;

},{}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Control = require('./control');
var Calc = require('../util/calc');
var Ease = require('../util/ease');

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
 * @param {boolean} config.eased - When randomizing or mutating a value, animate the value with eased
 *
 * @extends Control
 *
 * @requires {@link Control}
 * @requires {@link Calc}
 */

var RangeControl = function (_Control) {
  _inherits(RangeControl, _Control);

  function RangeControl(variaboard, config) {
    _classCallCheck(this, RangeControl);

    var _this = _possibleConstructorReturn(this, (RangeControl.__proto__ || Object.getPrototypeOf(RangeControl)).call(this));

    _this.type = 'range';
    _this.variaboard = variaboard;
    _this.id = config.id;
    _this.title = config.title;
    _this.default = config.default;
    _this.randomizable = config.randomizable !== undefined ? config.randomizable : true;
    _this.mutable = config.mutable !== undefined ? config.mutable : true;
    _this.locked = config.locked !== undefined ? config.locked : false;
    _this.suffix = config.suffix !== undefined ? config.suffix : '';
    _this.min = config.min;
    _this.max = config.max;
    _this.size = _this.max - _this.min;
    _this.step = config.step !== undefined ? Math.abs(config.step) : 1;
    _this.eased = config.eased !== undefined ? config.eased : true;
    _this.easedDuration = config.easedDuration !== undefined ? config.easedDuration : 500;
    _this.easedFunc = config.easedFunc !== undefined ? Ease[config.easedFunc] : Ease['outExpo'];
    _this.places = _this.step.toString().indexOf('.') > -1 ? _this.step.toString().split('.')[1].length : 0;

    _this.easedValueStart = _this.default;
    _this.easedValueTarget = _this.default;
    _this.easedTime = null;
    _this.easedLastTime = null;
    _this.easedElapsedTime = 0;

    _this.isMouseDown = false;
    _this.settled = false;
    _this.isFocused = false;

    _this.createDOM();

    _this.onWindowResize();

    _this.listen();
    _this.set(_this.default, true, false);
    return _this;
  }

  _createClass(RangeControl, [{
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

      // suffix
      this.dom.suffix = document.createElement('div');
      this.dom.suffix.classList.add(this.variaboard.namespace + '-control-suffix');
      this.dom.suffix.textContent = this.suffix;
      this.dom.control.appendChild(this.dom.suffix);

      // randomize
      this.dom.randomize = document.createElement('div');
      this.dom.randomize.classList.add(this.variaboard.namespace + '-control-randomize');
      this.dom.randomize.setAttribute('title', 'Randomize');
      this.dom.randomize.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" class="' + this.variaboard.namespace + '-control-randomize-svg"><path d="M2 7h-2v-2h2c3.49 0 5.48 1.221 6.822 2.854-.41.654-.754 1.312-1.055 1.939-1.087-1.643-2.633-2.793-5.767-2.793zm16 10c-3.084 0-4.604-1.147-5.679-2.786-.302.627-.647 1.284-1.06 1.937 1.327 1.629 3.291 2.849 6.739 2.849v3l6-4-6-4v3zm0-10v3l6-4-6-4v3c-5.834 0-7.436 3.482-8.85 6.556-1.343 2.921-2.504 5.444-7.15 5.444h-2v2h2c5.928 0 7.543-3.511 8.968-6.609 1.331-2.893 2.479-5.391 7.032-5.391z"/></svg>';
      this.dom.control.appendChild(this.dom.randomize);

      // mutate
      this.dom.mutate = document.createElement('div');
      this.dom.mutate.classList.add(this.variaboard.namespace + '-control-mutate');
      this.dom.mutate.setAttribute('title', 'Mutate');
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
      this.easedValueTarget = this.value;
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
      var change = e.shiftKey ? this.step * 4 : this.step;
      switch (e.which) {
        case 38:
          this.set(this.value + change);
          break;
        case 40:
          this.set(this.value - change);
          break;
      }
    }
  }, {
    key: 'onValueMousewheel',
    value: function onValueMousewheel(e) {
      if (this.isFocused) {
        var change = e.shiftKey ? this.step * 4 : this.step;
        if (e.wheelDelta < 0) {
          this.set(this.value - change);
        } else if (e.wheelDelta > 0) {
          this.set(this.value + change);
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
      this.dom.control.classList.add(this.variaboard.namespace + '-control-is-dragging');
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
      this.dom.control.classList.remove(this.variaboard.namespace + '-control-is-dragging');
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

      var val = Calc.roundToNearestInterval(Calc.rand(this.min, this.max), this.step);
      if (this.eased) {
        this.settled = false;
        this.easedValueStart = this.value;
        this.easedValueTarget = val;

        window.cancelAnimationFrame(this.variaboard.raf);
        this.variaboard.update();
      } else {
        this.set(val);
      }

      this.dom.control.classList.add(this.variaboard.namespace + '-control-randomizing');
      void this.dom.control.offsetWidth;
      this.dom.control.classList.remove(this.variaboard.namespace + '-control-randomizing');
    }
  }, {
    key: 'mutate',
    value: function mutate() {
      if (this.locked) {
        return;
      }

      var size = Math.max(this.size / 15, this.step);
      var val = null;
      if (this.value === this.min) {
        val = this.value + Calc.rand(0, size);
      } else if (this.value === this.max) {
        val = this.value + Calc.rand(-size, 0);
      } else {
        val = this.value + Calc.rand(-size, size);
      }

      if (this.eased) {
        this.settled = false;
        this.easedValueStart = this.value;
        this.easedValueTarget = val;

        window.cancelAnimationFrame(this.variaboard.raf);
        this.variaboard.update();
      } else {
        this.set(val);
      }

      this.dom.control.classList.add(this.variaboard.namespace + '-control-mutating');
      void this.dom.control.offsetWidth;
      this.dom.control.classList.remove(this.variaboard.namespace + '-control-mutating');
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
  }, {
    key: 'setDragValue',
    value: function setDragValue() {
      this.set(Calc.map(this.variaboard.mouse.x, this.bcr.left, this.bcr.right, this.min, this.max));
      this.easedValueTarget = this.value;
    }
  }, {
    key: 'easeSet',
    value: function easeSet() {
      this.easedTime = Date.now();
      if (this.easedLastTime !== null) {
        this.easedElapsedTime += this.easedTime - this.easedLastTime;
        this.easedElapsedTime = Calc.clamp(this.easedElapsedTime, 0, this.easedDuration);
      }
      this.easedLastTime = this.easedTime;

      if (this.easedElapsedTime < this.easedDuration) {
        this.set(Calc.map(this.easedFunc(this.easedElapsedTime, 0, 1, this.easedDuration), 0, 1, this.easedValueStart, this.easedValueTarget));
      } else {
        this.easedTime = null;
        this.easedLastTime = null;
        this.easedElapsedTime = 0;
        this.settled = true;
        this.set(this.easedValueTarget);
      }
    }
  }, {
    key: 'set',
    value: function set(val) {
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var triggerChange = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      // sanitize value
      val = parseFloat(val);
      val = isNaN(val) ? this.default : val;
      val = Calc.clamp(val, this.min, this.max);
      val = Calc.roundToNearestInterval(val, this.step);

      // exit out if the value hasn't changed and it is not forced
      if (val === this.value && !force) {
        return;
      }

      // set the new value
      this.value = val;

      // set input value
      this.dom.value.value = this.value.toFixed(this.places);

      // set range value
      this.dom.rangeInner.style.transform = 'scaleX(' + Calc.map(this.value, this.min, this.max, 0, 1) + ')';

      // set the title attribute for the control
      this.dom.control.setAttribute('title', this.title + ': ' + this.value.toFixed(this.places) + this.suffix);

      // queue up change callback
      if (triggerChange) {
        window.cancelAnimationFrame(this.variaboard.changeRaf);
        this.variaboard.changeRaf = window.requestAnimationFrame(this.variaboard.changeCallback.bind(this.variaboard));
      }
    }
  }]);

  return RangeControl;
}(Control);

module.exports = RangeControl;

},{"../util/calc":6,"../util/ease":7,"./control":3}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Button = require('./button');
var RangeControl = require('./controls/range-control');
var BooleanControl = require('./controls/boolean-control');

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

    this.changeRaf = null;

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
        if (control && control.type === 'range') {
          control.onWindowMouseup(e);
        }
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
        if (control && control.type === 'range') {
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
        if (control && control.type === 'range') {
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
        this.raf = window.requestAnimationFrame(function () {
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
      this.controls[config.id] = new RangeControl(this, config);
      return this;
    }
  }, {
    key: 'addBoolean',
    value: function addBoolean(config) {
      this.controls[config.id] = new BooleanControl(this, config);
      return this;
    }
  }, {
    key: 'get',
    value: function get(id) {
      var control = this.controls[id];
      if (control) {
        return control.value;
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

},{"./button":1,"./controls/boolean-control":2,"./controls/range-control":4}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
'use strict';

/**
 * Easing equations
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ease = function () {

  /*
  ------------------------------------------
  | constructor:void
  |
  | Construct
  ------------------------------------------ */
  function Ease() {
    _classCallCheck(this, Ease);
  }

  /*
  ------------------------------------------
  | inQuad:float - returns eased float value
  |
  | t:number - current time
  | b:number - beginning value
  | c:number - change in value
  | d:number - duration
  |
  | Get an eased float value based on inQuad.
  ------------------------------------------ */


  _createClass(Ease, null, [{
    key: 'linear',
    value: function linear(t, b, c, d) {
      return t / d * (b + c);
    }

    /*
    ------------------------------------------
    | inQuad:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inQuad.
    ------------------------------------------ */

  }, {
    key: 'inQuad',
    value: function inQuad(t, b, c, d) {
      return c * (t /= d) * t + b;
    }

    /*
    ------------------------------------------
    | outQuad:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on outQuad.
    ------------------------------------------ */

  }, {
    key: 'outQuad',
    value: function outQuad(t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    }

    /*
    ------------------------------------------
    | inOutQuad:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inOutQuad.
    ------------------------------------------ */

  }, {
    key: 'inOutQuad',
    value: function inOutQuad(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b;
      return -c / 2 * (--t * (t - 2) - 1) + b;
    }

    /*
    ------------------------------------------
    | inCubic:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inCubic.
    ------------------------------------------ */

  }, {
    key: 'inCubic',
    value: function inCubic(t, b, c, d) {
      return c * (t /= d) * t * t + b;
    }

    /*
    ------------------------------------------
    | outCubic:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on outCubic.
    ------------------------------------------ */

  }, {
    key: 'outCubic',
    value: function outCubic(t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b;
    }

    /*
    ------------------------------------------
    | inOutCubic:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inOutCubic.
    ------------------------------------------ */

  }, {
    key: 'inOutCubic',
    value: function inOutCubic(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
      return c / 2 * ((t -= 2) * t * t + 2) + b;
    }

    /*
    ------------------------------------------
    | inQuart:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inQuart.
    ------------------------------------------ */

  }, {
    key: 'inQuart',
    value: function inQuart(t, b, c, d) {
      return c * (t /= d) * t * t * t + b;
    }

    /*
    ------------------------------------------
    | outQuart:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on outQuart.
    ------------------------------------------ */

  }, {
    key: 'outQuart',
    value: function outQuart(t, b, c, d) {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    }

    /*
    ------------------------------------------
    | inOutQuart:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inOutQuart.
    ------------------------------------------ */

  }, {
    key: 'inOutQuart',
    value: function inOutQuart(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
      return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    }

    /*
    ------------------------------------------
    | inQuint:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inQuint.
    ------------------------------------------ */

  }, {
    key: 'inQuint',
    value: function inQuint(t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b;
    }

    /*
    ------------------------------------------
    | outQuint:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on outQuint.
    ------------------------------------------ */

  }, {
    key: 'outQuint',
    value: function outQuint(t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    }

    /*
    ------------------------------------------
    | inOutQuint:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inOutQuint.
    ------------------------------------------ */

  }, {
    key: 'inOutQuint',
    value: function inOutQuint(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    }

    /*
    ------------------------------------------
    | inSine:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inSine.
    ------------------------------------------ */

  }, {
    key: 'inSine',
    value: function inSine(t, b, c, d) {
      return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    }

    /*
    ------------------------------------------
    | outSine:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on outSine.
    ------------------------------------------ */

  }, {
    key: 'outSine',
    value: function outSine(t, b, c, d) {
      return c * Math.sin(t / d * (Math.PI / 2)) + b;
    }

    /*
    ------------------------------------------
    | inOutSine:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inOutSine.
    ------------------------------------------ */

  }, {
    key: 'inOutSine',
    value: function inOutSine(t, b, c, d) {
      return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    }

    /*
    ------------------------------------------
    | inExpo:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inExpo.
    ------------------------------------------ */

  }, {
    key: 'inExpo',
    value: function inExpo(t, b, c, d) {
      return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    }

    /*
    ------------------------------------------
    | outExpo:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on outExpo.
    ------------------------------------------ */

  }, {
    key: 'outExpo',
    value: function outExpo(t, b, c, d) {
      return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    }

    /*
    ------------------------------------------
    | inOutExpo:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inOutExpo.
    ------------------------------------------ */

  }, {
    key: 'inOutExpo',
    value: function inOutExpo(t, b, c, d) {
      if (t == 0) return b;
      if (t == d) return b + c;
      if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }

    /*
    ------------------------------------------
    | inCirc:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inCirc.
    ------------------------------------------ */

  }, {
    key: 'inCirc',
    value: function inCirc(t, b, c, d) {
      return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    }

    /*
    ------------------------------------------
    | outCirc:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on outCirc.
    ------------------------------------------ */

  }, {
    key: 'outCirc',
    value: function outCirc(t, b, c, d) {
      return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    }

    /*
    ------------------------------------------
    | inOutCirc:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inOutCirc.
    ------------------------------------------ */

  }, {
    key: 'inOutCirc',
    value: function inOutCirc(t, b, c, d) {
      if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
      return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    }

    /*
    ------------------------------------------
    | inElastic:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inElastic.
    ------------------------------------------ */

  }, {
    key: 'inElastic',
    value: function inElastic(t, b, c, d) {
      var s = 1.70158;var p = 0;var a = c;
      if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * .3;
      if (a < Math.abs(c)) {
        a = c;var s = p / 4;
      } else var s = p / (2 * Math.PI) * Math.asin(c / a);
      return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    }

    /*
    ------------------------------------------
    | outElastic:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on outElastic.
    ------------------------------------------ */

  }, {
    key: 'outElastic',
    value: function outElastic(t, b, c, d) {
      var s = 1.70158;var p = 0;var a = c;
      if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * .3;
      if (a < Math.abs(c)) {
        a = c;var s = p / 4;
      } else var s = p / (2 * Math.PI) * Math.asin(c / a);
      return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    }

    /*
    ------------------------------------------
    | inOutElastic:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inOutElastic.
    ------------------------------------------ */

  }, {
    key: 'inOutElastic',
    value: function inOutElastic(t, b, c, d) {
      var s = 1.70158;var p = 0;var a = c;
      if (t == 0) return b;if ((t /= d / 2) == 2) return b + c;if (!p) p = d * (.3 * 1.5);
      if (a < Math.abs(c)) {
        a = c;var s = p / 4;
      } else var s = p / (2 * Math.PI) * Math.asin(c / a);
      if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    }

    /*
    ------------------------------------------
    | inBack:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    | s:number - strength
    |
    | Get an eased float value based on inBack.
    ------------------------------------------ */

  }, {
    key: 'inBack',
    value: function inBack(t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      return c * (t /= d) * t * ((s + 1) * t - s) + b;
    }

    /*
    ------------------------------------------
    | outBack:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    | s:number - strength
    |
    | Get an eased float value based on outBack.
    ------------------------------------------ */

  }, {
    key: 'outBack',
    value: function outBack(t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    }

    /*
    ------------------------------------------
    | inOutBack:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    | s:number - strength
    |
    | Get an eased float value based on inOutBack.
    ------------------------------------------ */

  }, {
    key: 'inOutBack',
    value: function inOutBack(t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
      return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
    }

    /*
    ------------------------------------------
    | inBounce:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on outBounce.
    ------------------------------------------ */

  }, {
    key: 'inBounce',
    value: function inBounce(t, b, c, d) {
      return c - this.outBounce(d - t, 0, c, d) + b;
    }

    /*
    ------------------------------------------
    | outBounce:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on outBounce.
    ------------------------------------------ */

  }, {
    key: 'outBounce',
    value: function outBounce(t, b, c, d) {
      if ((t /= d) < 1 / 2.75) {
        return c * (7.5625 * t * t) + b;
      } else if (t < 2 / 2.75) {
        return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
      } else if (t < 2.5 / 2.75) {
        return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
      } else {
        return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
      }
    }

    /*
    ------------------------------------------
    | inOutBounce:float - returns eased float value
    |
    | t:number - current time
    | b:number - beginning value
    | c:number - change in value
    | d:number - duration
    |
    | Get an eased float value based on inOutBounce.
    ------------------------------------------ */

  }, {
    key: 'inOutBounce',
    value: function inOutBounce(t, b, c, d) {
      if (t < d / 2) return this.inBounce(t * 2, 0, c, d) * .5 + b;
      return this.outBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
  }]);

  return Ease;
}();

module.exports = Ease;

},{}]},{},[5])(5)
});