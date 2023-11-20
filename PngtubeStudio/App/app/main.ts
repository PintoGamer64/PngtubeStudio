import { app, BrowserWindow, ipcMain } from "electron";
import { join } from "path";

let mainWindow: BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1280,
    minHeight: 720,
    movable: true,
    titleBarStyle: "hidden",
    webPreferences: {
      preload: join(__dirname, "preload.js"),
      zoomFactor: 1
    }
  });

  mainWindow.loadFile(join(__dirname, "../compl/index.html"));

  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();
  mainWindow.webContents.zoomLevel = 1;
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

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

ipcMain.on('moveWindow', (event, {x, y}) => {
  mainWindow.setPosition(x, y, true)
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
