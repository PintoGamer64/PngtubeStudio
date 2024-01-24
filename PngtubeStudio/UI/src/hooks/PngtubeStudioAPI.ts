import { PngtubeStudioAPI } from "../types/PngtubeStudioAPI";

export default function usePngtubeStudioAPI(): PngtubeStudioAPI {

    //@ts-expect-error Conexion con Electron
    const { Get, Events, Set }: PngtubeStudioAPI = window.PngtubeStudioAPI;

    return {
        Events,
        Get,
        Set
    }
}