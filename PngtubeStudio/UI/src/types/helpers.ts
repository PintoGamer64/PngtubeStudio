// Functions
export type UpdateCanvasVolume = {
    AudioState: boolean,
    Volume: number,
    Audio: React.MutableRefObject<number>,
    canvasLevelRef: React.MutableRefObject<HTMLCanvasElement>,
    amplifier: React.MutableRefObject<number>
}