// Imports
import {
  eventHandler,
  saveLocalSettings,
  loadLocalSettings,
} from "../utils/utils.js";

export default class Explorer {
  constructor() {
    this.resizeHandle = document.querySelector(".explorer-resizer");
    this.explorer = document.querySelector(".explorer");
    this.isResizing = false;

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

    // Load saved width
    this.loadSettings();

    this.init();
  }

  init() {
    this.addEventListeners();
  }

  addEventListeners() {
    eventHandler("mousedown", ".explorer-resizer", this.handleMouseDown);
    eventHandler("mousemove", "body", this.handleMouseMove);
    eventHandler("mouseup", "body", this.handleMouseUp);
  }

  handleMouseDown(event) {
    this.isResizing = true;
    document.body.style.cursor = "col-resize";
  }

  handleMouseMove(event) {
    if (!this.isResizing) return;

    const x = event.pageX;
    const explorerRect = this.explorer.getBoundingClientRect();
    const width = x - explorerRect.left;

    this.explorer.style.width = `${width}px`;
  }

  handleMouseUp() {
    if (this.isResizing) {
      this.isResizing = false;
      document.body.style.cursor = "default";
      const newWidth = this.explorer.style.width;
      saveLocalSettings("explorer", "width", newWidth);
    }
  }

  /**
   * Load saved settings for the explorer.
   */
  loadSettings() {
    const width = loadLocalSettings("explorer", "width");
    if (width) {
      this.explorer.style.width = width;
      console.log("Loaded width:", width);
    }
  }
}
