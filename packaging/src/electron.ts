// définition des paquets Node.js requires
import { BrowserWindow, Menu, Tray, app, ipcMain } from "electron";

import fs from "fs";
import i18next from "i18next";
import { join as pathJoin } from "path";
import ModelObject, { IModelObject } from "./.model/ModelObject";
import { getMenuTemplate } from "./menu";
import ConfigurationManager from "./ConfigurationManager";

const ICON_EXT = process.platform === "win32" ? "ico" : "png";
const RESOURCES_PATH = pathJoin(__dirname, "./resources");
const ICON_PATH = RESOURCES_PATH;
const LOCALES_PATH = pathJoin(RESOURCES_PATH, "locales");

let trayIconPath = pathJoin(ICON_PATH, `icon.${ICON_EXT}`);
let iconPath = trayIconPath;

// Définition de la fenêtre Chromium
let win: BrowserWindow | null = null;
// save close state to no exit if close is asked, but hide window
let isQuiting = false;
let displayedModel: ModelObject | undefined;
const configurationManager = ConfigurationManager.getInstance();

// la focntion de création de la fenêtre Chromium
function createWindow(): BrowserWindow {
  // Création de la fenêtre navigateur Chromium
  const win = new BrowserWindow({
    icon: iconPath,
    webPreferences: {
      preload: pathJoin(__dirname, "preload.js")
    }
  });
  // Définition de la partie System Tray de l'application
  // Création de l'application System Tray
  const appIcon = new Tray(trayIconPath);
  appIcon.setToolTip("Unified Modeling Drawer");
  // chargement de l'application SPA
  win.loadURL("http://localhost:3000");

  // affichage dès que l'appli est prête
  win.once("ready-to-show", () => {
    win.show();
  });
  win.on("close", function (event) {
    if (!isQuiting) {
      event.preventDefault();
      win.hide();
    }
    return false;
  });
  ipcMain.on(
    "create-model",
    (event: Electron.IpcMainEvent, modelObject: IModelObject) => {
      displayedModel = new ModelObject(modelObject);
      win.setTitle(
        process.env["npm_package_name"] + " - " + displayedModel.name
      );

      const menu = Menu.buildFromTemplate(
        getMenuTemplate(win, displayedModelUpdater, displayedModel)
      );
      Menu.setApplicationMenu(menu);
    }
  );
  // définition du menu
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Afficher",
      click: function () {
        win.show();
      }
    },
    {
      label: "Quitter",
      click: function () {
        isQuiting = true;
        app.quit();
      }
    }
  ]);

  const menu = Menu.buildFromTemplate(
    getMenuTemplate(win, displayedModelUpdater, displayedModel)
  );
  Menu.setApplicationMenu(menu);

  appIcon.setContextMenu(contextMenu);
  return win;
}

i18next
  .init({
    lng: "fr",
    debug: true,
    resources: {
      fr: {
        translation: JSON.parse(
          fs
            .readFileSync(pathJoin(LOCALES_PATH, "fr", "translation.json"))
            .toString()
        )
      },
      en: {
        translation: JSON.parse(
          fs
            .readFileSync(pathJoin(LOCALES_PATH, "en", "translation.json"))
            .toString()
        )
      }
    }
  })
  .then(function () {
    app.whenReady().then(() => {
      const localWin = createWindow();
      i18next.on("languageChanged", (lng: string) => {
        const menu = Menu.buildFromTemplate(
          getMenuTemplate(localWin, displayedModelUpdater, displayedModel)
        );
        Menu.setApplicationMenu(menu);
      });
      win = localWin;
    });

    // Quit when all windows are closed.
    app.on("window-all-closed", () => {
      // On macOS it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      if (process.platform !== "darwin") {
        app.quit();
      }
    });

    app.on("activate", () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (win === null) {
        win = createWindow();
      }
    });
  });

function displayedModelUpdater(
  win: BrowserWindow,
  modelObject: IModelObject
): void {
  displayedModel = new ModelObject(modelObject);
  win.setTitle(process.env["npm_package_name"] + " - " + displayedModel.name);

  const menu = Menu.buildFromTemplate(
    getMenuTemplate(win, displayedModelUpdater, displayedModel)
  );
  Menu.setApplicationMenu(menu);
}
