// Node Modules
import { mkdirSync, writeFileSync, existsSync, createWriteStream, unlink } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { get } from 'node:https';

// Types
import { TypeBaseConfig, TypeModelsConfig } from "./types";
import { DownloadModels, DownloadResourcesLink, DownloadWallpapersLink, pathsConfig } from "./constants";
import { DownloadFiles } from "./utils";

export default function InitProcess() {
    const baseConfig: TypeBaseConfig = {
        Resources: `${join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Resources')}`,
        Wallpapers: `${join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Wallpapers')}`,
        Avatars: `${join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Avatars')}`,
        Model: 'Ookami',
        Config: {
            AudioFftsize: 64,
            hardwareAcceleration: true,
            trayMenu: true,
            Custom: {
                type: 'Color', // Color | Image
                colorBackground: '#00ff00', // Hex
                wallpaper: 'Default', // Wallpaper File Name
                brightness: 100
            }
        }
    },
        modelsConfig: TypeModelsConfig = [
            {
                Id: 1,
                Name: "Ookami",
                Owner: "PintoGamer64",
                Date: "2023-03-15T05:00:00.000Z",
                Image: "C:\\Users\\JoanCardozo\\AppData\\Roaming\\PNGtubeSettings\\Avatars\\Ookami\\Ookami.png",
                Data: {
                    Router: "C:\\Users\\JoanCardozo\\AppData\\Roaming\\PNGtubeSettings\\Avatars\\Ookami",
                    States: [
                        ["Ookami", "Ookami2"]
                    ]
                },
                URL: "https://github.com/PintoGamer64"
            }
        ];

    // Create the main directories to set the app config
    function CreateConfigDirectories(): void {
        pathsConfig.map(path => {
            if (!existsSync(path)) mkdirSync(path);
        })
    };
    function CreateConfigBase(): void {
        const searchPath = join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\settings.json')

        !existsSync(searchPath) && writeFileSync(
            searchPath,
            JSON.stringify(baseConfig, null, 4),
            { encoding: "utf-8" }
        );
    };
    function CreateConfigModels(): void {
        const searchPath = join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Avatars\\avatars.json')

        !existsSync(searchPath) && writeFileSync(
            searchPath,
            JSON.stringify(modelsConfig, null, 4),
            { encoding: "utf-8" }
        );
    }
    function CreateResources(): void {
        DownloadResourcesLink.map((Download) => {
            const searchPath = join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Resources', Download.file)
            if (!existsSync(searchPath)) {
                const archivoStream = createWriteStream(searchPath);
                DownloadFiles({
                    DownloadUrl: Download.url,
                    FileLocation: searchPath,
                    FileStream: archivoStream
                })
            }
        })
    }
    function CreateAvatars() {
        DownloadModels.map(Download => {
            const searchPath = join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Avatars', Download.model, Download.file)
            if (!existsSync(searchPath)) {
                const archivoStream = createWriteStream(searchPath);
                DownloadFiles({
                    DownloadUrl: Download.url,
                    FileLocation: searchPath,
                    FileStream: archivoStream
                })
            }
        })
    }
    function CreateWallpapers() {
        DownloadWallpapersLink.map(Download => {
            const searchPath = join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Wallpapers', Download.file)
            if (!existsSync(searchPath)) {
                const archivoStream = createWriteStream(searchPath);
                DownloadFiles({
                    DownloadUrl: Download.url,
                    FileLocation: searchPath,
                    FileStream: archivoStream
                })
            }
        })
    }
    function __Init__(): void {
        CreateConfigDirectories();
        CreateConfigBase();
        CreateConfigModels();
        CreateResources();
        CreateWallpapers();
        CreateAvatars();
    }
    return {
        __Init__
    }
}