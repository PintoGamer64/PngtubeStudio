import { PngtubeStudioAPI } from "../types/PngtubeStudioAPI";

export default function usePngtubeStudioAPI(): PngtubeStudioAPI {

    //@ts-expect-error Conexion con Electron
    const { Get, Events }: PngtubeStudioAPI = window.PngtubeStudioAPI;

    return {
        Events,
        Get
    }
}