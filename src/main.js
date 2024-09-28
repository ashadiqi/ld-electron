const { app, BrowserWindow, Menu, ipcMain, session } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, '../preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    icon: path.join(__dirname, '../assets/icon.ico'),
  });

  // Load the LIA website
  mainWindow.loadURL('https://digital.lia.co.id/');

  // Handle zoom with Ctrl + Scroll
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.setZoomFactor(1);
  });

  // Enable tab support
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    const newWindow = new BrowserWindow({
      width: 1280,
      height: 800,
      webPreferences: {
        preload: path.join(__dirname, '../preload.js'),
        nodeIntegration: false,
        contextIsolation: true,
      },
      icon: path.join(__dirname, '../assets/icon.ico'),
    });
    newWindow.loadURL(url);
    return { action: 'allow' };
  });
}

// Auto-clear cache on start
app.on('ready', () => {
  session.defaultSession.clearCache().then(() => {
    console.log('Cache cleared on startup.');
  });

  createWindow();
});

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
