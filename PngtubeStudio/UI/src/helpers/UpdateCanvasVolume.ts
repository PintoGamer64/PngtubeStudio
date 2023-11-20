import { UpdateCanvasVolume } from "../types/helpers";

export default function UpdateCanvasVolume({
    AudioState,
    Volume,
    Audio,
    sensibility,
    canvasLevelRef,
    amplifier
}: UpdateCanvasVolume
): void {
    if (AudioState) {
        if (Volume > amplifier.current) Audio.current = Math.floor(amplifier.current)
        else Audio.current = Math.floor(Volume)

        const canvasLevel = canvasLevelRef.current;
        const ctxLevel = canvasLevel.getContext("2d")!;

        if ((Volume / amplifier.current) * 100 < (sensibility.current / 100) * 100) {
            ctxLevel.fillStyle = "#41AF2E";
        }
        if ((Volume / amplifier.current) * 100 > (sensibility.current / 100) * 100) {
            ctxLevel.fillStyle = "#FF0000";
        }

        const rectWidth = (canvasLevel.width * Volume) / amplifier.current;

        ctxLevel.clearRect(0, 0, canvasLevel.width, canvasLevel.height);
        ctxLevel.fillRect(0, 0, rectWidth, canvasLevel.height);

    } else {

        Audio.current = 0

        const canvasLevel = canvasLevelRef.current;
        const ctxLevel = canvasLevel.getContext("2d");

        ctxLevel !== null && ctxLevel.clearRect(0, 0, canvasLevel.width, canvasLevel.height);
    }
}