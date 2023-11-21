import { ReactNode } from "react"
import { TypeBaseConfig, TypeModelsConfig } from "./WindowEvent"

// Providers
export interface Contextinterface {
    children: ReactNode
}
export interface TypeReducerSettings {
    action: "Model" | "Resources" | "Wallpapers" | "Config",
    value: string | number | object | `#${string}`
}

// Functions
export type TypeModifyState = ({ action, value }: TypeReducerSettings) => void

// Contexts
export interface SettingContextProps {
    SettingsState: TypeBaseConfig,
    ModifyState: TypeModifyState
}
export interface AvatarsContextProps {
    AvatarsState: TypeModelsConfig
}