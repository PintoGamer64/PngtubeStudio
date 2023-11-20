import { ipcMain } from "electron";
import { homedir } from "os";
import { join } from "path";
import { readJSON } from "./utils";

export default function PngtubeStudioAPI() {
    ipcMain.on('getModels', async (ev) => {
        const Models = await readJSON(join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Models\\models.json'));
        ev.returnValue = {
          Models
        }
      })
}