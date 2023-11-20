import { BrowserWindow } from "electron";

export default function AppEvents(conection: Electron.IpcMain, window: BrowserWindow): void {
    conection.on('minimize', () => {
        window.minimize()
    });
    conection.on('close', () => {
        window.close()
    });
    conection.on('restore', () => {
        if (window.isMaximized()) return window.restore();
        return window.maximize();
    });
}