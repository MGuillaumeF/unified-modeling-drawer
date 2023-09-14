import { BrowserWindow, dialog } from "electron";
import { readFileSync, writeFileSync } from "fs";
import { t } from "i18next";
import { Builder, Parser } from "xml2js";
import ProjectObject, { IProjectObject } from "../.model/ProjectObject";
import NewModelWindow from "../NewModelWindow/NewModelWindow";

/**
 * Function to create File Menu
 * @param win The Main BrowserWindow
 * @param t The translator function
 * @param displayedModel The ModelObject displayed currently on view
 * @returns The file menu
 */
export function getFileMenuTemplate(
  win: BrowserWindow,
  displayedProjectUpdater: (
    win: BrowserWindow,
    projectObject: IProjectObject
  ) => void,
  displayedProject?: ProjectObject
): Electron.MenuItemConstructorOptions | Electron.MenuItem {
  return {
    label: t("MENU.FILE.LABEL"),
    submenu: [
      {
        label: t("MENU.FILE.SUBMENU.NEW.LABEL"),
        accelerator: "CmdOrCtrl+N",
        click() {
          NewModelWindow(win);
        }
      },
      {
        label: t("MENU.FILE.SUBMENU.OPEN.LABEL"),
        accelerator: "CmdOrCtrl+O",
        // this is the main bit hijack the click event
        click() {
          // construct the select file dialog
          dialog
            .showOpenDialog({
              properties: ["openFile"],
              filters: [{ name: "model", extensions: ["xml"] }]
            })
            .then(function (fileObj: Electron.OpenDialogReturnValue) {
              // the fileObj has two props
              if (!fileObj.canceled) {
                const { filePaths } = fileObj;
                const modelPath = filePaths.shift();
                if (modelPath) {
                  let parser = new Parser();
                  const xmlContent = readFileSync(modelPath).toString();
                  parser.parseString(
                    xmlContent,
                    function (error: Error | null, result: any): void {
                      // convert to ModelObject here before send to html application
                      const projectObject = ProjectObject.parse(result.project);
                      displayedProjectUpdater(win, projectObject);
                      win.webContents.send("file-open", projectObject);
                    }
                  );
                }
              }
            })
            // should always handle the error yourself, later Electron release might crash if you don't
            .catch(function (err) {
              console.error(err);
            });
        }
      },
      {
        label: t("MENU.FILE.SUBMENU.SAVE.LABEL"),
        accelerator: "CmdOrCtrl+S",
        enabled: Boolean(displayedProject),
        click() {
          if (displayedProject) {
            const data = displayedProject.toObject();
            if (data.sourcePath !== undefined) {
              save(data as Required<IProjectObject>);
            } else {
              saveAs(displayedProject);
            }
          }
        }
      },
      {
        label: t("MENU.FILE.SUBMENU.SAVE_AS.LABEL"),
        accelerator: "CmdOrCtrl+Alt+S",
        enabled: Boolean(displayedProject),
        click() {
          if (displayedProject) {
            saveAs(displayedProject);
          }
        }
      },
      {
        label: t("MENU.FILE.SUBMENU.EXPORT_AS.LABEL"),
        enabled: Boolean(displayedProject)
      },
      {
        label: t("MENU.FILE.SUBMENU.EXIT.LABEL"),
        accelerator: "Alt+F4"
      }
    ]
  };
}

/**
 * Function to save file with custom path
 * @param projectToSave The project to Save
 */
function saveAs(projectToSave: ProjectObject) {
  // construct the save file dialog
  dialog
    .showSaveDialog({
      filters: [{ name: "model", extensions: ["xml"] }]
    })
    .then(function (fileObj: Electron.SaveDialogReturnValue) {
      const { filePath } = fileObj;
      if (!fileObj.canceled && filePath) {
        projectToSave.sourcePath = filePath;
        const projectToSaveFilled: Required<IProjectObject> = {
          ...projectToSave.toObject(),
          sourcePath: filePath
        };
        save(projectToSaveFilled);
      }
    })
    // should always handle the error yourself, later Electron release might crash if you don't
    .catch(function (err) {
      console.error(err);
    });
}

/**
 * Function to save file with custom path
 * @param projectToSave The project to Save
 */
function save(projectToSave: Required<IProjectObject>) {
  projectToSave.lastUpdateDate = new Date();
  const builder = new Builder({ rootName: "model" });
  const obj = new ProjectObject(projectToSave).toPrint();
  // remove sourcePath before write on disk
  // convert all dates to timestamp before write on disk
  writeFileSync(projectToSave.sourcePath, builder.buildObject(obj));
}
