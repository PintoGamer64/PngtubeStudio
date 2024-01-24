import { useContext } from "react"
import { SettingsContext } from "../../contexts"
import { ResolveRouteLeft } from "../../utils";
import SettingsListPropagator from "../packages/SettingsPorpagator";

export default function ListSettings() {

    const { SettingsState } = useContext(SettingsContext);

    return (
        <aside id="SettingsList">
            <div id="SettingsList-Content">
                <picture id="SettingsList-Content-Image">
                    <img src={ResolveRouteLeft(`${SettingsState.Resources}\\Logo.png`)} alt="PngutbeStudio" id="SettingsList-Content-Image-Element" />
                </picture>
                <div id="SettingsList-Content-Scroll">
                    <SettingsListPropagator />
                </div>
            </div>
        </aside>
    )
}