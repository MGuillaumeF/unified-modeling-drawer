// définition des paquets Node.js requires
const { app, Tray, Menu, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

let trayIconPath,
  iconPath = (trayIconPath = path.join(__dirname, "./icon.png"));

if (process.platform === "win32") {
  iconPath = trayIconPath = path.join(__dirname, "./icon.ico");
}
// Définition de la fenêtre Chromium
let win;

// la focntion de création de la fenêtre Chromium
function createWindow() {
  // Création de la fenêtre navigateur Chromium
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: iconPath,
    webPreferences: {
      nodeIntegration: false
    }
  });
  // Définition de la partie System Tray de l'application
  // Création de l'application System Tray
  const appIcon = new Tray(trayIconPath);
  appIcon.setToolTip("Unified Modeling Drawer");
  // chargement de l'application SPA
  win.loadURL(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : url.format({
          pathname: path.join(__dirname, "../build/index.html"),
          protocol: "file:",
          slashes: true
        })
  );

  // affichage dès que l'appli est prête
  win.once("ready-to-show", () => {
    win.show();
  });
  win.on("close", function (event) {
    if (!app.isQuiting) {
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
        app.isQuiting = true;
        app.quit();
      }
    }
  ]);
  const template = [
    {
      label: "Fichier",
      submenu: [
        { role: "new", label: "Nouveau Modèle", accelerator: "CmdOrCtrl+N" },
        { role: "open", label: "Ouvrir Modèle", accelerator: "CmdOrCtrl+O" },
        { role: "save", label: "Sauvegarder", accelerator: "CmdOrCtrl+S" },
        {
          role: "saveas",
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
          role: "selectall",
          label: "Selectionner tout",
          accelerator: "CmdOrCtrl+A"
        }
      ]
    },
    {
      label: "Affichage",
      submenu: [
        { role: "reload", label: "Recharger" },
        { role: "forcereload", label: "Forcer la recharge" },
        { role: "toggledevtools", label: "Outils de développement" },
        { type: "separator" },
        { role: "resetzoom", label: "Zoom par défaut" },
        { role: "zoomin", label: "Zoom +" },
        { role: "zoomout", label: "Zoom -" },
        { type: "separator" },
        { role: "togglefullscreen", label: "Plein écran" }
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
        { role: "hideothers" },
        { role: "unhide" },
        { type: "separator" },
        { role: "quit" }
      ]
    });

    // Edit menu
    template[1].submenu.push(
      { type: "separator" },
      {
        label: "Speech",
        submenu: [{ role: "startspeaking" }, { role: "stopspeaking" }]
      }
    );

    // Window menu
    template[3].submenu = [
      { role: "close" },
      { role: "minimize" },
      { role: "zoom" },
      { type: "separator" },
      { role: "front" }
    ];
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  appIcon.setContextMenu(contextMenu);
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
    createWindow();
  }
});
