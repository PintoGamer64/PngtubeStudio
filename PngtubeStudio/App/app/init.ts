// Node Modules
import { mkdirSync, writeFileSync, existsSync, createWriteStream, unlink, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

// Types
import { TypeBaseConfig, TypeModelsConfig } from "./types";
import { DownloadModels, DownloadResourcesLink, DownloadWallpapersLink, pathsConfig } from "./constants";
import { DownloadFiles, EncriptData, ReadPasswords } from "./utils";
import { randomBytes } from "node:crypto";

export default function InitProcess() {

    const Ookami = readFileSync(
        "C:\\Users\\JoanCardozo\\Documents\\New_PngtubeStudio\\Assets\\Ookami.txt",
    ).toString()

    const Ookami2 = readFileSync(
        "C:\\Users\\JoanCardozo\\Documents\\New_PngtubeStudio\\Assets\\Ookami2.txt",
    ).toString()

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
    }
    const modelsConfig: TypeModelsConfig = [
        {
            Id: 1,
            Name: "Ookami",
            Owner: "PintoGamer64",
            Date: "2023-03-15T05:00:00.000Z",
            Image: "C:\\Users\\JoanCardozo\\AppData\\Roaming\\PNGtubeSettings\\Avatars\\Ookami\\Ookami.png",
            Data: {
                States: [
                    [Ookami, Ookami2]
                ]
            },
            URL: "https://github.com/PintoGamer64"
        }
    ];

    // Create Passwords To Encript o Desencrypt Files
    function GeneratePasswords() {
        const searchPath = join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\bin')
        !existsSync(searchPath) && writeFileSync(
            searchPath,
            Buffer.from(
                JSON.stringify({
                    key: randomBytes(32),
                    iv: randomBytes(16)
                })
            ),
            {
                encoding: 'hex'
            }
        );
    }
    // Create the main directories to set the app config
    function CreateConfigDirectories(): void {
        pathsConfig.map(path => {
            if (!existsSync(path)) mkdirSync(path);
        })
    };
    async function CreateConfigBase(): Promise<void> {
        const searchPath = join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\settings');
        ReadPasswords
            .then(async ({ key, iv }) => {
                !existsSync(searchPath) && writeFileSync(
                    searchPath,
                    await EncriptData(
                        key,
                        iv,
                        JSON.stringify(baseConfig, null, 4)
                    ),
                    { encoding: "utf-8" }
                );
            })
            .catch(() => console.log("Failed To Create Config"))
    };
    function CreateConfigModels(): void {
        const searchPath = join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Avatars\\avatars');

        ReadPasswords
            .then(async ({ key, iv }) => {
                !existsSync(searchPath) && writeFileSync(
                    searchPath,
                    await EncriptData(
                        key,
                        iv,
                        JSON.stringify(modelsConfig, null, 4)
                    ),
                    { encoding: "utf-8" }
                );
            })
            .catch(() => console.log("Failed To Create Config"))
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
    async function __Init__(): Promise<void> {
        GeneratePasswords();
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