const { ipcRenderer } = require('electron');

// Listen for mousewheel event to detect zoom requests
window.addEventListener('wheel', (event) => {
  if (event.ctrlKey) {
    const zoomFactor = window.webContents.getZoomFactor();
    if (event.deltaY < 0) {
      window.webContents.setZoomFactor(zoomFactor + 0.1);
    } else if (event.deltaY > 0) {
      window.webContents.setZoomFactor(zoomFactor - 0.1);
    }
  }
});