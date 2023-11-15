import { useEffect, useRef, useState } from "react";
import useMicrophone from "../../hooks/EventMicrophone"
import { AvarageLevels } from "../../constants";
import { MicrophoneClose, MicrophoneOpen } from "../../icons/Microphone";

export default function Microphone() {

    const [AudioState, setAudioState] = useState(true)
    const Audio = useRef(0)
    const sensibility = useRef(50)

    const { Volume } = useMicrophone();

    const canvasLevelRef = useRef<HTMLCanvasElement>(null!);

    useEffect(() => {
        if (AudioState) {

            if (Volume > 100) Audio.current = Math.floor(100)
            else Audio.current = Math.floor(Volume)

            const canvasLevel = canvasLevelRef.current;
            const ctxLevel = canvasLevel.getContext("2d");

            if (ctxLevel !== null) {

                if (Volume > AvarageLevels.LOW) {
                    ctxLevel.fillStyle = "#41AF2E";
                }
                if (Volume > AvarageLevels.HALF) {
                    ctxLevel.fillStyle = "#FFFF00";
                }
                if (Volume > AvarageLevels.HIGH) {
                    ctxLevel.fillStyle = "#FF0000";
                }

                const rectWidth = (canvasLevel.width * Volume) / 100;

                ctxLevel.clearRect(0, 0, canvasLevel.width, canvasLevel.height);
                ctxLevel.fillRect(0, 0, rectWidth, canvasLevel.height);

            }
        } else {

            Audio.current = 0

            const canvasLevel = canvasLevelRef.current;
            const ctxLevel = canvasLevel.getContext("2d");

            ctxLevel !== null && ctxLevel.clearRect(0, 0, canvasLevel.width, canvasLevel.height);
        }
    }, [Volume, AudioState]);

    return (
        <div id="FooBar-Microphone">
            <button id="FooBar-Microphone-Button" onClick={() => setAudioState(!AudioState)}>
                {AudioState ? <MicrophoneOpen /> : <MicrophoneClose />}
            </button>
            <div id="FooBar-Microphone-Visualizer">
                <canvas id="FooBar-Microphone-Visualizer-Level" ref={canvasLevelRef} width={200} height={20} />
                <input type="range" id="FooBar-Microphone-Visualizer-Slider" value={sensibility.current} min={0} max={100} onChange={(event) => {
                    sensibility.current = parseInt(event.target.value);
                }} />
            </div>
            <h2>{Audio.current}</h2>
        </div>
    )
}