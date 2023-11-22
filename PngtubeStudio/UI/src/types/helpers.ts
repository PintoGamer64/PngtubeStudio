import { TypeAudioConfig } from "./WindowEvent"
import { TypeModifyAudioState } from "./contexts"

// Functions
export type TypeUpdateCanvasVolume = {
    canvasLevelRef: React.MutableRefObject<HTMLCanvasElement>,
    AudioState: TypeAudioConfig,
    ModifyState: TypeModifyAudioState,
    Volume: number
}

export type TypeUpdateAvatarStyleClass = {
    AudioState: TypeAudioConfig,
    Animate: HTMLImageElement,
    Volume: number
}