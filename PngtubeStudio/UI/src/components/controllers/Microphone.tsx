import { useEffect, useRef, useState, useContext } from "react";
import UpdateCanvasVolume from "../../helpers/UpdateCanvasVolume";
import MicrophoneIconButton from "./components/Microphone-Icon";
import { AudioContext_Def } from "../../contexts";
import useMicrophone from "../../hooks/EventMicrophone";

export default function Microphone() {

    const { AudioState, ModifyState } = useContext(AudioContext_Def);

    const [HoverInfo, setHoverInfo] = useState({
        Sensibility: false,
        Amplifier: false
    })
    const canvasLevelRef = useRef<HTMLCanvasElement>(null!);

    const { Volume } = useMicrophone();

    useEffect(() => {
        UpdateCanvasVolume({
            canvasLevelRef,
            AudioState,
            ModifyState,
            Volume
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Volume]);

    return (
        <div id="FooBar-Microphone">
            <div style={{
                display: HoverInfo.Sensibility ? 'flex' : 'none'
            }} className="FooBar-Microphone-Target">
                <p className="FooBar-Microphone-Target-Elementor">Sensibilidad: {AudioState.Sensibility}</p>
            </div>
            <div style={{
                display: HoverInfo.Amplifier ? 'flex' : 'none'
            }} className="FooBar-Microphone-Target">
                <p className="FooBar-Microphone-Target-Elementor">Amplificador: {AudioState.Amplifier}</p>
            </div>
            <p id="FooBar-Microphone-Counter">{AudioState.Audio}</p>
            <div id="FooBar-Microphone-Controls">
                <div id="FooBar-Microphone-Amplifier">
                    <input type="range" id="FooBar-Microphone-Amplifier-Slider" value={AudioState.Amplifier} min={0} max={200}
                        onChange={(event) => {
                            if (parseInt(event.target.value) < 15) ModifyState({
                                action: 'Amplifier',
                                value: 15
                            });
                            else ModifyState({
                                action: 'Amplifier',
                                value: parseInt(event.target.value)
                            })
                        }}
                        onMouseEnter={() => {
                            setHoverInfo({
                                ...HoverInfo,
                                Amplifier: true
                            })
                        }}
                        onMouseLeave={() => {
                            setHoverInfo({
                                ...HoverInfo,
                                Amplifier: false
                            })
                        }}
                        style={{
                            background: `linear-gradient(90deg, rgba(0,255,240,1) 0%, rgba(0,17,255,1) ${(AudioState.Amplifier / 200) * 100}%, rgba(255,255,255,1) ${(AudioState.Amplifier / 200) * 100}%)`
                        }} />
                </div>
                <div id="FooBar-Microphone-Visualizer">
                    <canvas id="FooBar-Microphone-Visualizer-Level" ref={canvasLevelRef} width={200} height={20} />
                    <input type="range" id="FooBar-Microphone-Visualizer-Slider" value={AudioState.Sensibility} min={0} max={100}
                        onChange={(event) => {
                            if (parseInt(event.target.value) < 5) ModifyState({
                                action: 'Sensibility',
                                value: 5
                            });
                            else ModifyState({
                                action: 'Sensibility',
                                value: parseInt(event.target.value)
                            })
                        }}
                        onMouseEnter={() => {
                            setHoverInfo({
                                ...HoverInfo,
                                Sensibility: true
                            })
                        }}
                        onMouseLeave={() => {
                            setHoverInfo({
                                ...HoverInfo,
                                Sensibility: false
                            })
                        }}/>
                </div>
            </div>
            <MicrophoneIconButton />
        </div>
    )
}