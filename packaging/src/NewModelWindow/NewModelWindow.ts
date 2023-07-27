import { BrowserWindow, ipcMain } from "electron";
import { t } from "i18next";
import { join as pathJoin } from "path";

export default function NewModelWindow(
  parent: BrowserWindow
): void {
  // Création de la fenêtre navigateur Chromium
  const win = new BrowserWindow({
    modal: true,
    title: t("MENU.FILE.SUBMENU.NEW.WINDOW.TITLE"),
    resizable: false,
    height: 300,
    width: 400,
    show: false,
    minimizable: false,
    maximizable: false,
    parent,
    webPreferences: {
      preload: pathJoin(__dirname, "../preload.js")
    }
  });
  win.removeMenu();
  // chargement de l'application SPA
  win.loadURL("http://localhost:3000/model/new");

  win.on("page-title-updated", function (e) {
    e.preventDefault();
  });

  ipcMain.on("create-model", () => {
    win.destroy();
  });

  // affichage dès que l'appli est prête
  win.once("ready-to-show", () => {
    win.show();
  });
}
