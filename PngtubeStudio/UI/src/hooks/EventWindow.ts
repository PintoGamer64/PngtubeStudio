import { PngtubeStudioAPI } from "../types/PngtubeStudioAPI";

export default function useWindowEvents() {

    //@ts-expect-error Conexion con Electron
    const { Events }: PngtubeStudioAPI = window.PngtubeStudioAPI;

    const MinimizeEvent = () => Events.EventWindow('minimize')
    const MaxMinEvent = () => Events.EventWindow('restore')
    const CloseEvent = () => Events.EventWindow('close')

    return {
        MinimizeEvent,
        MaxMinEvent,
        CloseEvent
    }
}