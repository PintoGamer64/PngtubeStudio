import { join } from "node:path";
import { readJSON } from "../utils";
import { BrowserWindow } from "electron";
import { homedir } from "node:os";

export default function PngtubeAPI(conection: Electron.IpcMain, window: BrowserWindow): void {
    conection.on('getModels', (ev) => {
        const Models = readJSON(join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Models\\models.json'));
        ev.reply('getModels',
            Models
        )
    })
}