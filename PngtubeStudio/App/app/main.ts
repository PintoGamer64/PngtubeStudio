import { app, BrowserWindow, ipcMain } from "electron";
import { join } from "path";

let mainWindow: BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
    },
    width: 800,
  });

  mainWindow.loadFile(join(__dirname, "../compl/index.html"));

  mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

ipcMain.on('minimize', () => {
  mainWindow.minimize()
})
ipcMain.on('close', () => {
  mainWindow.close()
})
ipcMain.on('restore', () => {
  if (mainWindow.isMaximized()) return mainWindow.restore();
  return mainWindow.maximize();
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
