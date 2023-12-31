import { ReactNode } from "react"
import { TypeAudioConfig, TypeBaseConfig, TypeModelsConfig } from "./WindowEvent"

// Providers
export interface Contextinterface {
    children: ReactNode
}
export interface TypeSettingsReducerSettings {
    action: "Model" | "Resources" | "Wallpapers" | "Config",
    value: string | number | object | `#${string}`
}

export interface TypeAudioReducerSettings {
    action: "Volume" | "Amplifier" | "Audio" | "Sensibility" | "State",
    value: boolean | number
}
export interface typeMemoryReducerSettings {
    action: "Fullscreen" | "Settings" | "SettingRouter" | "PictureInPicture",
    value: boolean | string
}

export type DefaultValuesMemory = {
    Fullscreen: boolean,
    Settings: boolean,
    SettingRouter: "Appareance" | "Advanced",
    PictureInPicture: boolean
}

// Functions
export type TypeModifySettingsState = ({ action, value }: TypeSettingsReducerSettings) => void
export type TypeModifyAudioState = ({ action, value }: TypeAudioReducerSettings) => void
export type TypeModifyMemoryState = ({ action, value }: typeMemoryReducerSettings) => void

// Contexts
export interface SettingContextProps {
    SettingsState: TypeBaseConfig,
    ModifyState: TypeModifySettingsState
}
export interface AvatarsContextProps {
    AvatarsState: TypeModelsConfig
}
export interface AudioContextProps {
    AudioState: TypeAudioConfig,
    ModifyState: TypeModifyAudioState
}

export interface MemoryContextProps {
    MemoryState: DefaultValuesMemory,
    ModifyState: TypeModifyMemoryState
}