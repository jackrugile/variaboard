'use strict';

const Control = require('./control');
const Calc = require('../util/calc');

class BooleanControl extends Control {

  constructor(variaboard, config) {
    super();

    this.type = 'boolean';
    this.variaboard = variaboard;
    this.id = config.id;
    this.title = config.title;
    this.description = config.description !== undefined ? config.description : null;
    this.default = config.default;
    this.randomizable = config.randomizable !== undefined ? config.randomizable : true;
    this.mutable = config.mutable !== undefined ? config.mutable : true;
    this.locked = config.locked !== undefined ? config.locked : false;
    this.suffix = config.suffix !== undefined ? config.suffix : '';
    this.isFocused = false;
    this.createDOM();
    this.listen();
    this.set(this.default, true, false);

  }

  createDOM() {
    this.dom = {};

    // control
    this.dom.control = document.createElement('div');
    this.dom.control.classList.add(`${this.variaboard.namespace}-control`);

    // title
    this.dom.title = document.createElement('label');
    this.dom.title.classList.add(`${this.variaboard.namespace}-control-title`);
    this.dom.title.textContent = this.title;
    this.dom.title.setAttribute('for', `${this.variaboard.namespace}-${this.id}-${this.variaboard.id}`);
    this.dom.control.appendChild(this.dom.title);

    // checkbox wrap
    this.dom.checkboxWrap = document.createElement('div');
    this.dom.checkboxWrap.classList.add(`${this.variaboard.namespace}-control-checkbox-wrap`);
    this.dom.control.appendChild(this.dom.checkboxWrap);

    // checkbox
    this.dom.checkbox = document.createElement('input');
    this.dom.checkbox.classList.add(`${this.variaboard.namespace}-control-checkbox`);
    this.dom.checkbox.setAttribute('type', 'checkbox');
    this.dom.checkbox.setAttribute('id', `${this.variaboard.namespace}-${this.id}-${this.variaboard.id}`);
    this.dom.checkboxWrap.appendChild(this.dom.checkbox);

    // checkbox indicator
    this.dom.checkboxIndicator = document.createElement('div');
    this.dom.checkboxIndicator.classList.add(`${this.variaboard.namespace}-control-checkbox-indicator`);
    this.dom.checkboxWrap.appendChild(this.dom.checkboxIndicator);

    // checkbox indicator
    this.dom.checkboxStub = document.createElement('div');
    this.dom.checkboxStub.classList.add(`${this.variaboard.namespace}-control-checkbox-stub`);
    this.dom.control.appendChild(this.dom.checkboxStub);

    // add control to panel
    this.variaboard.dom.controls.appendChild(this.dom.control);
  }

  listen() {
    this.dom.checkbox.addEventListener('change', (e) => this.onCheckboxChange(e));
    this.dom.checkbox.addEventListener('focus', (e) => this.onValueFocus(e));
    this.dom.checkbox.addEventListener('blur', (e) => this.onValueBlur(e));
    this.dom.checkboxWrap.addEventListener('click', (e) => this.onCheckboxWrapClick(e));
  }

  onCheckboxChange() {
    this.set(this.dom.checkbox.checked);
  }

  onValueFocus() {
    this.isFocused = true;
    this.dom.control.classList.add(`${this.variaboard.namespace}-control-is-focused`);
  }

  onValueBlur() {
    this.isFocused = false;
    this.dom.control.classList.remove(`${this.variaboard.namespace}-control-is-focused`);
  }

  onCheckboxWrapClick() {
    this.dom.checkbox.focus();
    this.set(!this.dom.checkbox.checked);
  }

  randomize() {
    if(this.locked) {
      return;
    }

    let val = Math.random() > 0.5 ? true : false;
    this.set(val);

    this.dom.control.classList.add(`${this.variaboard.namespace}-control-randomizing`);
    void this.dom.control.offsetWidth;
    this.dom.control.classList.remove(`${this.variaboard.namespace}-control-randomizing`);
  }

  mutate() {
    if(this.locked) {
      return;
    }

    let val = Math.random() > 0.5 ? true : false;
    this.set(val);

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

  set(val, force = false, triggerChange = true) {
    // exit out if the value hasn't changed and it is not forced
    if(val === this.value && !force) {
      return;
    }

    // set the new value
    this.value = val;

    // set checkbox value
    this.dom.checkbox.checked = this.value;

    // set the title attribute for the control
    let title = `${this.title}: ${this.value}${this.suffix}`;
    if(this.description) {
      title = `${this.title}: ${this.value}${this.suffix}\n${this.description}`;
    }
    this.dom.control.setAttribute('title', title);

    // queue up change callback
    if(triggerChange) {
      window.cancelAnimationFrame(this.variaboard.changeRaf);
      this.variaboard.changeRaf = window.requestAnimationFrame(this.variaboard.changeCallback.bind(this.variaboard));
    }
  }

}

module.exports = BooleanControl;
