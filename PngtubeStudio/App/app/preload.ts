// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// Modules
import { contextBridge, ipcRenderer, app } from "electron";
// Types
import { TypeEventWindow } from "./consts";
import { type } from "os";

/**
 * Ejecuta eventos principales de la ventana
 * @param typeEvent
 */
function EventWindow(typeEvent: TypeEventWindow) {
    console.log(typeEvent);
    ipcRenderer.send(typeEvent);
}

function moveWindow({ x, y }: any) {
    ipcRenderer.send('moveWidndow', {
        x, y
    })
}

contextBridge.exposeInMainWorld("PngtubeStudioAPI", {
    Events: {
        EventWindow,
        moveWindow
    }
})