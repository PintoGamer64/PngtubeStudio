import { useEffect, useRef, useState } from "react";
import useMicrophone from "../../hooks/EventMicrophone"
import UpdateCanvasVolume from "../../helpers/UpdateCanvasVolume";
import MicrophoneIconButton from "./components/Microphone-Icon";

export default function Microphone() {

    const [AudioState, setAudioState] = useState(true)
    const [HoverInfo, setHoverInfo] = useState({
        Sensibility: false,
        Amplifier: false
    })
    const amplifier = useRef(100)
    const Audio = useRef(0)
    const sensibility = useRef(50)
    const canvasLevelRef = useRef<HTMLCanvasElement>(null!);

    const { Volume } = useMicrophone();

    useEffect(() => {
        UpdateCanvasVolume({
            AudioState,
            Volume,
            Audio,
            sensibility,
            canvasLevelRef,
            amplifier
        })
    }, [Volume, AudioState]);

    return (
        <div id="FooBar-Microphone">
            <div style={{
                display: HoverInfo.Sensibility ? 'flex' : 'none'
            }} className="FooBar-Microphone-Target">
                <p className="FooBar-Microphone-Target-Elementor">Sensibilidad: {sensibility.current}</p>
            </div>
            <div style={{
                display: HoverInfo.Amplifier ? 'flex' : 'none'
            }} className="FooBar-Microphone-Target">
                <p className="FooBar-Microphone-Target-Elementor">Amplificador: {amplifier.current}</p>
            </div>
            <p id="FooBar-Microphone-Counter">{Audio.current}</p>
            <div id="FooBar-Microphone-Controls">
                <div id="FooBar-Microphone-Amplifier">
                    <input type="range" id="FooBar-Microphone-Amplifier-Slider" value={amplifier.current} min={0} max={200}
                        onChange={(event) => {
                            if (parseInt(event.target.value) < 50) amplifier.current = 50;
                            else amplifier.current = parseInt(event.target.value);
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
                            background: `linear-gradient(90deg, rgba(0,255,240,1) 0%, rgba(0,17,255,1) ${(amplifier.current / 200) * 100}%, rgba(255,255,255,1) ${(amplifier.current / 200) * 100}%)`
                        }} />
                </div>
                <div id="FooBar-Microphone-Visualizer">
                    <canvas id="FooBar-Microphone-Visualizer-Level" ref={canvasLevelRef} width={200} height={20} />
                    <input type="range" id="FooBar-Microphone-Visualizer-Slider" value={sensibility.current} min={0} max={100}
                        onChange={(event) => {
                            if (parseInt(event.target.value) < 15) sensibility.current = 15;
                            else sensibility.current = parseInt(event.target.value);
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
            <MicrophoneIconButton AudioState={AudioState} setAudioState={setAudioState} />
        </div>
    )
}