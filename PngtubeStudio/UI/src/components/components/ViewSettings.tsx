import { useContext } from "react";
import Close from "../../icons/Close";
import { MemoryContext } from "../../contexts";
import ComponentsPropagator from "../packages/ComponentsPropagator";
import Contants from "../../constants";

export default function ViewSettings() {

    const { MemoryState, ModifyState } = useContext(MemoryContext);

    const { SettingsRoutes } = Contants();

    function DrawInterface() {
        if (MemoryState.SettingRouter === 'Appareance') {
            return <ComponentsPropagator Data={SettingsRoutes}/>
        }
        if (MemoryState.SettingRouter === 'Advanced') {
            return <></>
        }
    }

    return (
        <article id="SettingsView">
            <section id="SettingsView-Tool">
                <h2 id="SettingsView-Tool-Title">{MemoryState.SettingRouter}</h2>
                <button id="SettingsView-Tool-CloseButton" onClick={() => {
                    ModifyState({
                        action: 'Settings',
                        value: !MemoryState.Settings
                    })
                }}>
                    <Close />
                </button>
            </section>
            <section id="SettingsView-Content">
                <DrawInterface />
            </section>
        </article>
    )
}