// Modules
import { useContext } from 'react';
// Contexts
import { MemoryContext } from "../contexts";

export default function useEventsDefinitios() {

    const { MemoryState } = useContext(MemoryContext);

    function useEventFullScreen() {
        if (MemoryState.Fullscreen && !document.fullscreenElement) {
            const element = document.getElementById('root')!
            element.requestFullscreen();
        } else if (!MemoryState.Fullscreen && document.fullscreenElement && document.exitFullscreen) {
            document.exitFullscreen();
        }
    }

    function usePictureInPicture() {
        /* if (MemoryState.PictureInPicture && !document.pictureInPictureEnabled) {
            const element = document.getElementById('ModelViewer')!
            element.picture
        } else if (!MemoryState.Fullscreen && document.pictureInPictureElement ) {
            document.exitPictureInPicture();
        } */
    }

    return {
        __init__: () => {
            useEventFullScreen()
            usePictureInPicture()
        }
    }
}