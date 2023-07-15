const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  handleOpenFile: (callback) => ipcRenderer.on("file-open", callback)
});
