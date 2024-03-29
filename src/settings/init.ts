// Node Modules
import { mkdirSync, writeFileSync, existsSync, createWriteStream } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

// Types
import { TypeBaseConfig, TypeModelsConfig } from "../modules";
import { DownloadModels, DownloadResourcesLink, DownloadWallpapersLink, pathsConfig } from "../constants";
import { DownloadFiles, EncriptData, ReadPasswords } from "../utils";
import { randomBytes } from "node:crypto";
import { Ookami, Ookami2 } from "../assets";

export default function InitProcess() {

    const KeyValuesDecripters = {
        key: randomBytes(32),
        iv: randomBytes(16)
    }

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
            Image: Ookami,
            Data: {
                States: [
                    [Ookami, Ookami2]
                ]
            },
            URL: "https://github.com/PintoGamer64"
        }
    ];

    async function CreateConfigDirectories(): Promise<void> {
        try {
            for (const path of pathsConfig) {
                if (!existsSync(path)) {
                    mkdirSync(path);
                }
            }
        } catch (error) {
            console.log("Failed To Create Directories", error);
        }
    }

    // Create Passwords To Encript o Desencrypt Files
    async function GeneratePasswords(): Promise<void> {
        try {
            const searchPath = join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\bin')
            !existsSync(searchPath) && writeFileSync(
                searchPath,
                Buffer.from(
                    JSON.stringify(KeyValuesDecripters)
                )
            )
        } catch (error) {
            console.log("Failed To Generate Passwords", error);
        }
    }

    async function CreateConfigBase(): Promise<void> {
        const searchPath = join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\settings');
        try {
            if (!existsSync(searchPath)) {
                const encryptedData = await EncriptData(
                    KeyValuesDecripters.key,
                    KeyValuesDecripters.iv,
                    JSON.stringify(baseConfig, null, 4)
                );
                writeFileSync(searchPath, encryptedData, { encoding: "utf-8" });
            }
        } catch (error) {
            console.log("Failed To Create Config Base", error);
        }
    }

    async function CreateConfigModels(): Promise<void> {
        const searchPath = join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Avatars\\avatars');
        try {
            if (!existsSync(searchPath)) {
                const encryptedData = await EncriptData(
                    KeyValuesDecripters.key,
                    KeyValuesDecripters.iv,
                    JSON.stringify(modelsConfig, null, 4)
                );
                writeFileSync(searchPath, encryptedData, { encoding: "utf-8" });
            }
        } catch (error) {
            console.log("Failed To Create Config Models", error);
        }
    }

    async function CreateResources(): Promise<void> {
        try {
            for (const Download of DownloadResourcesLink) {
                const searchPath = join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Resources', Download.file);
                if (!existsSync(searchPath)) {
                    const archivoStream = createWriteStream(searchPath);
                    DownloadFiles({
                        DownloadUrl: Download.url,
                        FileLocation: searchPath,
                        FileStream: archivoStream
                    });
                }
            }
        } catch (error) {
            console.log("Failed To Create Resources", error);
        }
    }

    async function CreateWallpapers(): Promise<void> {
        try {
            for (const Download of DownloadWallpapersLink) {
                const searchPath = join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Wallpapers', Download.file);
                if (!existsSync(searchPath)) {
                    const archivoStream = createWriteStream(searchPath);
                    DownloadFiles({
                        DownloadUrl: Download.url,
                        FileLocation: searchPath,
                        FileStream: archivoStream
                    });
                }
            }
        } catch (error) {
            console.log("Failed To Create Wallpapers", error);
        }
    }

    async function CreateAvatars(): Promise<void> {
        try {
            for (const Download of DownloadModels) {
                const searchPath = join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Avatars', Download.model, Download.file);
                if (!existsSync(searchPath)) {
                    const archivoStream = createWriteStream(searchPath);
                    await DownloadFiles({
                        DownloadUrl: Download.url,
                        FileLocation: searchPath,
                        FileStream: archivoStream
                    });
                }
            }
        } catch (error) {
            console.log("Failed To Create Avatars", error);
        }
    }

    async function __Init__() {
        try {
            await CreateConfigDirectories();
            console.log("Execute CreateConfigDirectories");
            await GeneratePasswords();
            console.log("Execute GeneratePasswords");
            await CreateConfigBase();
            console.log("Execute CreateConfigBase");
            await CreateConfigModels();
            console.log("Execute CreateConfigModels");
            await CreateResources();
            console.log("Execute CreateResources");
            await CreateWallpapers();
            console.log("Execute CreateWallpapers");
            await CreateAvatars();
            console.log("Execute Application");
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return {
        __Init__
    }
}