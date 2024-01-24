import { WriteStream } from "fs";

export type TypeEventWindow = 'minimize' | 'close' | 'restore' | 'getFile';
export type TypeEventModels = 'getModels' | 'sendModels';
export type TypeEventSettings = 'getSettings' | 'sendSettings';

export type TypeModelsConfigIndividual = {
    Id: string | number,
    Name: string,
    Owner: string,
    Date: string,
    Image: string,
    Data: {
        Router: string
        States: [
            string[]
        ]
    },
    URL: string
}

export type TypeModelsConfig = TypeModelsConfigIndividual[]
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

export interface IntDownloadFiles {
    DownloadUrl: string,
    FileStream: WriteStream,
    FileLocation: string
}