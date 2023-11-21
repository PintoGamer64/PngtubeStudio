export type TypeEventWindow = 'minimize' | 'close' | 'restore';
export type TypeEventModels = 'getModels' | 'sendModels';
export type TypeEventSettings = 'getSettings' | 'sendSettings';

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
    Model: string,
    Avatars: string,
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