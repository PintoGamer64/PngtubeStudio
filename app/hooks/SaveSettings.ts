import { useContext } from "react"
import { MemoryContext, SettingsContext } from "../contexts"
import usePngtubeStudioAPI from "./PngtubeStudioAPI";

export default function useSettings() {

    const { SettingsState, ModifyAll } = useContext(SettingsContext);
    const { MemoryState, ModifyState } = useContext(MemoryContext);
    const { Set } = usePngtubeStudioAPI();

    function Compare() {
        return JSON.stringify(MemoryState.SettingsPreload) === JSON.stringify(SettingsState)
        ? true
        : false
    }

    function Discard() {
        ModifyAll(MemoryState.SettingsPreload)
    }

    function Save() {
        ModifyState({
            action: 'SettingsPreload',
            value: SettingsState
        })
        Set.SendSettings('sendSettings', SettingsState)
    }

    return {
        Compare,
        Discard,
        Save
    }

}