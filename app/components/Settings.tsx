// Modules
import React, { useContext } from 'react';
// Contexts
import { MemoryContext } from '../contexts';
// Components
import ViewSettings from './components/ViewSettings';
import ListSettings from './components/ListSettings';
// Styles
import './styles/Settings.css'

export default function Settings() {

    const { MemoryState, ModifyState } = useContext(MemoryContext)

    return (
        <div id="Settings" className={
            MemoryState.Settings
                ? "SettingsOpen"
                : "SettingClose"
        }
            onClick={() => {
                ModifyState({
                    action: "Settings",
                    value: false
                })
            }
        }>
            <main id="SettingsMain" onClick={(ev) => ev.stopPropagation()}>
                <ListSettings />
                <ViewSettings />
            </main>
        </div>
    )
}