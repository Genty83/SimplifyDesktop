const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  const maximizeBtn = document.getElementById('maximize-btn');
  const minimizeBtn = document.getElementById('minimize-btn');
  const closeBtn = document.getElementById('close-btn');

  minimizeBtn.addEventListener('click', () => {
    ipcRenderer.send('window-minimize');
  });

  maximizeBtn.addEventListener('click', () => {
    ipcRenderer.send('window-maximize');
  });

  closeBtn.addEventListener('click', () => {
    ipcRenderer.send('window-close');
  });

  // Listen for maximize and unmaximize events from the main process
  ipcRenderer.on('window-is-maximized', () => {
    maximizeBtn.querySelector('i').classList.remove('fa-square');
    maximizeBtn.querySelector('i').classList.add('fa-window-restore');
  });

  ipcRenderer.on('window-is-unmaximized', () => {
    maximizeBtn.querySelector('i').classList.remove('fa-window-restore');
    maximizeBtn.querySelector('i').classList.add('fa-square');
    
  });

  // Resize Explorer
  const resizeHandle = document.querySelector('.explorer-resizer');
  const explorer = document.querySelector('.explorer');

  let isResizing = false;

  resizeHandle.addEventListener('mousedown', (e) => {
    isResizing = true;
    document.body.style.cursor = 'col-resize';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;

    const x = e.pageX;
    const explorerRect = explorer.getBoundingClientRect();
    const width = x - explorerRect.left;

    explorer.style.width = `${width}px`;
  });

  document.addEventListener('mouseup', () => {
    isResizing = false;
    document.body.style.cursor = 'default';
  });

});
