import { Dispatch, SetStateAction } from "react"
import { TypeAudioConfig } from "./WindowEvent"

// Functions
export type TypeUpdateCanvasVolume = {
    canvasLevelRef: React.MutableRefObject<HTMLCanvasElement>,
    AudioState: TypeAudioConfig,
    ModifyState: Dispatch<SetStateAction<number>>,
    Volume: number
}

export type TypeUpdateAvatarStyleClass = {
    AudioState: TypeAudioConfig,
    Animate: HTMLImageElement,
    Volume: number
}