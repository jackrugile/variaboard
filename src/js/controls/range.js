const Control = require('./control');
const Calc = require('../util/calc');

/**
 * Create a range control
 *
 * @param {object} futz - Reference to parent Futz instance
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

  constructor(futz, config) {
    super(futz, config);
    this.type = 'range';

    this.min = config.min;
    this.max = config.max;
    this.step = config.step !== undefined ? Math.abs(config.step) : 1;
    this.places = this.step.toString().indexOf('.') > -1 ? this.step.toString().split('.')[1].length : 0;
    this.valueTarget = this.value;

    this.mouseIsDown = false;
    this.settled = false;

    this.listen();

    this.set(this.value);
  }

  createDOM() {
    super.createDOM();

    // range
    this.dom.range = document.createElement('div');
    this.dom.range.classList.add(`${this.futz.namespace}-control-range`);

    // range inner
    this.dom.rangeInner = document.createElement('div');
    this.dom.rangeInner.classList.add(`${this.futz.namespace}-control-range-inner`);
    this.dom.range.appendChild(this.dom.rangeInner);
    
    this.dom.control.appendChild(this.dom.range);
  }

  listen() {
    this.dom.value.addEventListener('change', (e) => this.onValueChange(e));
    this.dom.range.addEventListener('mousedown', (e) => this.onValueMousedown(e));
  }

  onValueChange(e) {
    this.set(this.dom.value.value);
    this.valueTarget = this.value;
  }

  onValueMousedown(e) {
    this.futz.mouse.down = true;
    this.futz.mouse.anchor.x = e.clientX;
    this.futz.mouse.anchor.y = e.clientY;
    this.mouseIsDown = true;
    this.setDragValue();
  }

  onWindowMouseup(e) {
    this.mouseIsDown = false;
  }

  onWindowMousemove(e) {
    if(this.mouseIsDown) {
      this.setDragValue();
    }
  }

  randomize() {
    this.settled = false;
    this.valueTarget = Calc.rand(this.min, this.max);
  }

  setDragValue() {
    let left = this.dom.range.offsetLeft;
    let width = this.dom.range.offsetWidth;
    let val = Calc.map(this.futz.mouse.x, left, left + width, this.min, this.max);
    this.set(val);
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
  }

}

module.exports = Range;