// Modules
import { SettingsContext } from "..";
import React, { useReducer } from "react";
import usePngtubeStudioAPI from "../../hooks/PngtubeStudioAPI";
import { TypeBaseConfig } from "../../types/WindowEvent";
import { Contextinterface, TypeSettingsReducerSettings } from "../../types/contexts";

export default function SettingsProvider({ children }: Contextinterface) {

    const { Get } = usePngtubeStudioAPI();

    const { Avatars, Config, Model, Resources, Wallpapers } = Get.Settings("getSettings");

    const DefaultValues: TypeBaseConfig = {
        Model,
        Resources,
        Wallpapers,
        Avatars,
        Config
    }

    function reducer(state: TypeBaseConfig, { action, value }: TypeSettingsReducerSettings) {
        return {
            ...state,
            [action]: value
        }
    }

    const [state, dispatch] = useReducer(reducer, DefaultValues);

    function ModifyState({ action, value }: TypeSettingsReducerSettings): void {
        dispatch({
            action,
            value
        })
    }

    function ModifyAll(value: TypeBaseConfig): void {
        dispatch({
            action: 'Config',
            value: value.Config
        })
        dispatch({
            action: 'Model',
            value: value.Model
        })
        dispatch({
            action: 'Avatars',
            value: value.Avatars
        })
        dispatch({
            action: 'Wallpapers',
            value: value.Wallpapers
        })
        dispatch({
            action: 'Resources',
            value: value.Resources
        })
    }

    return (
        <SettingsContext.Provider value={{
            SettingsState: state,
            ModifyState,
            ModifyAll
        }}>
            {children}
        </SettingsContext.Provider>
    )
}