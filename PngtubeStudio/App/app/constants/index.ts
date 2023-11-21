import { homedir } from "os"
import { join } from "path"

export const pathsConfig = [
    join(homedir(), 'AppData\\Roaming\\PNGtubeSettings'),
    join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Avatars'),
    join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Resources'),
    join(homedir(), 'AppData\\Roaming\\PNGtubeSettings\\Wallpapers')
]

export const DownloadModels = [
    "",
    "",
    "",
    "",
]

export const DownloadResourcesLink = [
    {
        file: "PNGtube_Logo_Github.png",
        url: "https://raw.githubusercontent.com/PintoGamer64/PngtubeStudio/main/Assets/PNGtube_Logo_Github.png"
    }
]