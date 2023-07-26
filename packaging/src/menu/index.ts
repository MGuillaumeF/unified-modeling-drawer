import { BrowserWindow, app } from "electron";
import { TFunction } from "i18next";
import ModelObject, { IModelObject } from "src/.model/ModelObject";
import { getEditMenuTemplate } from "./edit";
import { getFileMenuTemplate } from "./file";
import { getHelpMenuTemplate } from "./help";
import { getViewMenuTemplate } from "./view";
import { getWindowMenuTemplate } from "./window";

export function getMenuTemplate(
  win: BrowserWindow,
  t: TFunction<"translation", undefined>,
  displayedModelUpdater: (
    win: BrowserWindow,
    t: TFunction<"translation", undefined>,
    modelObject: IModelObject
  ) => void,
  displayedModel?: ModelObject
): (Electron.MenuItemConstructorOptions | Electron.MenuItem)[] {
  const template: (Electron.MenuItemConstructorOptions | Electron.MenuItem)[] =
    [
      getFileMenuTemplate(win, t, displayedModelUpdater, displayedModel),
      getEditMenuTemplate(win, t),
      getViewMenuTemplate(win, t),
      getWindowMenuTemplate(win, t),
      getHelpMenuTemplate(win, t)
    ];
  if (process.platform === "darwin") {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: "about" },
        { type: "separator" },
        { role: "services", submenu: [] },
        { type: "separator" },
        { role: "hide" },
        { role: "hideOthers" },
        { role: "unhide" },
        { type: "separator" },
        { role: "quit" }
      ]
    });

    // // Edit menu
    // template[1].submenu.push(
    //   { type: "separator" },
    //   {
    //     label: "Speech",
    //     submenu: [{ role: "startspeaking" }, { role: "stopspeaking" }]
    //   }
    // );

    // // Window menu
    // template[3].submenu = [
    //   { role: "close" },
    //   { role: "minimize" },
    //   { role: "zoom" },
    //   { type: "separator" },
    //   { role: "front" }
    // ];
  }
  return template;
}
