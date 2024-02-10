import { app, BrowserWindow, ipcMain, nativeImage } from 'electron';
import { existsSync } from 'node:fs';
import { homedir } from 'node:os'
import { join } from 'path';

// Packages
import { DecryptData, ReadPasswords } from './utils';
import PngtubeStudioAPI from './api/PngtubeAPI';
import { TypeBaseConfig } from './modules';
import InitProcess from './init';

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

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1280,
    minHeight: 720,
    titleBarStyle: "hidden",
    icon: nativeImage.createFromPath("./assets/Icon.jpeg"),
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      webSecurity: false,
      zoomFactor: 1
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }
/* 
  // Open the DevTools.
  mainWindow.webContents.openDevTools(); */
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  await InitProcess().__Init__();
  createWindow()
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
