import { app, BrowserWindow, ipcMain } from "electron";
import { join } from "path";
import PngtubeStudioAPI from "./api/PngtubeAPI";
import InitProcess from "./init";
import { homedir } from "os";
import { TypeBaseConfig } from "./types";
import { DecryptData, ImageBase64, ReadPasswords } from "./utils";
import { existsSync, writeFileSync } from "node:fs";

let mainWindow: BrowserWindow;

ReadPasswords
  .then(async (value) => {

    existsSync(join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\settings')) && (async () => {
      const HardAcc: TypeBaseConfig = await DecryptData(
        join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\settings'),
        value.key,
        value.iv,
      ).catch(() => console.log(">>>> Error al leer el archivo"))

      if (HardAcc.Config.hardwareAcceleration) {
        app.disableHardwareAcceleration()
      }
    })()
  })

writeFileSync(
  join(homedir(), `AppData\\Roaming\\PNGtubeSettings\\Ookami.txt`),
  ImageBase64(join(homedir(), `AppData\\Roaming\\PNGtubeSettings\\Avatars\\Ookami\\Ookami.png`))
)

writeFileSync(
  join(homedir(), `AppData\\Roaming\\PNGtubeSettings\\Ookami2.txt`),
  ImageBase64(join(homedir(), `AppData\\Roaming\\PNGtubeSettings\\Avatars\\Ookami\\Ookami2.png`))
)

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

app.whenReady().then(async () => {

  await InitProcess().__Init__();

  createWindow()

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