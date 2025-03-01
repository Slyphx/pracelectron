const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const { screen } = require('electron');
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const win = new BrowserWindow({
    width,
    height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  const view1 = new BrowserView({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  const view2 = new BrowserView({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.setBrowserView(view1);
  win.addBrowserView(view2);

  // Initial Split Size
  let dividerX = width / 2;

  view1.setBounds({ x: 0, y: 0, width: dividerX, height });
  view1.webContents.loadURL("https://youtube.com");

  view2.setBounds({ x: dividerX + 10, y: 0, width: width - dividerX - 10, height });
  view2.webContents.loadURL("https://vscode.dev");

  win.loadURL(`file://${__dirname}/resizer.html`);

  ipcMain.on('resize', (event, x) => {
    dividerX = x;
    view1.setBounds({ x: 0, y: 0, width: dividerX, height });
    view2.setBounds({ x: dividerX + 10, y: 0, width: width - dividerX - 10, height });
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
