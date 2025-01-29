// Explorer.js
export default class Explorer {
  constructor() {
    this.resizeHandle = document.querySelector('.explorer-resizer');
    this.explorer = document.querySelector('.explorer');
    this.isResizing = false;
    
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  init() {
    this.addEventListeners();
  }

  addEventListeners() {
    this.resizeHandle.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseDown() {
    this.isResizing = true;
    document.body.style.cursor = 'col-resize';
  }

  handleMouseMove(e) {
    if (!this.isResizing) return;

    const x = e.pageX;
    const explorerRect = this.explorer.getBoundingClientRect();
    const width = x - explorerRect.left;

    this.explorer.style.width = `${width}px`;
  }

  handleMouseUp() {
    this.isResizing = false;
    document.body.style.cursor = 'default';
  }
}
