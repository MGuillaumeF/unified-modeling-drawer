import { contextBridge, ipcRenderer } from "electron";
import ModelObject from "./.model/ModelObject";

contextBridge.exposeInMainWorld("electronAPI", {
  handleOpenFile: (
    callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void
  ) => ipcRenderer.on("file-open", callback),
  handleChangeLanguage: (
    callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void
  ) => ipcRenderer.on("language", callback),
  createModel: (model: ModelObject) => ipcRenderer.send("create-model", model)
});
