// Modules
import { useContext } from 'react';
// Imports
import { MicrophoneClose, MicrophoneOpen } from "../../../icons/Microphone";
import { AudioContext_Def } from '../../../contexts';

export default function MicrophoneIconButton() {

    const { AudioState, ModifyState } = useContext(AudioContext_Def);

    return (
        <button id="FooBar-Microphone-Button" onClick={() => ModifyState({
            action: 'State',
            value: !AudioState.State
        })}>
            {AudioState.State ? <MicrophoneOpen /> : <MicrophoneClose />}
        </button>
    )
}