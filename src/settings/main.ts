import { BrowserWindow, app, ipcMain, nativeImage } from "electron";
import { join } from 'path';
import InitProcess from "./init";

let settingsWindow: BrowserWindow;

export default function SettingsExec() {
    const createSettingsWindow = () => {

        settingsWindow = new BrowserWindow({
            width: 500,
            height: 720,
            icon: nativeImage.createFromPath("Ookami.ico"),
            resizable: false,
            maximizable: false,
            center: true,
            webPreferences: {
                preload: join(__dirname, 'preload.js'),
                webSecurity: false,
                zoomFactor: 1
            }
        })

        console.log(join(__dirname, `../../src/settings/page/index.html`));

        settingsWindow.loadFile(join(__dirname, `../../src/settings/page/index.html`))
    }

    app.on('ready', async () => {
        createSettingsWindow()
    });

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createSettingsWindow();
        }
    });

    // Ipc Events
    ipcMain.on('ConfirmOperation', () => {
        InitProcess().__Init__()
    });
    ipcMain.on('CancelOperation', () => {
        settingsWindow.close()
    });
}