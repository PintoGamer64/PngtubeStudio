//Const
export type TypeEventWindow = 'minimize' | 'close' | 'restore';
export type TypeEventModels = 'getModels' | 'sendModels';
export type TypeEventSettings = 'getSettings' | 'sendSettings';

// Definitions
export type TypeModelConfigBase = {
    Id: number,
    Name: string,
    Owner: string,
    Date: string,
    Image: string,
    Data: {
        States: [
            string[]
        ]
    },
    URL: string
}[]

export type TypeModelsConfig = {
    Data: TypeModelConfigBase,
    Select: number,
    
}
export type TypeBaseConfig = {
    Resources: string,
    Wallpapers: string,
    Avatars: string,
    Model: string,
    Config: {
        hardwareAcceleration: boolean,
        trayMenu: boolean,
        Custom: {
            type: 'Color' | 'Image',
            colorBackground: `#${string}`,
            wallpaper: string,
            brightness: number
        }
    }
}
export type TypeAudioConfig = {
    State: boolean,
    Amplifier: number,
    Audio: number,
    Sensibility: number,
    FftSize: 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096
}

//Methods
export type TypeEventWindow_Func = (typeEvent: TypeEventWindow) => void
export type TypeEventModels_Func = (typeEvent: TypeEventModels) => TypeModelConfigBase
export type TypeEventSettings_Func = (typeEvent: TypeEventSettings) => TypeBaseConfig