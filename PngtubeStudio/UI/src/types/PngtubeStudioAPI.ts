import { TypeEventModels_Func, TypeEventSettings_Func, TypeEventWindow_Func } from "./WindowEvent"

export type PngtubeStudioAPI = {
    Events: {
        EventWindow: TypeEventWindow_Func
    },
    Get: {
        Models: TypeEventModels_Func,
        Settings: TypeEventSettings_Func
    }
}