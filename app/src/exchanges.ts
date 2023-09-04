import { IModelObject } from "./.model/ModelObject";

export function add(modelObject: IModelObject): void {
  if ("electronAPI" in window) {
    alert("a");
    window.electronAPI.createModel(modelObject);
  } else if ("parent" in window) {
    (window as Window).parent.postMessage({
      messageType: "add-project",
      project: modelObject
    });
  }
}
