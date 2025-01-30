// Imports
import { eventHandler, loadLocalSettings, saveLocalSettings } from "../utils/utils.js";

/**
 * Class representing the title bar of an Electron application.
 */
export default class TitleBar {
  /**
   * Creates an instance of TitleBar.
   */
  constructor() {
    this.titleBar = document.querySelector(".titlebar");
    this.maximizeBtn = document.getElementById("maximize-btn");
    this.minimizeBtn = document.getElementById("minimize-btn");
    this.closeBtn = document.getElementById("close-btn");

    // New buttons
    this.explorerToggleBtn = document.getElementById("explorer-toggle-btn");
    this.bottomMenuToggleBtn = document.getElementById("bottom-menu-toggle-btn");
    this.rightMenuToggleBtn = document.getElementById("right-menu-toggle-btn");

    // Containers
    this.explorer = document.querySelector(".explorer");
    this.bottomMenu = document.querySelector(".bottom-menu");
    this.rightMenu = document.querySelector(".right-menu");

    // Initialize debounce flag
    this.isMaximizing = false;

    // Load settings
    this.loadSettings();
  }

  /**
   * Initializes the TitleBar event listeners and window state handlers.
   */
  init() {
    eventHandler("click", "#minimize-btn", this.minimizeWindow.bind(this));
    eventHandler("click", "#maximize-btn", this.toggleMaximizeWindow.bind(this));
    eventHandler("click", "#close-btn", this.closeWindow.bind(this));
    eventHandler("click", "#explorer-toggle-btn", this.toggleExplorer.bind(this));
    eventHandler("click", "#bottom-menu-toggle-btn", this.toggleBottomMenu.bind(this));
    eventHandler("click", "#right-menu-toggle-btn", this.toggleRightMenu.bind(this));

    // Listen for maximize and unmaximize events from the main process
    window.api.on("window-is-maximized", this.updateMaximizeButton.bind(this, true));
    window.api.on("window-is-unmaximized", this.updateMaximizeButton.bind(this, false));
  }

  /**
   * Sends a request to the main process to minimize the window.
   */
  minimizeWindow() {
    try {
      window.api.send("window-minimize");
    } catch (error) {
      console.error("Failed to minimize window:", error);
    }
  }

  /**
   * Toggles the maximize or restore state of the window.
   */
  toggleMaximizeWindow() {
    if (!this.isMaximizing) {
      this.isMaximizing = true;
      try {
        window.api.send("window-maximize");
      } catch (error) {
        console.error("Failed to maximize window:", error);
      } finally {
        setTimeout(() => {
          this.isMaximizing = false;
        }, 300); // Adjust debounce delay as needed
      }
    }
  }

  /**
   * Sends a request to the main process to close the window.
   */
  closeWindow() {
    try {
      window.api.send("window-close");
    } catch (error) {
      console.error("Failed to close window:", error);
    }
  }

  /**
   * Toggles the visibility of the explorer.
   */
  toggleExplorer() {
    this.explorer.classList.toggle("hide");
    const isHidden = this.explorer.classList.contains("hide");
    saveLocalSettings("explorer", "hidden", isHidden ? "true" : "false");
  }

  /**
   * Toggles the visibility of the bottom menu.
   */
  toggleBottomMenu() {
    this.bottomMenu.classList.toggle("hide");
    const isHidden = this.bottomMenu.classList.contains("hide");
    saveLocalSettings("bottom-menu", "hidden", isHidden ? "true" : "false");
  }

  /**
   * Toggles the visibility of the right menu.
   */
  toggleRightMenu() {
    this.rightMenu.classList.toggle("hide");
    const isHidden = this.rightMenu.classList.contains("hide");
    saveLocalSettings("right-menu", "hidden", isHidden ? "true" : "false");
  }

  /**
   * Updates the maximize button icon based on the window's maximize state.
   * @param {boolean} isMaximized - True if the window is maximized, false if unmaximized.
   */
  updateMaximizeButton(isMaximized) {
    try {
      if (isMaximized) {
        this.maximizeBtn.querySelector("i").classList.remove("fa-square");
        this.maximizeBtn.querySelector("i").classList.add("fa-window-restore");
      } else {
        this.maximizeBtn.querySelector("i").classList.remove("fa-window-restore");
        this.maximizeBtn.querySelector("i").classList.add("fa-square");
      }
    } catch (error) {
      console.error("Failed to update maximize button:", error);
    }
  }

  /**
   * Load saved settings for the title bar.
   */
  loadSettings() {
    const explorerHidden = loadLocalSettings("explorer", "hidden");
    if (explorerHidden === "true") {
      this.explorer.classList.add("hide");
    }

    const bottomMenuHidden = loadLocalSettings("bottom-menu", "hidden");
    if (bottomMenuHidden === "true") {
      this.bottomMenu.classList.add("hide");
    }

    const rightMenuHidden = loadLocalSettings("right-menu", "hidden");
    if (rightMenuHidden === "true") {
      this.rightMenu.classList.add("hide");
    }

    console.log("Settings loaded.");
  }
}
