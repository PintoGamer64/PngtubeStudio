// Modules
import { useReducer } from "react";
import { AvatarsContext } from "..";
import usePngtubeStudioAPI from "../../hooks/PngtubeStudioAPI";
import { TypeModelsConfig } from "../../types/WindowEvent";
import { Contextinterface, typeModelReducerSettings } from "../../types/contexts";

export default function AvatarsProvider({ children }: Contextinterface) {

    const { Get } = usePngtubeStudioAPI();

    const DefaultValues: TypeModelsConfig = {
        Data: Get.Models("getModels"),
        Select: 1
    }

    console.log(DefaultValues);

    function reducer(state: TypeModelsConfig, { action, value }: typeModelReducerSettings) {
        return {
            ...state,
            [action]: value
        }
    }

    const [state, dispatch] = useReducer(reducer, DefaultValues);

    function ModifyState({ action, value }: typeModelReducerSettings): void {
        dispatch({
            action,
            value
        })   
    }

    return (
        <AvatarsContext.Provider value={{
            AvatarsState: state,
            ModifyState
        }}>
            {children}
        </AvatarsContext.Provider>
    )
}