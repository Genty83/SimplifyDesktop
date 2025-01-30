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
});