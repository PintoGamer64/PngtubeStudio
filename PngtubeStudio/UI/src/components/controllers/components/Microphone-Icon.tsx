// Types
import { TypeMicrophoneIconButton } from "../../../types/controllers";
// Imports
import { MicrophoneClose, MicrophoneOpen } from "../../../icons/Microphone";

export default function MicrophoneIconButton({ AudioState, setAudioState }: TypeMicrophoneIconButton) {
    return (
        <button id="FooBar-Microphone-Button" onClick={() => setAudioState(!AudioState)}>
            {AudioState ? <MicrophoneOpen /> : <MicrophoneClose />}
        </button>
    )
}