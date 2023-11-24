// Modules
import { useContext } from 'react';
// Contexts
import { MemoryContext } from '../contexts';
// Components
import ViewSettings from './components/ViewSettings';
import ListSettings from './components/ListSettings';
// Styles
import './styles/Settings.css'

export default function Settings() {

    const { MemoryState } = useContext(MemoryContext)

    return (
        <div id="Settings" className={
            MemoryState.Settings
                ? "SettingsOpen"
                : "SettingClose"
        }>
            <main id="SettingsMain">
                <ListSettings />
                <ViewSettings />
            </main>
        </div>
    )
}