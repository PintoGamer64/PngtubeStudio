import { app, BrowserWindow, ipcMain, webFrame } from "electron";
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer'
import { join } from "path";
import PngtubeStudioAPI from "./api/PngtubeAPI";
import InitProcess from "./init";

let mainWindow: BrowserWindow;

InitProcess().__Init__()

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1280,
    minHeight: 720,
    titleBarStyle: "hidden",
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      zoomFactor: 1
    }
  });

  // mainWindow.loadURL("http://localhost:5173/");
  mainWindow.loadFile(join(__dirname, "../compl/index.html"));

  /* mainWindow.webContents.openDevTools(); */
}

app.whenReady().then(() => {

  installExtension(REACT_DEVELOPER_TOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));

  // Create Window
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Ipc Events
ipcMain.on('minimize', () => {
  mainWindow.minimize()
});
ipcMain.on('close', () => {
  mainWindow.close()
});
ipcMain.on('restore', () => {
  if (mainWindow.isMaximized()) return mainWindow.restore();
  return mainWindow.maximize();
});
PngtubeStudioAPI()