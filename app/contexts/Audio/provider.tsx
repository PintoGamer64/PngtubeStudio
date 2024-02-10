// Modules
import React, { useContext, useReducer } from "react";

import { AudioContext_Def, SettingsContext } from "..";
import { TypeAudioConfig } from "../../types/WindowEvent";
import { Contextinterface, TypeAudioReducerSettings } from "../../types/contexts";

export default function AudioProvider({ children }: Contextinterface) {

    const { SettingsState } = useContext(SettingsContext);

    const DefaultValues: TypeAudioConfig = {
        Amplifier: 100,
        Sensibility: 50,
        State: true,
        FftSize: SettingsState.Config.AudioFftsize
    }

    function reducer(state: TypeAudioConfig, { action, value }: TypeAudioReducerSettings) {
        return {
            ...state,
            [action]: value
        }
    }

    const [state, dispatch] = useReducer(reducer, DefaultValues);

    function ModifyState({ action, value }: TypeAudioReducerSettings): void {
        dispatch({
            action,
            value
        })
    }

    return (
        <AudioContext_Def.Provider value={{
            AudioState: state,
            ModifyState
        }}>
            {children}
        </AudioContext_Def.Provider>
    )
}