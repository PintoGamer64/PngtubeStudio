// Modules
import { createContext } from 'react';
import { AvatarsContextProps, SettingContextProps } from '../types/contexts';

const SettingsContext = createContext<SettingContextProps>(null!)
const AvatarsContext = createContext<AvatarsContextProps>(null!)

export {
    SettingsContext,
    AvatarsContext
}