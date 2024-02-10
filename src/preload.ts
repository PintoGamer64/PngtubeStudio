// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";
// Types
import { TypeBaseConfig, TypeEventModels, TypeEventSettings, TypeEventWindow } from "./modules";

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

function Settings(typeEvent: TypeEventSettings) {
    return ipcRenderer.sendSync(typeEvent);
}

function SendSettings(typeEvent: TypeEventSettings, settingsValue?: TypeBaseConfig) {
    return ipcRenderer.send(typeEvent, settingsValue);
}

contextBridge.exposeInMainWorld("PngtubeStudioAPI", {
    Events: {
        EventWindow
    },
    Get: {
        Models,
        Settings
    },
    Set: {
        Models,
        SendSettings
    }
})