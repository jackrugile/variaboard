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
 * @param {boolean} config.eased - When randomizing or mutating a value, animate the value with eased
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
    this.size = this.max - this.min;
    this.step = config.step !== undefined ? Math.abs(config.step) : 1;
    this.eased = config.eased !== undefined ? config.eased : true;
    this.places = this.step.toString().indexOf('.') > -1 ? this.step.toString().split('.')[1].length : 0;
    this.easedValue = this.value;
    this.easedValueTarget = this.value;

    this.isMouseDown = false;
    this.settled = false;
    this.isFocused = false;

    this.onWindowResize();

    this.listen();
    this.set(this.value);
  }

  createDOM() {
    super.createDOM();

    // randomize
    this.dom.randomize = document.createElement('div');
    this.dom.randomize.classList.add(`${this.variaboard.namespace}-control-randomize`);
    this.dom.randomize.setAttribute('title', 'Randomize');
    this.dom.randomize.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" class="${this.variaboard.namespace}-control-randomize-svg"><path d="M2 7h-2v-2h2c3.49 0 5.48 1.221 6.822 2.854-.41.654-.754 1.312-1.055 1.939-1.087-1.643-2.633-2.793-5.767-2.793zm16 10c-3.084 0-4.604-1.147-5.679-2.786-.302.627-.647 1.284-1.06 1.937 1.327 1.629 3.291 2.849 6.739 2.849v3l6-4-6-4v3zm0-10v3l6-4-6-4v3c-5.834 0-7.436 3.482-8.85 6.556-1.343 2.921-2.504 5.444-7.15 5.444h-2v2h2c5.928 0 7.543-3.511 8.968-6.609 1.331-2.893 2.479-5.391 7.032-5.391z"/></svg>`;
    this.dom.control.appendChild(this.dom.randomize);

    // mutate
    this.dom.mutate = document.createElement('div');
    this.dom.mutate.classList.add(`${this.variaboard.namespace}-control-mutate`);
    this.dom.mutate.setAttribute('title', 'Mutate');
    this.dom.mutate.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" class="${this.variaboard.namespace}-control-mutate-svg"><path d="M20.759 20.498c-2.342-3.663-5.575-6.958-5.743-11.498h-2.016c.173 5.212 3.512 8.539 5.953 12.356.143.302-.068.644-.377.644h-1.264l-4.734-7h-3.52c.873-1.665 1.85-3.414 1.936-6h-2.01c-.169 4.543-3.421 7.864-5.743 11.498-.165.347-.241.707-.241 1.057 0 1.283 1.023 2.445 2.423 2.445h13.153c1.4 0 2.424-1.162 2.424-2.446 0-.35-.076-.709-.241-1.056zm-4.759-15.498c0 1.105-.896 2-2 2s-2-.895-2-2 .896-2 2-2 2 .895 2 2zm-5-1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5.672-1.5 1.5-1.5 1.5.671 1.5 1.5zm0 3.5c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1zm3-6c0 .552-.447 1-1 1s-1-.448-1-1 .447-1 1-1 1 .448 1 1z"/></svg>
`;
    this.dom.control.appendChild(this.dom.mutate);

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

    this.dom.randomize.addEventListener('click', (e) => this.onRandomizeClick(e));
    this.dom.mutate.addEventListener('click', (e) => this.onMutateClick(e));
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
        this.set(this.get() + change);
        break;
      case 40:
        this.set(this.get() - change);
        break;
    }
  }

  onValueMousewheel(e) {
    if(this.isFocused) {
      let change = e.shiftKey ? this.step * 4 : this.step;
      if(e.wheelDelta < 0) {
        this.set(this.get() - change);
      } else if(e.wheelDelta > 0) {
        this.set(this.get() + change);
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

  onRandomizeClick() {
    this.randomize();
  }

  onMutateClick() {
    this.mutate();
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
      this.settled = false;
      this.easedValue = this.value;
      this.easedValueTarget = val;

      cancelAnimationFrame(this.variaboard.raf);
      this.variaboard.update();
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

    let size = this.size / 15;
    let val = this.get() + Calc.rand(-size, size);
    if(this.eased) {
      this.settled = false;
      this.easedValue = this.value;
      this.easedValueTarget = val;

      cancelAnimationFrame(this.variaboard.raf);
      this.variaboard.update();
    } else {
      this.set(val);
    }

    this.dom.control.classList.add(`${this.variaboard.namespace}-control-mutating`);
    void this.dom.control.offsetWidth;
    this.dom.control.classList.remove(`${this.variaboard.namespace}-control-mutating`);
  }

  setDragValue() {
    this.set(Calc.map(this.variaboard.mouse.x, this.bcr.left, this.bcr.right, this.min, this.max));
    this.easedValueTarget = this.value;
  }

  easeSet() {
    if(Math.abs(this.easedValue - this.easedValueTarget) > this.step / 2) {
      this.easedValue += (this.easedValueTarget - this.easedValue) * 0.2;
      this.set(this.easedValue);
    } else {
      this.settled = true;
      this.easedValue = this.easedValueTarget;
      this.value = this.easedValueTarget;
      this.set(this.value);
    }
  }

  set(val/*, bypassRounding*/) {
    // sanitize value
    val = parseFloat(val);
    val = isNaN(val) ? this.default : val;
    val = Calc.clamp(val, this.min, this.max);
    val = Calc.roundToNearestInterval(val, this.step);
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
