const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');

function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 700,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Adjust the path to preload.js
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
      webSecurity: true,
      sandbox: true,
    },
  });

  win.on('maximize', () => {
    win.webContents.send('window-is-maximized');
  });

  win.on('unmaximize', () => {
    win.webContents.send('window-is-unmaximized');
  });

  // Add theme support

  const partialsDir = path.join(__dirname, '..', 'templates', 'partials');
  if (fs.existsSync(partialsDir)) {
    const partials = fs.readdirSync(partialsDir);
    partials.forEach((file) => {
      const partialName = path.basename(file, '.handlebars');
      const partialTemplate = fs.readFileSync(path.join(partialsDir, file), 'utf8');
      handlebars.registerPartial(partialName, partialTemplate);
    });
  } else {
    console.warn('Partials directory does not exist');
  }

  const templatePath = path.join(__dirname, '..', 'templates', 'base.handlebars');
  if (fs.existsSync(templatePath)) {
    const template = fs.readFileSync(templatePath, 'utf8');
    const compiledTemplate = handlebars.compile(template);
    const renderedHtml = compiledTemplate({ title: 'My Secure Electron App' });

    const outputPath = path.join(__dirname, 'index.html');
    fs.writeFileSync(outputPath, renderedHtml);
    win.loadFile(outputPath);
  } else {
    console.error('Template file does not exist:', templatePath);
  }

  ipcMain.on('window-minimize', () => win.minimize());
  ipcMain.on('window-maximize', () => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });
  ipcMain.on('window-close', () => win.close());

  // Handle theme request and send theme data to renderer
  ipcMain.on('request-theme', (event) => {
    const themePath = path.join(__dirname, 'themes', 'defaultLight.json');
    fs.readFile(themePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading theme JSON file:', err);
        return;
      }

      try {
        const theme = JSON.parse(data);
        event.sender.send('apply-theme', theme);
      } catch (parseError) {
        console.error('Error parsing theme JSON data:', parseError);
      }
    });
  });
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
