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
    action: "Fullscreen",
    value: boolean
}

export type DefaultValuesMemory = {
    Fullscreen: boolean
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