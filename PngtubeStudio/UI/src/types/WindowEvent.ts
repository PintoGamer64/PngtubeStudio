//Const
export type TypeEventWindow = 'minimize' | 'close' | 'restore' | 'getFile';
export type TypeEventSettings = 'getSettings' | 'sendSettings';

// Definitions
export type TypeModelConfigBase = {
    Id: number,
    Name: string,
    Owner: string,
    Date: string,
    Image: string,
    Data: {
        Router: "C:\\Users\\JoanCardozo\\AppData\\Roaming\\PNGtubeSettings\\Avatars\\Ookami"
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
    Model: string,
    Avatars: string,
    Config: {
        AudioFftsize:  32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096,
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
    Sensibility: number,
    FftSize: 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096
}

//Methods
export type TypeEventWindow_Func = (typeEvent: TypeEventWindow) => void
export type TypeEventModels_FuncGet = (typeEvent: "getModels") => TypeModelConfigBase
export type TypeEventModels_FuncSet = (typeEvent: "sendModels", Model: TypeModelConfigBase) => void
export type TypeEventSettings_FuncGet = (typeEvent: TypeEventSettings) => TypeBaseConfig
export type TypeEventSettings_FuncSet = (typeEvent: TypeEventSettings, settingsValue: TypeBaseConfig) => TypeBaseConfig