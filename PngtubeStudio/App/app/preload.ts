// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// Modules
import { contextBridge, ipcRenderer } from "electron";
// Types
import { TypeEventModels, TypeEventWindow } from "./types";

/**
 * Ejecuta eventos principales de la ventana
 * @param typeEvent
 */
function EventWindow(typeEvent: TypeEventWindow) {
    ipcRenderer.send(typeEvent);
}

function Models(typeEvent: TypeEventModels) {
    return ipcRenderer.sendSync(typeEvent);
}

contextBridge.exposeInMainWorld("PngtubeStudioAPI", {
    Events: {
        EventWindow
    },
    Get: {
        Models
    }
})