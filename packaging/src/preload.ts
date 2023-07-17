import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  handleOpenFile: (
    callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void
  ) => ipcRenderer.on("file-open", callback),
  handleChangeLanguage: (
    callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void
  ) => ipcRenderer.on("language", callback)
});
