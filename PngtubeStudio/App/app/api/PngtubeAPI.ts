import { dialog, ipcMain } from "electron";
import { homedir } from "os";
import { join } from "path";
import { readJSON } from "./utils";
import { TypeBaseConfig, TypeModelsConfig, TypeModelsConfigIndividual } from "../types";
import { writeFileSync } from "node:fs";
import { writeFile } from "fs";

export default function PngtubeStudioAPI() {
  //---------------------------------------------------------//
  ipcMain.on('getModels', async ev => {
    const Models: TypeModelsConfig = await readJSON(
      join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Avatars\\avatars.json')
    ).catch(() => console.log("Error al leer el archivo"))
    ev.returnValue = Models
  })
  //---------------------------------------------------------//
  ipcMain.on('getSettings', async ev => {
    ev.returnValue = await readJSON(
      join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\settings.json')
    ).catch(() => console.log("Error al leer el archivo"))
  })
  //---------------------------------------------------------//
  ipcMain.on('getFile', async ev => {
    const SelectedFile = dialog.showOpenDialogSync({
      properties: ['openFile'],
      filters: [{
        name: '',
        extensions: ['pngtubestudio']
      }]
    })

    const ModelLoaded: TypeModelsConfigIndividual = await readJSON(
      SelectedFile[0]
    ).catch(() => console.log("Error al leer el archivo"))

    const AvatarsFile = await readJSON(
      join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Avatars\\avatars.json')
    ).catch(() => console.log("Error al leer el archivo"))

    AvatarsFile.push(ModelLoaded)

    writeFileSync(
      join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Avatars\\avatars.json'),
      JSON.stringify(AvatarsFile, null, 4),
      { encoding: 'utf-8' }
    )
  })
  //---------------------------------------------------------//
  ipcMain.on('sendSettings', (ev, value) => {
    writeFile(
      join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\settings.json'),
      JSON.stringify(value, null, 4), () => {
        console.log("loadded file");
      }
    )
  })
}