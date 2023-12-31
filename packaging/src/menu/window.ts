import { BrowserWindow } from "electron";
import { t } from "i18next";

export function getWindowMenuTemplate(
  win: BrowserWindow
): Electron.MenuItemConstructorOptions | Electron.MenuItem {
  return {
    role: "window",
    label: t("MENU.WINDOW.LABEL"),
    submenu: [
      { role: "minimize", label: t("MENU.WINDOW.SUBMENU.MINIMIZE.LABEL") },
      { role: "close", label: t("MENU.WINDOW.SUBMENU.CLOSE.LABEL") }
    ]
  };
}
