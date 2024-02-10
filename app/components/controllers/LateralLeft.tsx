// Modules
import React, { useContext } from 'react';
// Context
import { MemoryContext } from "../../contexts";
import { EnterFullscreen, ExitFullscreen } from "../../icons/FullScreen";
import SettingsIcon from "../../icons/Settings";
import PictureInPicture from '../../icons/PictureInPicture';

export default function LateralLeft() {

    const { MemoryState, ModifyState } = useContext(MemoryContext);

    return (
        <div id="FooBar-LateralLeft">
            <button className="FooBar-LateralLeft-Button"
                onClick={() => ModifyState({
                    action: 'Settings',
                    value: !MemoryState.Settings
                })}>
                <SettingsIcon />
            </button>
            <button className="FooBar-LateralLeft-Button" onClick={() => ModifyState({
                action: 'Fullscreen',
                value: !MemoryState.Fullscreen
            })}>
                {
                    !MemoryState.Fullscreen
                        ? <EnterFullscreen />
                        : <ExitFullscreen />
                }
            </button>
            <button className="FooBar-LateralLeft-Button"
                onClick={() => ModifyState({
                    action: 'PictureInPicture',
                    value: !MemoryState.PictureInPicture
                })}>
                <PictureInPicture />
            </button>
        </div>
    )
}