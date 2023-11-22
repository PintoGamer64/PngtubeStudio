// Modules
import { SettingsContext } from "..";
import { useReducer } from "react";
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

    console.log(DefaultValues);

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

    return (
        <SettingsContext.Provider value={{
            SettingsState: state,
            ModifyState
        }}>
            {children}
        </SettingsContext.Provider>
    )
}