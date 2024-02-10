import { ReactNode } from "react"
import { TypeAudioConfig, TypeBaseConfig, TypeModelConfigBase, TypeModelsConfig } from "./WindowEvent"

// Providers
export interface Contextinterface {
    children: ReactNode
}
export interface TypeSettingsReducerSettings {
    action: "Model" | "Resources" | "Wallpapers" | "Config" | "Avatars",
    value: string | number | object | `#${string}`
}

export interface TypeAudioReducerSettings {
    action: "FftSize" | "Amplifier" | "Audio" | "Sensibility" | "State",
    value: boolean | number
}

export interface typeMemoryReducerSettings {
    action: "Fullscreen" | "Settings" | "SettingRouter" | "PictureInPicture" | "AvatarsShowcase" | "SettingsPreload",
    value: boolean | string | TypeBaseConfig
}

export interface typeModelReducerSettings {
    action: "Data" | "Select",
    value: TypeModelConfigBase | number
}

export type DefaultValuesMemory = {
    Fullscreen: boolean,
    Settings: boolean,
    SettingRouter: "Appareance" | "Advanced" | "Voice",
    PictureInPicture: boolean,
    AvatarsShowcase: boolean,
    SettingsPreload: TypeBaseConfig
}

// Functions
export type TypeModifySettingsState = ({ action, value }: TypeSettingsReducerSettings) => void
export type TypeModifyAudioState = ({ action, value }: TypeAudioReducerSettings) => void
export type TypeModifyMemoryState = ({ action, value }: typeMemoryReducerSettings) => void
export type TypeModifyModelState = ({ action, value }: typeModelReducerSettings) => void
export type TypeModifyAllState = (value: TypeBaseConfig) => void

// Contexts
export interface SettingContextProps {
    SettingsState: TypeBaseConfig,
    ModifyState: TypeModifySettingsState,
    ModifyAll: TypeModifyAllState
}
export interface AvatarsContextProps {
    AvatarsState: TypeModelsConfig,
    ModifyState: TypeModifyModelState
}
export interface AudioContextProps {
    AudioState: TypeAudioConfig,
    ModifyState: TypeModifyAudioState
}

export interface MemoryContextProps {
    MemoryState: DefaultValuesMemory,
    ModifyState: TypeModifyMemoryState
}