'use strict';

const Button = require('./button');
const RangeControl = require('./controls/range-control');
const BooleanControl = require('./controls/boolean-control');

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
   */

  constructor(config) {
    this.namespace = 'variaboard';
    this.id = Math.random().toString(36).substr(2, 8);
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
    };

    this.needsUpdate = false;
    this.raf = null;
    this.isDragging = false;

    this.changeRaf = null;

    this.container = config.container !== undefined ? config.container : document.body;
    this.class = config.class !== undefined ? config.class : null;
    this.title = config.title !== undefined ? config.title : null;
    this.changeCallback = config.changeCallback !== undefined ? config.changeCallback : () => {};

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
    if(this.class) {
      this.dom.panel.classList.add(this.class);
    }

    // title
    if(this.title) {
      this.dom.title = document.createElement('h1');
      this.dom.title.classList.add(`${this.namespace}-title`);
      this.dom.title.textContent = this.title;
      this.dom.title.setAttribute('title', this.title);
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
    window.addEventListener('resize', () => this.onWindowResize());
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
      if(control && control.type === 'range') {
        control.onWindowMouseup(e);
      }
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
      if(control && control.type === 'range') {
        control.onWindowMousemove(e);
      }
    }
  }

  /**
   * On window resize event
   */

  onWindowResize() {
    for(let key in this.controls) {
      let control = this.controls[key];
      if(control && control.type === 'range') {
        control.onWindowResize();
      }
    }
  }

  onDragStart() {
    this.isDragging = true;
    this.dom.panel.classList.add(`${this.namespace}-is-dragging`);
  }

  onDragEnd() {
    this.isDragging = false;
    this.dom.panel.classList.remove(`${this.namespace}-is-dragging`);
  }

  /**
   * Update based on requestAnimationFrame()
   */

  update() {
    this.needsUpdate = false;
    for(let key in this.controls) {
      if(this.controls[key].type === 'range') {
        if(!this.controls[key].settled) {
          this.needsUpdate = true;
          this.controls[key].easeUpdate();
        }
      }
    }

    if(this.needsUpdate) {
      this.raf = window.requestAnimationFrame(() => this.update());
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
    return this;
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
    this.controls[config.id] = new RangeControl(this, config);
    return this;
  }

  addBoolean(config) {
    this.controls[config.id] = new BooleanControl(this, config);
    return this;
  }

  get(id) {
    let control = this.controls[id];
    if(control) {
      return control.value;
    }
  }

  set(id, val) {
    let control = this.controls[id];
    if(control) {
      if(control.eased) {
        control.easeSet(val);
      } else {
        control.set(val);
      }
    }
  }

  reset() {
    for(let key in this.controls) {
      let control = this.controls[key];
      if(control.eased) {
        control.easeSet(control.default);
      } else {
        control.set(control.default);
      }
    }
  }

  randomize() {
    for(let key in this.controls) {
      this.controls[key].randomize();
    }
  }

  mutate() {
    for(let key in this.controls) {
      this.controls[key].mutate();
    }
  }

}

module.exports = VariaBoard;
