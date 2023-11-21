import { ipcMain } from "electron";
import { homedir } from "os";
import { join } from "path";
import { readJSON } from "./utils";
import { TypeBaseConfig, TypeModelsConfig } from "../types";

export default function PngtubeStudioAPI() {
  ipcMain.on('getModels', async ev => {
    const Models: TypeModelsConfig = await readJSON(join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Avatars\\avatars.json'));
    ev.returnValue = Models
  })
  ipcMain.on('getSettings', async ev => {
    const Settings: TypeBaseConfig = await readJSON(join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\settings.json'));
    const { Config, Model, Resources, Wallpapers, Avatars } = Settings;
    ev.returnValue = {
      Config, Model, Resources, Wallpapers, Avatars
    }
  })
}