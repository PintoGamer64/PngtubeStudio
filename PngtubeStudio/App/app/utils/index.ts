import { unlink } from "node:fs";
import { IntDownloadFiles } from "../types";
import { get } from "node:https";

export function DownloadFiles({
    DownloadUrl,
    FileStream,
    FileLocation
}: IntDownloadFiles) {
    get(DownloadUrl, (response) => {
        if (response.statusCode !== 200) return;

        response.pipe(FileStream)

        FileStream.on('finish', () => {
            console.log('Archivo descargado y copiado con éxito');
        });

        FileStream.on('error', (err) => {
            unlink(FileLocation, () => {
                console.error('Error al escribir el archivo:', err);
            });
        });
    }).on('error', (err) => {
        console.error('Error al descargar el archivo:', err);
    });
}