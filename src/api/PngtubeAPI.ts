import { dialog, ipcMain } from "electron";
import { homedir } from "os";
import { join } from "path";
import { readJSON } from "./utils";
import { TypeUploadModels } from "../types";
import { writeFileSync } from "node:fs";
import { writeFile } from "fs";
import { DecryptData, EncriptData, ReadPasswords } from "../utils";

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

      console.log(SelectedFile);

      ReadPasswords
        .then(async ({ key, iv }) => {
          const ModelLoaded: TypeUploadModels = await readJSON(SelectedFile[0]);
          const AvatarsFile = await DecryptData(
            join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Avatars\\avatars'),
            key,
            iv
          );
          AvatarsFile.push({
            ["Id"]: AvatarsFile.length + 1,
            ...ModelLoaded
          });
          writeFileSync(
            join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Avatars\\avatars'),
            await EncriptData(
              key,
              iv,
              JSON.stringify(AvatarsFile, null, 4)
            ),
            { encoding: 'utf-8' }
          )

          console.log(await DecryptData(
            join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Avatars\\avatars'),
            key,
            iv
          ));

    })
    .catch(err => console.log("No se pudo actualizar los modelos"))

  /* 
  writeFileSync(
    join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Avatars\\avatars.json'),
    JSON.stringify(AvatarsFile, null, 4),
    { encoding: 'utf-8' }
  ) */
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