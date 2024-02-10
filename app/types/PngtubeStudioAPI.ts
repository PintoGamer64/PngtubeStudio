import { TypeEventModels_FuncGet, TypeEventModels_FuncSet, TypeEventSettings_FuncGet, TypeEventSettings_FuncSet, TypeEventWindow_Func } from "./WindowEvent"

export type PngtubeStudioAPI = {
    Events: {
        EventWindow: TypeEventWindow_Func
    },
    Get: {
        Models: TypeEventModels_FuncGet,
        Settings: TypeEventSettings_FuncGet
    },
    Set: {
        Models: TypeEventModels_FuncSet,
        SendSettings: TypeEventSettings_FuncSet
    }
}