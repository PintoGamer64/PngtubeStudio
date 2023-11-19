import { useEffect, useRef, useState } from "react";
import useMicrophone from "../../hooks/EventMicrophone"
import UpdateCanvasVolume from "../../helpers/UpdateCanvasVolume";
import MicrophoneIconButton from "./components/Microphone-Icon";

export default function Microphone() {

    const [AudioState, setAudioState] = useState(true)
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
            canvasLevelRef,
            amplifier
        })
    }, [Volume, AudioState]);

    return (
        <div id="FooBar-Microphone">
            <MicrophoneIconButton AudioState={AudioState} setAudioState={setAudioState} />
            <div id="FooBar-Microphone-Controls">
                <div id="FooBar-Microphone-Visualizer">
                    <canvas id="FooBar-Microphone-Visualizer-Level" ref={canvasLevelRef} width={200} height={20} />
                    <input type="range" id="FooBar-Microphone-Visualizer-Slider" value={sensibility.current} min={0} max={100} onChange={(event) => {
                        if (parseInt(event.target.value) < 15) sensibility.current = 15;
                        else sensibility.current = parseInt(event.target.value);
                    }} />
                </div>
                <div id="FooBar-Microphone-Amplifier">
                    <input type="range" id="FooBar-Microphone-Amplifier-Slider" value={amplifier.current} min={0} max={200} onChange={(event) => {
                        if (parseInt(event.target.value) < 50) amplifier.current = 50;
                        else amplifier.current = parseInt(event.target.value);
                    }} />
                </div>
            </div>
            <h2>{Audio.current}</h2>
        </div>
    )
}