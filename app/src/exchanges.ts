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
      window.origin
    );
  }
}
