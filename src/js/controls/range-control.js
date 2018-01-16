'use strict';

const Control = require('./control');
const Calc = require('../util/calc');
const Ease = require('../util/ease');

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

class RangeControl extends Control {

  constructor(variaboard, config) {
    super();

    this.type = 'range';
    this.variaboard = variaboard;
    this.id = config.id;
    this.title = config.title;
    this.description = config.description !== undefined ? config.description : null;
    this.default = config.default;
    this.randomizable = config.randomizable !== undefined ? config.randomizable : true;
    this.mutable = config.mutable !== undefined ? config.mutable : true;
    this.locked = config.locked !== undefined ? config.locked : false;
    this.suffix = config.suffix !== undefined ? config.suffix : '';
    this.min = config.min;
    this.max = config.max;
    this.size = this.max - this.min;
    this.step = config.step !== undefined ? Math.abs(config.step) : 1;
    this.eased = config.eased !== undefined ? config.eased : true;
    this.easedDuration = config.easedDuration !== undefined ? config.easedDuration : 300;
    this.easedFunc = config.easedFunc !== undefined ? Ease[config.easedFunc] : Ease['outExpo'];
    this.places = this.step.toString().indexOf('.') > -1 ? this.step.toString().split('.')[1].length : 0;

    this.easedValueStart = this.default;
    this.easedValueTarget = this.default;
    this.easedTime = null;
    this.easedLastTime = null;
    this.easedElapsedTime = 0;

    this.isMouseDown = false;
    this.settled = false;
    this.isFocused = false;

    this.createDOM();

    this.onWindowResize();

    this.listen();
    this.set(this.default, true, false);
  }

  createDOM() {
    this.dom = {};

    // control
    this.dom.control = document.createElement('div');
    this.dom.control.classList.add(`${this.variaboard.namespace}-control`);
    if(this.eased) {
      this.dom.control.classList.add(`${this.variaboard.namespace}-control-eased`);
    }

    // title
    this.dom.title = document.createElement('label');
    this.dom.title.classList.add(`${this.variaboard.namespace}-control-title`);
    this.dom.title.textContent = this.title;
    this.dom.title.setAttribute('for', `${this.variaboard.namespace}-${this.id}-${this.variaboard.id}`);
    this.dom.control.appendChild(this.dom.title);

    // value wrap
    this.dom.valueWrap = document.createElement('div');
    this.dom.valueWrap.classList.add(`${this.variaboard.namespace}-control-value-wrap`);
    this.dom.control.appendChild(this.dom.valueWrap);

    // value
    this.dom.value = document.createElement('input');
    this.dom.value.classList.add(`${this.variaboard.namespace}-control-value`);
    this.dom.value.setAttribute('id', `${this.variaboard.namespace}-${this.id}-${this.variaboard.id}`);
    this.dom.valueWrap.appendChild(this.dom.value);

    // add control to panel
    this.variaboard.dom.controls.appendChild(this.dom.control);

    // range
    this.dom.range = document.createElement('div');
    this.dom.range.classList.add(`${this.variaboard.namespace}-control-range`);

    // range inner
    this.dom.rangeInner = document.createElement('div');
    this.dom.rangeInner.classList.add(`${this.variaboard.namespace}-control-range-inner`);
    this.dom.range.appendChild(this.dom.rangeInner);

    this.dom.control.appendChild(this.dom.range);
  }

  listen() {
    this.dom.value.addEventListener('change', (e) => this.onValueChange(e));
    this.dom.value.addEventListener('focus', (e) => this.onValueFocus(e));
    this.dom.value.addEventListener('blur', (e) => this.onValueBlur(e));
    this.dom.value.addEventListener('keydown', (e) => this.onValueKeydown(e));
    this.dom.value.addEventListener('wheel', (e) => this.onValueMousewheel(e));

    this.dom.range.addEventListener('mousedown', (e) => this.onRangeMousedown(e));
  }

  onValueChange() {
    this.set(this.dom.value.value);
    this.easedValueTarget = this.value;
  }

  onValueFocus() {
    this.isFocused = true;
  }

  onValueBlur() {
    this.isFocused = false;
  }

  onValueKeydown(e) {
    let change = e.shiftKey ? this.step * 4 : this.step;
    switch(e.which) {
      case 38:
        this.set(this.value + change);
        break;
      case 40:
        this.set(this.value - change);
        break;
    }
  }

  onValueMousewheel(e) {
    if(this.isFocused) {
      let change = e.shiftKey ? this.step * 4 : this.step;
      if(e.wheelDelta < 0) {
        this.set(this.value - change);
      } else if(e.wheelDelta > 0) {
        this.set(this.value + change);
      }
    }
  }

  onRangeMousedown(e) {
    this.variaboard.onDragStart();
    this.variaboard.mouse.down = true;
    this.variaboard.mouse.anchor.x = e.clientX;
    this.variaboard.mouse.anchor.y = e.clientY;
    this.isMouseDown = true;
    this.dom.control.classList.add(`${this.variaboard.namespace}-control-is-dragging`);
    this.setDragValue();
  }

  onWindowMouseup() {
    this.variaboard.onDragEnd();
    this.isMouseDown = false;
    this.dom.control.classList.remove(`${this.variaboard.namespace}-control-is-dragging`);
  }

  onWindowMousemove() {
    if(this.isMouseDown) {
      this.setDragValue();
    }
  }

  onWindowResize() {
    this.bcr = this.dom.range.getBoundingClientRect();
  }

  randomize() {
    if(this.locked) {
      return;
    }

    let val = Calc.roundToNearestInterval(Calc.rand(this.min, this.max), this.step);
    if(this.eased) {
      this.easeSet(val);
    } else {
      this.set(val);
    }

    this.dom.control.classList.add(`${this.variaboard.namespace}-control-randomizing`);
    void this.dom.control.offsetWidth;
    this.dom.control.classList.remove(`${this.variaboard.namespace}-control-randomizing`);
  }

  mutate() {
    if(this.locked) {
      return;
    }

    let size = Math.max(this.size / 15, this.step);
    let val = null;
    if(this.value === this.min) {
      val = this.value + Calc.rand(0, size);
    } else if(this.value === this.max) {
      val = this.value + Calc.rand(-size, 0);
    } else {
      val = this.value + Calc.rand(-size, size);
    }

    if(this.eased) {
      this.easeSet(val);
    } else {
      this.set(val);
    }

    this.dom.control.classList.add(`${this.variaboard.namespace}-control-mutating`);
    void this.dom.control.offsetWidth;
    this.dom.control.classList.remove(`${this.variaboard.namespace}-control-mutating`);
  }

  lock() {
    this.locked = true;
  }

  unlock() {
    this.locked = false;
  }

  setDragValue() {
    this.set(Calc.map(this.variaboard.mouse.x, this.bcr.left, this.bcr.right, this.min, this.max));
    this.easedValueTarget = this.value;
  }

  easeSet(val) {
    this.easedTime = null;
    this.easedLastTime = null;
    this.easedElapsedTime = 0;
    this.easedValueStart = this.value;
    this.easedValueTarget = val;
    this.settled = false;
    window.cancelAnimationFrame(this.variaboard.raf);
    this.variaboard.update();
  }

  easeUpdate() {
    this.easedTime = Date.now();
    if(this.easedLastTime !== null) {
      this.easedElapsedTime += this.easedTime - this.easedLastTime;
      this.easedElapsedTime = Calc.clamp(this.easedElapsedTime, 0, this.easedDuration);
    }
    this.easedLastTime = this.easedTime;

    if(this.easedElapsedTime < this.easedDuration) {
      this.set(Calc.map(this.easedFunc(this.easedElapsedTime, 0, 1, this.easedDuration), 0, 1, this.easedValueStart, this.easedValueTarget));
    } else {
      this.easedTime = null;
      this.easedLastTime = null;
      this.easedElapsedTime = 0;
      this.settled = true;
      this.set(this.easedValueTarget);
    }
  }

  set(val, force = false, triggerChange = true) {
    // sanitize value
    val = parseFloat(val);
    val = isNaN(val) ? this.default : val;
    val = Calc.clamp(val, this.min, this.max);
    val = Calc.roundToNearestInterval(val, this.step);

    // exit out if the value hasn't changed and it is not forced
    if(val === this.value && !force) {
      // replace what a user has typed, if they did
      this.dom.value.value = this.value.toFixed(this.places);
      return;
    }

    // set the new value
    this.value = val;

    // set input value
    this.dom.value.value = this.value.toFixed(this.places);

    // set range value
    this.dom.rangeInner.style.transform = `translateX(${Calc.map(this.value, this.min, this.max, -100, 0)}%)`;

    // set the title attribute for the control
    let title = `${this.title}: ${this.value.toFixed(this.places)}${this.suffix}`;
    if(this.description) {
      title = `${this.title}: ${this.value.toFixed(this.places)}${this.suffix}\n${this.description}`;
    }
    this.dom.control.setAttribute('title', title);

    // queue up change callback
    if(triggerChange) {
      window.cancelAnimationFrame(this.variaboard.changeRaf);
      this.variaboard.changeRaf = window.requestAnimationFrame(this.variaboard.changeCallback.bind(this.variaboard));
    }
  }

}

module.exports = RangeControl;
