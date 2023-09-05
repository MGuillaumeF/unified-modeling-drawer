import { IpcRendererEvent } from "electron";
import ModelObject, { IModelObject } from "./.model/ModelObject";
import { IViewObject } from "./.model/ViewObject";

interface ElectronAPI {
  createModel: (model: ModelObject) => void;
  handleChangeLanguage: (
    callback: (event: IpcRendererEvent, value: string) => void
  ) => void;
  handleOpenFile: (
    callback: (
      event: IpcRendererEvent,
      modelObject: IModelObject,
      viewObject: IViewObject
    ) => void
  ) => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
