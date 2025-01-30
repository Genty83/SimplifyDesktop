import Explorer from "./scripts/explorer.js";
import TitleBar from "./scripts/titlebar.js";
import BottomMenu from "./scripts/bottomMenu.js";

document.addEventListener('DOMContentLoaded', () => {
  // Initialize TitleBar
  const titleBar = new TitleBar();
  titleBar.init();

  // Initialize Explorer
  const explorer = new Explorer();
  explorer.init();

  // Initialize BottomMenu
  const bottomMenu = new BottomMenu();
  bottomMenu.init();

  // Request and apply the theme
  window.api.send('request-theme');

  // Listen for theme update from the main process
  window.api.on('apply-theme', (theme) => {
    const root = document.documentElement;
    for (const [key, value] of Object.entries(theme)) {
      root.style.setProperty(`--${key}`, value);
    }
    console.log('Theme applied successfully.');
  });
});
