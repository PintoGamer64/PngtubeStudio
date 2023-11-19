import { useState, useEffect } from 'react';
import { UpdateVolume } from '../helpers/UpdateVolume';

export default function useMicrophone() {

    const [Volume, setVolume] = useState(0);

    useEffect(() => {
        let intervalTime: NodeJS.Timeout;
        navigator.mediaDevices
            .getUserMedia({ audio: { autoGainControl: false } })
            .then((stream) => {
                const audioContext = new AudioContext();
                const source = audioContext.createMediaStreamSource(stream);
                const analyser = audioContext.createAnalyser();
                source.connect(analyser);
                analyser.fftSize = 32;
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                const execution = () => UpdateVolume(analyser, dataArray, bufferLength, (value: number) => {
                    setVolume(value)
                })

                intervalTime = setInterval(execution, 33);
            })
            .catch((error) => {
                console.error("Error al obtener acceso al micrófono:", error);
            });
        return () => clearInterval(intervalTime);
    }, []);

    return {
        Volume
    };
}