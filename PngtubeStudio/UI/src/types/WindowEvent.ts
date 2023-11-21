//Const
export type TypeEventWindow = 'minimize' | 'close' | 'restore';
export type TypeEventModels = 'getModels' | 'sendModels';
export type TypeEventSettings = 'getSettings' | 'sendSettings';

// Definitions
export type TypeModelsConfig = {
    Id: string | number,
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

//Methods
export type TypeEventWindow_Func = (typeEvent: TypeEventWindow) => void
export type TypeEventModels_Func = (typeEvent: TypeEventModels) => TypeModelsConfig
export type TypeEventSettings_Func = (typeEvent: TypeEventSettings) => TypeBaseConfig