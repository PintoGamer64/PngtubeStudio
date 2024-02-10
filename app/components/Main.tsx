// Modules
import React, { useContext, useMemo } from 'react';

// Contexts
import { MemoryContext, SettingsContext } from '../contexts'

// Styles
import './styles/Main.css'
import ImgURL from '../hooks/BackgroundStyle';
import ModelViewer from './components/modelViewer';
import AvatarsShowcase from './components/AvatarShowcase';

export default function Main() {

    const { SettingsState } = useContext(SettingsContext);
    const { MemoryState } = useContext(MemoryContext);

    const ModelViewerStyle = useMemo(() => ImgURL(`${SettingsState.Wallpapers}\\${SettingsState.Config.Custom.wallpaper}.png`), [SettingsState.Config.Custom.type, SettingsState.Config.Custom.colorBackground])

    return (
        <>
            <div id="ModelViewer" style={ModelViewerStyle} className={
                !MemoryState.Fullscreen && !document.fullscreenElement ?
                    'ModelViewerOutFull'
                    :
                    'ModelViewerInFull'
            } >
                <ModelViewer />
            </div>
            <main id="Main">
                <AvatarsShowcase />
            </main>
        </>
    )
}