// Modules
import { useContext } from 'react';
// Context
import { MemoryContext } from "../../contexts";
import Avatars from '../../icons/Avatars';

export default function LateralRight() {

    const { MemoryState, ModifyState } = useContext(MemoryContext);

    return (
        <div id="FooBar-LateralRight">
            <button className="FooBar-LateralRight-Button"
                onClick={() => ModifyState({
                    action: 'AvatarsShowcase',
                    value: !MemoryState.AvatarsShowcase
                })}>
                <Avatars />
            </button>
        </div>
    )
}