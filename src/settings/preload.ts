import { contextBridge, ipcRenderer } from "electron";

function confirm() {
    ipcRenderer.sendSync('ConfirmOperation')
}

function cancel() {
    ipcRenderer.sendSync('CancelOperation')
}

contextBridge.exposeInMainWorld("settingsPreload", {
    cancel,
    confirm
})