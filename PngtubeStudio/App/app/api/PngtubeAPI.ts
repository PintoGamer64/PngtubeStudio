import { dialog, ipcMain } from "electron";
import { homedir } from "os";
import { join } from "path";
import { readJSON } from "./utils";
import { TypeModelsConfig, TypeModelsConfigIndividual, TypeSubmnitModel } from "../types";
import { writeFileSync } from "node:fs";
import { createWriteStream, writeFile } from "fs";
import { DecryptData, DownloadFiles, EncriptData, ImageBase64, ReadPasswords } from "../utils";

export default function PngtubeStudioAPI() {
  //---------------------------------------------------------//
  ipcMain.on('getModels', async ev => {

    ReadPasswords
      .then(async ({ key, iv }) => {
        ev.returnValue = await DecryptData(
          join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Avatars\\avatars'),
          key,
          iv,
        ).catch(() => console.log("Error al leer el archivo"))
      })
      .catch(() => console.log("Failed to get models"))
  })
  //---------------------------------------------------------//
  ipcMain.on('getSettings', async ev => {

    ReadPasswords
      .then(async (value) => {
        ev.returnValue = await DecryptData(
          join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\settings'),
          value.key,
          value.iv,
        ).catch(() => console.log("Error al leer el archivo"))
      })
      .catch(() => console.log("Failed to get Settings"))
  })
  //---------------------------------------------------------//
  ipcMain.on('getFile', async () => {
    const SelectedFile = dialog.showOpenDialogSync({
      properties: ['openFile'],
      filters: [{
        name: '',
        extensions: ['pngtubestudio']
      }]
    })
    if (SelectedFile && SelectedFile.length > 0) {
      ReadPasswords
        .then(async ({ key, iv }) => {
          let memory: string[] = [], searchPath, i = 0;
          console.log(SelectedFile[0]);
          const ModelLoad: TypeSubmnitModel = await readJSON(SelectedFile[0]);
          const AvatarsFile: TypeModelsConfig = await DecryptData(
            join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Avatars\\avatars'),
            key,
            iv
          )
          console.log(AvatarsFile);
          ModelLoad.States.map(async value => {
            searchPath = join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Avatars', ModelLoad.Name, `${ModelLoad.Name}${i === 0 ? '' : i + 1}.png`);
            const data = createWriteStream(searchPath);
            await DownloadFiles({
              DownloadUrl: value,
              FileLocation: searchPath,
              FileStream: data
            });
            memory.push(ImageBase64(searchPath));
            i++
          })

          AvatarsFile.push({
            Id: AvatarsFile.length + 1,
            Data: {
              States: [
                memory
              ]
            },
            Date: ModelLoad.Date,
            Image: join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Avatars', ModelLoad.Name, `${ModelLoad.Name}.png`),
            Name: ModelLoad.Name,
            Owner: ModelLoad.Owner,
            URL: ModelLoad.URL
          })

          writeFileSync(
            join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Avatars\\avatars'),
            await EncriptData(key, iv, JSON.stringify(AvatarsFile)),
            { encoding: "utf-8" }
          )

          console.log(AvatarsFile)
        })
    }
  })
  //---------------------------------------------------------//
  ipcMain.on('sendSettings', (ev, value) => {
    ReadPasswords
      .then(async ({ iv, key }) => {
        writeFile(
          join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\settings'),
          await EncriptData(key, iv, JSON.stringify(value)),
          (err) => {
            if (err) console.log("Error to save config")
            else console.log("loadded file");
          }
        )
      })
  })
}