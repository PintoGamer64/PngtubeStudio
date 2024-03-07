import { app, BrowserWindow, ipcMain, nativeImage } from 'electron';
import { join } from 'path';

// Packages
import PngtubeStudioAPI from '../api/PngtubeAPI';

let mainWindow: BrowserWindow;

export default function MainExec() {
    // Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

app.disableHardwareAcceleration()

const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        minWidth: 1280,
        minHeight: 720,
        icon: nativeImage.createFromPath("Ookami.ico"),
        titleBarStyle: "hidden",
        center: true,
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
};

app.on('ready', async () => {
    createWindow()
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
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
}