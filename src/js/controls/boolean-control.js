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

    // add control to panel
    this.variaboard.dom.controls.appendChild(this.dom.control);

    // suffix
    this.dom.suffix = document.createElement('div');
    this.dom.suffix.classList.add(`${this.variaboard.namespace}-control-suffix`);
    this.dom.suffix.textContent = this.suffix;
    this.dom.control.appendChild(this.dom.suffix);

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
  }

  listen() {
    this.dom.checkbox.addEventListener('change', (e) => this.onCheckboxChange(e));
    // this.dom.value.addEventListener('focus', (e) => this.onValueFocus(e));
    // this.dom.value.addEventListener('blur', (e) => this.onValueBlur(e));
    this.dom.randomize.addEventListener('click', (e) => this.onRandomizeClick(e));
    this.dom.mutate.addEventListener('click', (e) => this.onMutateClick(e));
  }

  onCheckboxChange() {
    this.set(this.dom.checkbox.checked);
  }

  // onValueFocus() {
  //   this.isFocused = true;
  // }

  // onValueBlur() {
  //   this.isFocused = false;
  // }

  onRandomizeClick() {
    this.randomize();
  }

  onMutateClick() {
    this.mutate();
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
    this.dom.control.setAttribute('title', `${this.title}: ${this.value}`);

    // queue up change callback
    if(triggerChange) {
      window.cancelAnimationFrame(this.variaboard.changeRaf);
      this.variaboard.changeRaf = window.requestAnimationFrame(this.variaboard.changeCallback.bind(this.variaboard));
    }
  }

}

module.exports = BooleanControl;
