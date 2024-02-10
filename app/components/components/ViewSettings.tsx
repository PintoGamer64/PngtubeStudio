import React, { useContext } from "react";
import Close from "../../icons/Close";
import { MemoryContext } from "../../contexts";
import ComponentsPropagator from "../packages/ComponentsPropagator";
import Contants from "../../constants";
import useSettings from "../../hooks/SaveSettings";

export default function ViewSettings() {

    const { MemoryState, ModifyState } = useContext(MemoryContext);

    const { SettingsRoutes, VoiceRoutes } = Contants();
    const { Compare, Discard, Save } = useSettings()

    function DrawInterface() {
        if (MemoryState.SettingRouter === 'Appareance') {
            return <ComponentsPropagator Data={SettingsRoutes} />
        }
        if (MemoryState.SettingRouter === 'Voice') {
            return <ComponentsPropagator Data={VoiceRoutes} />
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
                <footer id="SettingsView-Content-Confirm" style={
                    Compare()
                        ? {
                            display: 'none'
                        }
                        : {
                            display: 'flex'
                        }
                }>
                    <p id="SettingsView-Content-Confirm-Text">¿Quieres guardar los cambios?</p>
                    <div id="SettingsView-Content-Confirm-Options">
                        <button className="SettingsView-Content-Confirm-Options_Buttons" id="SettingsView-Content-Confirm-Options_Discard" onClick={Discard}>
                            <h4>Descartar</h4>
                        </button>
                        <button className="SettingsView-Content-Confirm-Options_Buttons" id="SettingsView-Content-Confirm-Options_Save" onClick={Save}>
                            <h4>Guardar</h4>
                        </button>
                    </div>
                </footer>
            </section>
        </article>
    )
}