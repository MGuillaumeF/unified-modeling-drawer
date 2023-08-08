import { BrowserWindow } from "electron";
import { t } from "i18next";

export function getEditMenuTemplate(
  win: BrowserWindow
): Electron.MenuItemConstructorOptions | Electron.MenuItem {
  return {
    label: t("MENU.EDIT.LABEL"),
    submenu: [
      {
        role: "undo",
        label: t("MENU.EDIT.SUBMENU.UNDO.LABEL"),
        accelerator: "CmdOrCtrl+Z"
      },
      {
        role: "redo",
        label: t("MENU.EDIT.SUBMENU.REDO.LABEL"),
        accelerator: "CmdOrCtrl+Y"
      },
      { type: "separator" },
      {
        role: "cut",
        label: t("MENU.EDIT.SUBMENU.CUT.LABEL"),
        accelerator: "CmdOrCtrl+X"
      },
      {
        role: "copy",
        label: t("MENU.EDIT.SUBMENU.COPY.LABEL"),
        accelerator: "CmdOrCtrl+C"
      },
      {
        role: "paste",
        label: t("MENU.EDIT.SUBMENU.PASTE.LABEL"),
        accelerator: "CmdOrCtrl+V"
      },
      // {role: 'pasteandmatchstyle'},
      { role: "delete", label: t("MENU.EDIT.SUBMENU.DELETE.LABEL") },
      {
        role: "selectAll",
        label: t("MENU.EDIT.SUBMENU.SELECT_ALL.LABEL"),
        accelerator: "CmdOrCtrl+A"
      }
    ]
  };
}
