// main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const cron = require('node-cron');

let mainWindow;

// Disable hardware acceleration
app.disableHardwareAcceleration();

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadURL('https://digital.lia.co.id/');

  // Open DevTools (comment out for production)
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  // Schedule cache clearance
  cron.schedule('0 0 * * *', () => {
    mainWindow.webContents.session.clearCache();
    console.log('Cache cleared');
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('new-tab', (event, url) => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  win.loadURL(url);
});