/* eslint-disable @typescript-eslint/no-non-null-assertion */
// Modules
import { createContext } from 'react';
import { AudioContextProps, AvatarsContextProps, MemoryContextProps, SettingContextProps } from '../types/contexts';

const SettingsContext = createContext<SettingContextProps>(null!)
const AvatarsContext = createContext<AvatarsContextProps>(null!)
const AudioContext_Def = createContext<AudioContextProps>(null!)
const MemoryContext = createContext<MemoryContextProps>(null!)

export {
    SettingsContext,
    AvatarsContext,
    AudioContext_Def,
    MemoryContext
}