const FutzButton = require('./futz-button');
const FutzRangeControl = require('./futz-range-control');

class Futz {

  /**
   * Create a Futz control panel
   *
   * @param {object} config - Configuration object
   * @param {object|string} [config.container=document.body] - DOM element or CSS selector
   * @param {string} [config.title="Control Panel"] - Title of the panel
   *
   * @requires {@linkcode FutzButton}
   * @requires {@linkcode FutzRangeControl}
   */

  constructor(config) {
    this.namespace = 'futz';
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
    this.title = config.title !== undefined ? config.title : 'Futz';
    
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
    this.dom.title = document.createElement('h1');
    this.dom.title.classList.add(`${this.namespace}-title`);
    this.dom.title.textContent = this.title;
    this.dom.panel.appendChild(this.dom.title);
    
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
   */

  addButton(config) {
    for(let key in this.buttons) {
       if(config.id === this.buttons[key].id) {
         console.error(`Futz: A button with an id of '${config.id}' is already in use.`); 
         return;
       }
    }
    this.buttons[config.id] = new FutzButton(this, config);
  }

  addControl(config) {
    let control = null;

    for(let key in this.controls) {
       if(config.id === this.controls[key].id) {
         console.error(`Futz: A control with an id of '${config.id}' is already in use.`); 
         return;
       }
    }

    switch(config.type) {
      case 'range':
        control = new FutzRangeControl(this, config);
        break;
    }

    if(control) {
      this.controls[control.id] = control; 
    }
  }

  get(id) {
    return this.controls[id].value;
  }

  randomize() {
    for(let key in this.controls) {
      let control = this.controls[key];
      control.settled = false;
      control.valueTarget = this.rand(control.min, control.max);
      cancelAnimationFrame(this.raf);
      this.update();
    }
  }

  mutate() {
    for(let key in this.controls) {
      let control = this.controls[key];
      let size = (control.max - control.min) / 15;
      control.settled = false;
      if(control.value <= control.min) {
        control.valueTarget = this.rand(control.step, control.min + size);
      } else if(control.value >= control.max) {
        control.valueTarget = this.rand(control.max - size, control.max - control.step);
      } else {
        control.valueTarget = control.value + this.rand(-size, size);
      }
      cancelAnimationFrame(this.raf);
      this.update();
    }
  }

  rand(min, max, ease) {
    if(max === undefined) {
      max = min;
      min = 0;
    }
    let random = Math.random();
    return random * (max - min) + min;
  }

  clamp(val, min, max) {
    return Math.max(Math.min(val, max), min);
  }

  map(val, inMin, inMax, outMin, outMax) {
    return ((outMax - outMin) * ((val - inMin) / (inMax - inMin))) + outMin;
  }

  roundToNearestInterval(value, interval) {
    return Math.round(value / interval) * interval;
  }

}

module.exports = Futz;
