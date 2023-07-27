import { BrowserWindow } from "electron";
import i18next, { t } from "i18next";

export function getViewMenuTemplate(
  win: BrowserWindow
): Electron.MenuItemConstructorOptions | Electron.MenuItem {
  return {
    label: t("MENU.VIEW.LABEL"),
    submenu: [
      { role: "reload", label: t("MENU.VIEW.SUBMENU.RELOAD.LABEL") },
      { role: "forceReload", label: t("MENU.VIEW.SUBMENU.FORCE_RELOAD.LABEL") },
      {
        role: "toggleDevTools",
        label: t("MENU.VIEW.SUBMENU.TOGGLE_DEV_TOOLS.LABEL")
      },
      { type: "separator" },
      { role: "resetZoom", label: t("MENU.VIEW.SUBMENU.RESET_ZOOM.LABEL") },
      { role: "zoomIn", label: t("MENU.VIEW.SUBMENU.ZOOM_IN.LABEL") },
      { role: "zoomOut", label: t("MENU.VIEW.SUBMENU.ZOOM_OUT.LABEL") },
      { type: "separator" },
      {
        role: "togglefullscreen",
        label: t("MENU.VIEW.SUBMENU.TOGGLE_FULL_SCREEN.LABEL")
      },
      { type: "separator" },
      {
        label: t("MENU.VIEW.SUBMENU.LANGUAGE.LABEL"),
        submenu: [
          {
            label: t("MENU.VIEW.SUBMENU.LANGUAGE.SUBMENU.FR.LABEL"),
            checked: i18next.language === "fr",
            type: "radio",
            click() {
              updateLanguage(win, "fr");
            }
          },
          {
            label: t("MENU.VIEW.SUBMENU.LANGUAGE.SUBMENU.EN.LABEL"),
            type: "radio",
            checked: i18next.language === "en",
            click() {
              updateLanguage(win, "en");
            }
          }
        ]
      }
    ]
  };
}

function updateLanguage(win: BrowserWindow, language: string): void {
  i18next
    .changeLanguage(language)
    .then((t: TFunction<"translation", undefined>) => {
      win.webContents.send("language", language);
    });
}
