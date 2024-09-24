// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  newTab: (url) => ipcRenderer.send('new-tab', url),
});

// renderer.js
document.addEventListener('DOMContentLoaded', () => {
  const newTabButton = document.createElement('button');
  newTabButton.textContent = 'New Tab';
  newTabButton.addEventListener('click', () => {
    window.electronAPI.newTab('https://digital.lia.co.id/');
  });
  document.body.appendChild(newTabButton);
});