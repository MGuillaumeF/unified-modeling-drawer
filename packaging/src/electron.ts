// définition des paquets Node.js requires
import { BrowserWindow, Menu, Tray, app, dialog } from "electron";

import fs from "fs";
import { join as pathJoin } from "path";
import url from "url";
import xml2js from "xml2js";
import { I18n } from "i18n";

const i18n = new I18n({
  locales: ['en', 'fr'],
  directory: pathJoin(__dirname, './locales'),
  register: global,
  api: {
    __: 't',
    __n: 'tn'
  },
  defaultLocale: 'fr'
})

const ICON_EXT = process.platform === "win32" ? "ico" : "png";

let trayIconPath = pathJoin(__dirname, `../resources/icon.${ICON_EXT}`);
let iconPath = trayIconPath;

// Définition de la fenêtre Chromium
let win: BrowserWindow | null = null;
// save close state to no exit if close is asked, but hide window
let isQuiting = false;

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
  win.loadURL(
    process.env["NODE_ENV"] === "development"
      ? "http://localhost:3000"
      : url.format({
          pathname: pathJoin(__dirname, "../../app/build/index.html"),
          protocol: "file:",
          slashes: true
        })
  );

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
  const template: (Electron.MenuItemConstructorOptions | Electron.MenuItem)[] =
    [
      {
        label: "Fichier",
        submenu: [
          { label: "Nouveau Modèle", accelerator: "CmdOrCtrl+N" },
          {
            label: "Ouvrir Modèle",
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
                      let parser = new xml2js.Parser();
                      const xmlContent = fs.readFileSync(modelPath).toString();
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
          { label: "Sauvegarder", accelerator: "CmdOrCtrl+S" },
          {
            label: "Sauvegarder sous",
            accelerator: "CmdOrCtrl+Alt+S"
          }
        ]
      },
      {
        label: "Édition",
        submenu: [
          { role: "undo", label: "Précédent", accelerator: "CmdOrCtrl+Z" },
          { role: "redo", label: "Suivant", accelerator: "CmdOrCtrl+Y" },
          { type: "separator" },
          { role: "cut", label: "Couper", accelerator: "CmdOrCtrl+X" },
          { role: "copy", label: "Copier", accelerator: "CmdOrCtrl+C" },
          { role: "paste", label: "Coller", accelerator: "CmdOrCtrl+V" },
          // {role: 'pasteandmatchstyle'},
          { role: "delete", label: "Supprimer" },
          {
            role: "selectAll",
            label: "Selectionner tout",
            accelerator: "CmdOrCtrl+A"
          }
        ]
      },
      {
        label: "Affichage",
        submenu: [
          { role: "reload", label: "Recharger" },
          { role: "forceReload", label: "Forcer la recharge" },
          { role: "toggleDevTools", label: "Outils de développement" },
          { type: "separator" },
          { role: "resetZoom", label: "Zoom par défaut" },
          { role: "zoomIn", label: "Zoom +" },
          { role: "zoomOut", label: "Zoom -" },
          { type: "separator" },
          { role: "togglefullscreen", label: "Plein écran" },
          { type: "separator" },
          {
            label: "languages",
            submenu: [
              {
                label: "Français (FR)",
                click() {
                  win.webContents.send("language", "fr");
                }
              },
              {
                label: "Anglais (US)",
                click() {
                  win.webContents.send("language", "us");
                }
              }
            ]
          }
        ]
      },
      {
        role: "window",
        label: "Fenêtre",
        submenu: [
          { role: "minimize", label: "Minimiser" },
          { role: "close", label: "Quitter" }
        ]
      },
      {
        role: "help",
        label: "Aide",
        submenu: [
          {
            label: "Contact",
            click() {
              require("electron").shell.openExternal(
                "mailto:mguillaumef@gmail.com"
              );
            }
          }
        ]
      }
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

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  appIcon.setContextMenu(contextMenu);
  return win;
}
// méthode appelé lorsque l'application est prête
app.on("ready", createWindow);

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
