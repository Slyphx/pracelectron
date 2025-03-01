const { app, BrowserWindow, BrowserView } = require('electron');

function createWindow() {
  // Get screen size
  const { screen } = require('electron');
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  // Create main window
  const win = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // Left Side (YouTube)
  const view1 = new BrowserView({
    webPreferences: {
      webSecurity: false,
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  win.setBrowserView(view1);
  view1.setBounds({ x: 0, y: 0, width: width / 2, height: height });
  view1.webContents.loadURL("https://youtube.com");

  // Right Side (Google)
  const view2 = new BrowserView({
    webPreferences: {
      webSecurity: false,
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  win.addBrowserView(view2);
  view2.setBounds({ x: width / 2, y: 0, width: width / 2, height: height });
  view2.webContents.loadURL("https://vscode.dev/");

  // Optional: Focus on the first view initially
  win.setTopBrowserView(view1);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
