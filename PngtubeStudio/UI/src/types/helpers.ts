// Functions
export type UpdateCanvasVolume = {
    AudioState: boolean,
    Volume: number,
    sensibility: React.MutableRefObject<number>,
    Audio: React.MutableRefObject<number>,
    canvasLevelRef: React.MutableRefObject<HTMLCanvasElement>,
    amplifier: React.MutableRefObject<number>
}