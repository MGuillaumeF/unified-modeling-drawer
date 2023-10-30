import { IProjectObject } from "./.model/ProjectObject";

export function add(projectObject: IProjectObject): void {
  if ("electronAPI" in window) {
    window.electronAPI.createModel(projectObject);
  } else if ("parent" in window) {
    (window as Window).parent.postMessage(
      {
        messageType: "add-project",
        project: projectObject
      },
      (window as Window).origin
    );
  }
}
export function update(projectObject: IProjectObject): void {
  if ("electronAPI" in window) {
    window.electronAPI.updateModel(projectObject);
  } else if ("parent" in window) {
    (window as Window).parent.postMessage(
      {
        messageType: "update-project",
        project: projectObject
      },
      (window as Window).origin
    );
  }
}
