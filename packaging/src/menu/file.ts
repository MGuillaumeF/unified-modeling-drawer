import { BrowserWindow, dialog } from "electron";
import { readFileSync } from "fs";
import { TFunction } from "i18next";
import { Parser } from "xml2js";

export function getFileMenuTemplate(
  win: BrowserWindow,
  t: TFunction<"translation", undefined>
): Electron.MenuItemConstructorOptions | Electron.MenuItem {
  return {
    label: t("MENU.FILE.LABEL"),
    submenu: [
      { label: t("MENU.FILE.SUBMENU.NEW.LABEL"), accelerator: "CmdOrCtrl+N" },
      {
        label: t("MENU.FILE.SUBMENU.OPEN.LABEL"),
        accelerator: "CmdOrCtrl+O",
        // this is the main bit hijack the click event
        click() {
          // construct the select file dialog
          dialog
            .showOpenDialog({
              properties: ["openFile"]
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
                      win.webContents.send("file-open", result);
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
      { label: t("MENU.FILE.SUBMENU.SAVE.LABEL"), accelerator: "CmdOrCtrl+S" },
      {
        label: t("MENU.FILE.SUBMENU.SAVE_AS.LABEL"),
        accelerator: "CmdOrCtrl+Alt+S"
      },
      {
        label: t("MENU.FILE.SUBMENU.EXPORT_AS.LABEL")
      },
      {
        label: t("MENU.FILE.SUBMENU.EXIT.LABEL"),
        accelerator: "Alt+F4"
      }
    ]
  };
}
