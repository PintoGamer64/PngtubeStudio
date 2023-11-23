// Modules
import { useContext } from 'react';
// Context
import { MemoryContext } from "../../contexts";
import { EnterFullscreen, ExitFullscreen } from "../../icons/FullScreen";
import SettingsIcon from "../../icons/Settings";

export default function LateralLeft() {

    const { MemoryState, ModifyState } = useContext(MemoryContext)

    return (
        <div id="FooBar-LateralLeft">
            <button className="FooBar-LateralLeft-Button">
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
        </div>
    )
}