// Modules
import { useContext, useReducer } from 'react';

import { MemoryContext, SettingsContext } from "..";
import { Contextinterface, DefaultValuesMemory, typeMemoryReducerSettings } from "../../types/contexts";

export default function MemoryProvider({ children }: Contextinterface) {

    const { SettingsState } = useContext(SettingsContext);

    const DefaultValues: DefaultValuesMemory = {
        Fullscreen: false,
        Settings: false,
        SettingRouter: 'Appareance',
        PictureInPicture: false,
        AvatarsShowcase: false,
        SettingsPreload: SettingsState
    }

    function reducer(state: DefaultValuesMemory, { action, value }: typeMemoryReducerSettings) {
        return {
            ...state,
            [action]: value
        }
    }

    const [state, dispatch] = useReducer(reducer, DefaultValues);

    function ModifyState({ action, value }: typeMemoryReducerSettings): void {
        dispatch({
            action,
            value
        })   
    }

    console.log(state);

    return (
        <MemoryContext.Provider value={{
            MemoryState: state,
            ModifyState
        }}>
            {children}
        </MemoryContext.Provider>
    )
}