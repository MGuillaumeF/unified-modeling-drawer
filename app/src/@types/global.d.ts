import { IpcRendererEvent } from "electron";
import ModelObject, { IModelObject } from "./.model/ModelObject";

interface ElectronAPI {
  createModel: (model: ModelObject) => void;
  handleChangeLanguage: (
    callback: (event: IpcRendererEvent, value: string) => void
  ) => void;
  handleOpenFile: (
    callback: (event: IpcRendererEvent, value: IModelObject) => void
  ) => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
