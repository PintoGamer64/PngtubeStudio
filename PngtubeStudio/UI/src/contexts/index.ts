// Modules
import { createContext } from 'react';
import { AudioContextProps, AvatarsContextProps, SettingContextProps } from '../types/contexts';

const SettingsContext = createContext<SettingContextProps>(null!)
const AvatarsContext = createContext<AvatarsContextProps>(null!)
const AudioContext_Def = createContext<AudioContextProps>(null!)

export {
    SettingsContext,
    AvatarsContext,
    AudioContext_Def
}