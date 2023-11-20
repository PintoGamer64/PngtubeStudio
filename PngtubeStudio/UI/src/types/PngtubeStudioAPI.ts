import { TypeEventModels_Func, TypeEventWindow_Func } from "./WindowEvent"

export type PngtubeStudioAPI = {
    Events: {
        EventWindow: TypeEventWindow_Func
    },
    Get: {
        Models: TypeEventModels_Func
    }
}