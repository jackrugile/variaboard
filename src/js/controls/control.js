/**
 * Create a control
 */

class Control {

  constructor(variaboard, config) {
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

  createDOM() {
    this.dom = {};

    // control
    this.dom.control = document.createElement('div');
    this.dom.control.classList.add(`${this.variaboard.namespace}-control`);

    // title
    this.dom.title = document.createElement('h3');
    this.dom.title.classList.add(`${this.variaboard.namespace}-control-title`);
    this.dom.title.textContent = this.title;
    this.dom.control.appendChild(this.dom.title);

    // value
    this.dom.value = document.createElement('input');
    this.dom.value.classList.add(`${this.variaboard.namespace}-control-value`);
    this.dom.control.appendChild(this.dom.value);

    // add control to panel
    this.variaboard.dom.controls.appendChild(this.dom.control);
  }

  get() {
    return this.value;
  }

  lock() {
    this.locked = true;
  }

  unlock() {
    this.locked = false;
  }

}

module.exports = Control;
