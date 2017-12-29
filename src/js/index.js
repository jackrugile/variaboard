const Button = require('./button');
const Range = require('./controls/range');
const Calc = require('./util/calc');

class VariaBoard {

  /**
   * Create a VariaBoard control panel
   *
   * @param {object} config - Configuration object
   * @param {object|string} [config.container=document.body] - DOM element or CSS selector
   * @param {string} [config.title] - Title of the panel
   *
   * @requires {@link Button}
   * @requires {@link Range}
   * @requires {@link Calc}
   */

  constructor(config) {
    this.namespace = 'variaboard';
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
    }

    this.needsUpdate = false;
    this.raf = null;

    this.container = config.container !== undefined ? config.container : document.body;
    this.title = config.title !== undefined ? config.title : null;
    
    this.createDOM();
    this.listen();
  }

  /**
   * Create necessary DOM elements
   */

  createDOM() {
    this.dom = {};

    // container
    this.dom.container = this.container;

    // panel
    this.dom.panel = document.createElement('div');
    this.dom.panel.classList.add(`${this.namespace}-panel`);

    // title
    if(this.title) {
      this.dom.title = document.createElement('h1');
      this.dom.title.classList.add(`${this.namespace}-title`);
      this.dom.title.textContent = this.title;
      this.dom.panel.appendChild(this.dom.title);
    }

    // controls
    this.dom.controls = document.createElement('div');
    this.dom.controls.classList.add(`${this.namespace}-controls`);
    this.dom.panel.appendChild(this.dom.controls);

    // add panel to container
    this.dom.container.appendChild(this.dom.panel);
  }

  /**
   * Setup event listeners
   */

  listen() {
    window.addEventListener('mouseup', (e) => this.onWindowMouseup(e));
    window.addEventListener('mousemove', (e) => this.onWindowMousemove(e));
  }

  /**
   * On window mouse up event
   *
   * @param {object} e - Event object
   */

  onWindowMouseup(e) {
    this.mouse.down = false;
    for(let key in this.controls) {
      let control = this.controls[key];
      control.onWindowMouseup(e);
    }
  }

  /**
   * On window mouse move event
   *
   * @param {object} e - Event object
   */

  onWindowMousemove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
    for(let key in this.controls) {
      let control = this.controls[key];
      control.onWindowMousemove(e);
    }
  }

  /**
   * Update based on requestAnimationFrame()
   */

  update() {
    this.needsUpdate = false;
    for(let key in this.controls) {
      if(this.controls[key].type === 'range') {
        this.controls[key].easeSet();
        if(!this.controls[key].settled) {
          this.needsUpdate = true;
        }
      }
    }

    if(this.needsUpdate) {
      this.raf = requestAnimationFrame(() => this.update());
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

  addButton(config) {
    this.buttons[config.id] = new Button(this, config);
    return this.buttons[config.id];
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

  addRange(config) {
    this.controls[config.id] = new Range(this, config);
    return this.controls[config.id];
  }

  get(id) {
    return this.controls[id].get();
  }

  randomize() {
    for(let key in this.controls) {
      this.controls[key].randomize();
    }
    cancelAnimationFrame(this.raf);
    this.update();
  }

  mutate() {
    for(let key in this.controls) {
      this.controls[key].mutate();
    }
    cancelAnimationFrame(this.raf);
    this.update();
  }

}

module.exports = VariaBoard;
