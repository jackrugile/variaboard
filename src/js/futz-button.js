class FutzButton {

  /**
   * Create a Futz button
   */

  constructor(futz, config) {
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

  createDOM() {
    this.dom = {};

    // control
    this.dom.control = document.createElement('div');
    this.dom.control.classList.add(`${this.futz.namespace}-control`);

    // button
    this.dom.button = document.createElement('button');
    this.dom.button.classList.add(`${this.futz.namespace}-control-button`);
    this.dom.button.textContent = this.title;
    this.dom.control.appendChild(this.dom.button);

    // add control to panel
    this.futz.dom.controls.appendChild(this.dom.control);
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

  onButtonClick(e) {
    this.callback();
  }

}

module.exports = FutzButton
