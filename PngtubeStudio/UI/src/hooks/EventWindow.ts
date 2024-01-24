import { PngtubeStudioAPI } from "../types/PngtubeStudioAPI";

export default function useWindowEvents() {

    //@ts-expect-error Conexion con Electron
    const { Events }: PngtubeStudioAPI = window.PngtubeStudioAPI;

    const MinimizeEvent = () => Events.EventWindow('minimize')
    const MaxMinEvent = () => Events.EventWindow('restore')
    const CloseEvent = () => Events.EventWindow('close')
    const LoadFile = () => Events.EventWindow('getFile')

    return {
        MinimizeEvent,
        MaxMinEvent,
        CloseEvent,
        LoadFile
    }
}