// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// Modules
import { contextBridge, ipcRenderer, app } from "electron";
// Types
import { TypeEventModels, TypeEventWindow } from "./consts";
import { type } from "os";

/**
 * Ejecuta eventos principales de la ventana
 * @param typeEvent
 */
function EventWindow(typeEvent: TypeEventWindow) {
    ipcRenderer.send(typeEvent);
}

function Models(typeEvent: TypeEventModels) {
    return ipcRenderer.send(typeEvent);
}

contextBridge.exposeInMainWorld("PngtubeStudioAPI", {
    Events: {
        EventWindow
    },
    Get: {
        Models
    }
})