import { BrowserWindow, dialog } from "electron";
import { readFileSync, writeFileSync } from "fs";
import { t } from "i18next";
import { Builder, Parser } from "xml2js";
import { IAttributeModelObject } from "../.model/AttributeModelObject";
import { IBooleanAttributeModelObject } from "../.model/BooleanAttributeModelObject";
import { IClassModelObject } from "../.model/ClassModelObject";
import { IDateAttributeModelObject } from "../.model/DateAttributeModelObject";
import ModelObject, { IModelObject } from "../.model/ModelObject";
import { INumberAttributeModelObject } from "../.model/NumberAttributeModelObject";
import { IStringAttributeModelObject } from "../.model/StringAttributeModelObject";
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
  displayedModelUpdater: (
    win: BrowserWindow,
    modelObject: IModelObject
  ) => void,
  displayedModel?: ModelObject
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
                      // TODO convert to ModelObject here before send to html application
                      const modelObject: IModelObject = {
                        name: result.model.name[0],
                        version: result.model.version[0],
                        description: result.model.description[0],
                        lastUpdateDate: new Date(
                          Number(result.model.lastUpdateDate)
                        ),
                        creationDate: new Date(
                          Number(result.model.creationDate)
                        ),
                        classModelObjects: result.model.class.map(
                          (classItem: any): IClassModelObject => ({
                            name: classItem.$.name,
                            isAbstract: classItem.$.abstract === "true",
                            attributes: classItem.attribute.map(
                              (
                                attr: any
                              ):
                                | IAttributeModelObject
                                | IStringAttributeModelObject
                                | IBooleanAttributeModelObject
                                | INumberAttributeModelObject
                                | IDateAttributeModelObject => {
                                let mapped:
                                  | IAttributeModelObject
                                  | IStringAttributeModelObject
                                  | IBooleanAttributeModelObject
                                  | INumberAttributeModelObject
                                  | IDateAttributeModelObject = {
                                  name: attr.$.name,
                                  type: attr.$.type,
                                  mandatory: attr.$.mandatory === "true",
                                  unique: attr.$.unique === "true",
                                  visibility: attr.$.visibility,
                                  defaultValue: attr.$.default_value
                                };

                                if (attr.$.type === "string") {
                                  mapped = {
                                    ...mapped,
                                    minLength: attr.$.min_length,
                                    maxLength: attr.$.max_length
                                  };
                                  if (attr.$.pattern) {
                                    mapped.pattern = new RegExp(attr.$.pattern);
                                  }
                                } else if (attr.$.type === "boolean") {
                                  mapped = {
                                    ...mapped
                                  };
                                } else if (
                                  [
                                    "int8",
                                    "uint8",
                                    "int16",
                                    "uint16",
                                    "int32",
                                    "uint32",
                                    "int64",
                                    "uint64",
                                    "double",
                                    "number"
                                  ].includes(attr.$.type)
                                ) {
                                  mapped = {
                                    ...mapped,
                                    min: attr.$.min,
                                    max: attr.$.max
                                  };
                                } else if (attr.$.type === "date") {
                                  const part: Partial<IDateAttributeModelObject> =
                                    {};
                                  if (attr.$.min) {
                                    part.min = new Date(attr.$.min);
                                  }
                                  if (attr.$.max) {
                                    part.max = new Date(attr.$.max);
                                  }
                                  mapped = {
                                    ...mapped,
                                    ...part
                                  };
                                }

                                return mapped;
                              }
                            )
                          })
                        )
                      };
                      displayedModelUpdater(win, modelObject);
                      win.webContents.send("file-open", modelObject);
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
        enabled: Boolean(displayedModel),
        click() {
          if (displayedModel) {
            const data = displayedModel.toObject();
            if (data.sourcePath !== undefined) {
              save(data as Required<IModelObject>);
            } else {
              saveAs(displayedModel);
            }
          }
        }
      },
      {
        label: t("MENU.FILE.SUBMENU.SAVE_AS.LABEL"),
        accelerator: "CmdOrCtrl+Alt+S",
        enabled: Boolean(displayedModel),
        click() {
          if (displayedModel) {
            saveAs(displayedModel);
          }
        }
      },
      {
        label: t("MENU.FILE.SUBMENU.EXPORT_AS.LABEL"),
        enabled: Boolean(displayedModel)
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
 * @param modelToSave The model to Save
 */
function saveAs(modelToSave: ModelObject) {
  // construct the save file dialog
  dialog
    .showSaveDialog({
      filters: [{ name: "model", extensions: ["xml"] }]
    })
    .then(function (fileObj: Electron.SaveDialogReturnValue) {
      const { filePath } = fileObj;
      if (!fileObj.canceled && filePath) {
        modelToSave.sourcePath = filePath;
        const modelToSaveFilled: Required<IModelObject> = {
          ...modelToSave.toObject(),
          sourcePath: filePath
        };
        save(modelToSaveFilled);
      }
    })
    // should always handle the error yourself, later Electron release might crash if you don't
    .catch(function (err) {
      console.error(err);
    });
}

/**
 * Function to save file with custom path
 * @param modelToSave The model to Save
 */
function save(modelToSave: Required<IModelObject>) {
  modelToSave.lastUpdateDate = new Date();
  const builder = new Builder({ rootName: "model" });
  const obj = new ModelObject(modelToSave).toPrint();
  // remove sourcePath before write on disk
  // convert all dates to timestamp before write on disk
  writeFileSync(modelToSave.sourcePath, builder.buildObject(obj));
}
