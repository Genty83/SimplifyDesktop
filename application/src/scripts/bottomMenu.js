// Imports
import {
  eventHandler,
  saveLocalSettings,
  loadLocalSettings,
} from "../utils/utils.js";

export default class BottomMenu {
  constructor() {
    this.bottomMenu = document.querySelector(".bottom-menu");
    this.resizer = document.querySelector(".bottom-menu-resizer");

    // Check if elements are found
    if (!this.bottomMenu) {
      console.error("Bottom menu element not found.");
      return;
    }
    if (!this.resizer) {
      console.error("Bottom menu resizer element not found.");
      return;
    }

    // Track the initial mouse position and element height
    this.startY = 0;
    this.startHeight = 0;

    // Load saved height
    this.loadSettings();

    this.init();
  }

  /**
   * Initializes the BottomMenu event listeners.
   */
  init() {
    eventHandler(
      "mousedown",
      ".bottom-menu-resizer",
      this.onMouseDown.bind(this)
    );
    eventHandler("mousemove", "body", this.onMouseMove.bind(this));
    eventHandler("mouseup", "body", this.onMouseUp.bind(this));

    console.log("Event listeners initialized.");
  }

  /**
   * Handles the mousedown event on the resizer.
   * @param {Event} event - The event object.
   */
  onMouseDown(event) {
    this.startY = event.clientY;
    this.startHeight = parseInt(
      document.defaultView.getComputedStyle(this.bottomMenu).height,
      10
    );
    document.body.style.cursor = "ns-resize"; // Change cursor to resize
    this.isResizing = true;

    console.log(
      "Mouse down event. Start Y:",
      this.startY,
      "Start Height:",
      this.startHeight
    );
  }

  /**
   * Handles the mousemove event to resize the bottom menu.
   * @param {Event} event - The event object.
   */
  onMouseMove(event) {
    if (this.isResizing) {
      const newHeight = this.startHeight + (this.startY - event.clientY);
      this.bottomMenu.style.height = `${newHeight}px`;
    }
  }

  /**
   * Handles the mouseup event to stop resizing and save settings.
   * @param {Event} event - The event object.
   */
  onMouseUp() {
    if (this.isResizing) {
      this.isResizing = false;
      document.body.style.cursor = ""; // Reset cursor
      const newHeight = this.bottomMenu.style.height;
      saveLocalSettings("bottom-menu", "height", newHeight);
    }
  }

  /**
   * Load saved settings for the bottom menu.
   */
  loadSettings() {
    const height = loadLocalSettings("bottom-menu", "height");
    if (height) {
      this.bottomMenu.style.height = height;
    }
  }
}
