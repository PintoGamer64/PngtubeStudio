// Modules
import { SettingsContext } from "..";
import { useReducer } from "react";
import usePngtubeStudioAPI from "../../hooks/PngtubeStudioAPI";
import { TypeBaseConfig } from "../../types/WindowEvent";
import { Contextinterface, TypeReducerSettings } from "../../types/contexts";

export default function SettingsProvider({ children }: Contextinterface) {

    const { Get } = usePngtubeStudioAPI();

    const DefaultValues: TypeBaseConfig = {
        Model: Get.Settings("getSettings").Model,
        Resources: Get.Settings("getSettings").Resources,
        Wallpapers: Get.Settings("getSettings").Wallpapers,
        Avatars: Get.Settings("getSettings").Avatars,
        Config: Get.Settings("getSettings").Config
    }

    console.log(DefaultValues);

    function reducer(state: TypeBaseConfig, { action, value }: TypeReducerSettings) {
        return {
            ...state,
            [action]: value
        }
    }

    const [state, dispatch] = useReducer(reducer, DefaultValues);

    function ModifyState({ action, value }: TypeReducerSettings): void {
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