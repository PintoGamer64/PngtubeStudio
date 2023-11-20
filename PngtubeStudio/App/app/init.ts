// Node Modules
import { mkdirSync, writeFileSync, existsSync, copyFileSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

// Types
import { TypeBaseConfig, TypeModelsConfig } from "./types";

export default function InitProcess() {
    let baseConfig: TypeBaseConfig = {
        Resources: `${join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Resources')}`,
        Wallpapers: `${join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Wallpapers')}`,
        Model: 'Ookami',
        Config: {
            hardwareAcceleration: true,
            trayMenu: true,
            Custom: {
                type: 'Color', // Color | Image
                colorBackground: '#00ff00', // Hex
                wallpaper: 'Default', // Wallpaper File Name
                brightness: 100
            }
        }
    };
    let modelsConfig: TypeModelsConfig = [
        {
            Id: 1,
            Name: "Ookami",
            Owner: "PintoGamer64",
            Date: "2023-03-15T05:00:00.000Z",
            Image: "C:\\Users\\JoanCardozo\\AppData\\Roaming\\PNGtubeSettings\\Models\\Ookami\\Ookami.png",
            Data: {
                States: [
                    ["Ookami", "Ookami2"]
                ]
            },
            URL: ""
        }
    ];
    let resources = readdirSync(join(__dirname, '\\resources'));
    let pathsConfig = [
        {
            data: join(homedir(), 'AppData\\Roaming\\PNGtubeSettings')
        },
        {
            data: join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Models')
        },
        {
            data: join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Resources')
        },
        {
            data: join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Wallpapers')
        }
    ]
    // Create the main directories to set the app config
    function CreateConfigDirectories() {
        for (let paths of pathsConfig) {
            if (!existsSync(paths.data)) {
                mkdirSync(paths.data);
            }
        }
    };
    function CreateConfigBase() {
        if (!existsSync(join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\settings.json'))) {
            writeFileSync(
                join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\settings.json'),
                JSON.stringify(baseConfig, null, 4),
                { encoding: "utf-8" }
            );
        }
    };
    function CreateConfigModels() {
        if (!existsSync(join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Models\\models.json'))) {
            writeFileSync(
                join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Models\\models.json'),
                JSON.stringify(modelsConfig, null, 4),
                { encoding: "utf-8" }
            );
        }
    }
    function CreateResources() {
        for (let file of resources) {
            if (!existsSync(join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Resources', file))) {
                copyFileSync(
                    join(__dirname, '\\resources', file),
                    join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Resources', file)
                );
            }
        }
    }
    function __Init__() {
        CreateConfigDirectories();
        CreateConfigBase();
        CreateConfigModels();
        CreateResources();
    }
    return {
        __Init__
    }
}