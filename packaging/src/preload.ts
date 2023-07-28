import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";
import ModelObject from "./.model/ModelObject";

contextBridge.exposeInMainWorld("electronAPI", {
  handleOpenFile: (
    callback: (event: IpcRendererEvent, ...args: any[]) => void
  ): void => {
    ipcRenderer.on("file-open", callback);
  },
  handleChangeLanguage: (
    callback: (event: IpcRendererEvent, ...args: any[]) => void
  ): void => {
    ipcRenderer.on("language", callback);
  },
  createModel: (model: ModelObject): void =>
    ipcRenderer.send("create-model", model)
});
