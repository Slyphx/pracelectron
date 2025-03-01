const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  resize: (x) => ipcRenderer.send('resize', x)
});
