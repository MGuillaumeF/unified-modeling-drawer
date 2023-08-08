import { IpcRendererEvent } from "electron";
import ModelObject from "./.model/ModelObject";

interface ElectronAPI {
  createModel: (model: ModelObject) => void;
  handleChangeLanguage: (
    callback: (event: IpcRendererEvent, value: string) => void
  ) => void;
  handleOpenFile: (
    callback: (event: IpcRendererEvent, ...args: any[]) => void
  ) => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
