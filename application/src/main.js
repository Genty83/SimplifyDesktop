const { app, BrowserWindow } = require('electron');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),  // Preload script
      contextIsolation: true,  // Context Isolation
      enableRemoteModule: false,  // Disable remote module
      nodeIntegration: false,  // Disable Node integration
      webSecurity: true,  // Enable web security
      sandbox: true  // Enable sandboxing
    }
  });

  const template = fs.readFileSync(path.join(__dirname, 'base.handlebars'), 'utf8');
  const compiledTemplate = handlebars.compile(template);
  const renderedHtml = compiledTemplate({ title: 'My Secure Electron App' });

  fs.writeFileSync(path.join(__dirname, 'index.html'), renderedHtml);
  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
