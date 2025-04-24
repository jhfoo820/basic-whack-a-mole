const { app, BrowserWindow } = require('electron');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 900,
    resizable: true,
    webPreferences: {
      nodeIntegration: false,  // Set to false for production, use IPC instead
      preload: path.join(__dirname, 'preload.js')  // Use a preload script for safe Node.js access
    },
  });

  win.loadFile('index.html');

  win.setMenu(null); // Remove default menu bar
  win.setMinimumSize(600, 400);
  win.setMaximumSize(1000, 1200);  // Optional max size
  win.center();  // Centers the window

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
