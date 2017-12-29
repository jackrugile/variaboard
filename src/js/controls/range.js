'use strict';

const Control = require('./control');
const Calc = require('../util/calc');

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

class Range extends Control {

  constructor(variaboard, config) {
    super(variaboard, config);
    this.type = 'range';

    this.min = config.min;
    this.max = config.max;
    this.step = config.step !== undefined ? Math.abs(config.step) : 1;
    this.places = this.step.toString().indexOf('.') > -1 ? this.step.toString().split('.')[1].length : 0;
    this.valueTarget = this.value;

    this.mouseIsDown = false;
    this.settled = false;
    this.isFocused = false;

    this.onWindowResize();

    this.listen();
    this.set(this.value);
  }

  createDOM() {
    super.createDOM();

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
    this.dom.range.addEventListener('mousedown', (e) => this.onValueMousedown(e));
    this.dom.value.addEventListener('wheel', (e) => this.onValueMousewheel(e));
  }

  onValueChange(e) {
    this.set(this.dom.value.value);
    this.valueTarget = this.value;
  }

  onValueFocus(e) {
    this.isFocused = true;
  }

  onValueBlur(e) {
    this.isFocused = false;
  }

  onValueKeydown(e) {
    let change = e.shiftKey ? this.step * 10 : this.step;
    switch(e.which) {
      case 38:
        this.set(this.get() + change);
        break;
      case 40:
        this.set(this.get() - change);
        break;
    }
  }

  onValueMousedown(e) {
    this.variaboard.mouse.down = true;
    this.variaboard.mouse.anchor.x = e.clientX;
    this.variaboard.mouse.anchor.y = e.clientY;
    this.mouseIsDown = true;
    this.setDragValue();
  }

  onValueMousewheel(e) {
    if(this.isFocused) {
      let change = this.step;
      if(e.deltaY < 0) {
        this.set(this.get() + change);
      } else if(e.deltaY > 0) {
        this.set(this.get() - change);
      }
    }
  }

  onWindowMouseup(e) {
    this.mouseIsDown = false;
  }

  onWindowMousemove(e) {
    if(this.mouseIsDown) {
      this.setDragValue();
    }
  }

  onWindowResize() {
    this.bcr = this.dom.range.getBoundingClientRect();
  }

  randomize() {
    this.settled = false;
    this.valueTarget = Calc.rand(this.min, this.max);
  }

  mutate() {
    let size = (this.max - this.min) / 15;
    this.settled = false;
    this.valueTarget = this.get() + Calc.rand(-size, size);
  }

  setDragValue() {
    this.set(Calc.map(this.variaboard.mouse.x, this.bcr.left, this.bcr.right, this.min, this.max));
    this.valueTarget = this.value;
  }

  easeSet() {
    if(Math.abs(this.value - this.valueTarget) > this.step / 2) {
      this.value += (this.valueTarget - this.value) * 0.2;
      this.set(this.value, true);
    } else {
      this.settled = true;
      this.value = this.valueTarget;
      this.set(this.value);
    }
  }

  set(val, bypassRounding) {
    // sanitize value
    val = parseFloat(val);
    val = isNaN(val) ? this.default : val;
    val = Calc.clamp(val, this.min, this.max);
    val = bypassRounding ? val : Calc.roundToNearestInterval(val, this.step);
    this.value = val;

    // set input value
    this.dom.value.value = this.value.toFixed(this.places);

    // set range value
    this.dom.rangeInner.style.transform = `scaleX(${Calc.map(this.value, this.min, this.max, 0, 1)})`;

    // set the title attribute for the control
    this.dom.control.setAttribute('title', `${this.title}: ${this.value.toFixed(this.places)}`);

    this.variaboard.changeCallback.call(this.variaboard);
  }

}

module.exports = Range;
