class FutzButton {
  
  constructor(futz, config) {
    this.futz = futz;
    this.id = config.id;
    this.title = config.title;
    this.callback = config.callback;
    
    this.createDOM();
    this.listen();
  }
  
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
  
  listen() {
    this.dom.button.addEventListener('click', (e) => this.onButtonClick(e));
  }
  
  onButtonClick(e) {
    this.callback(); 
  }
  
}

module.exports = FutzButton
