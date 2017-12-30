'use strict';

/**
 * Create a button
 */

class Button {

  constructor(variaboard, config) {
    this.variaboard = variaboard;
    this.id = config.id;
    this.title = config.title;
    this.description = config.description;
    this.callback = config.callback !== undefined ? config.callback : () => {};

    this.createDOM();
    this.listen();
  }

  /**
   * Create necessary DOM elements
   */

  createDOM() {
    this.dom = {};

    // control
    this.dom.control = document.createElement('div');
    this.dom.control.classList.add(`${this.variaboard.namespace}-control`);

    // button
    this.dom.button = document.createElement('button');
    this.dom.button.classList.add(`${this.variaboard.namespace}-button`);
    this.dom.button.textContent = this.title;
    this.dom.control.setAttribute('title', `${this.title}: ${this.description}`);
    this.dom.control.appendChild(this.dom.button);

    // add to control to panel
    this.variaboard.dom.controls.appendChild(this.dom.control);
  }

  /**
   * Setup event listeners
   */

  listen() {
    this.dom.button.addEventListener('click', (e) => this.onButtonClick(e));
  }

  /**
   * On button click event
   *
   * @param {object} e - Event object
   */

  onButtonClick() {
    this.callback();
  }

}

module.exports = Button;
