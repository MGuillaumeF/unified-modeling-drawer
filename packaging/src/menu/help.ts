import { BrowserWindow } from "electron";
import { TFunction } from "i18next";

export function getHelpMenuTemplate(
  win: BrowserWindow,
  t: TFunction<"translation", undefined>
): Electron.MenuItemConstructorOptions | Electron.MenuItem {
  return {
    role: "help",
    label: t("MENU.HELP.LABEL"),
    submenu: [
      {
        label: t("MENU.HELP.SUBMENU.CONTACT.LABEL"),
        click() {
          require("electron").shell.openExternal(
            "mailto:mguillaumef@gmail.com"
          );
        }
      },
      {
        label: t("MENU.HELP.SUBMENU.DOCUMENTATION.LABEL")
      },
      { type: "separator" },
      {
        role: "about",
        label: t("MENU.HELP.SUBMENU.ABOUT.LABEL")
      }
    ]
  };
}
