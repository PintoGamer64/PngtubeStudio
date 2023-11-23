// Modules
import { useContext } from 'react';
// Contexts
import { MemoryContext } from "../contexts";

export default function useEventFullScreen() {

    const { MemoryState } = useContext(MemoryContext);

    if (MemoryState.Fullscreen && !document.fullscreenElement) {
        const element = document.getElementById('root')!
        element.requestFullscreen();
    } else if (!MemoryState.Fullscreen && document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen();
    }
}