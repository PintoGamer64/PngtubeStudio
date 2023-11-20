import { readFile } from "node:fs/promises";

export async function readJSON(route: string) {
    const file = await readFile(route, {
        encoding: 'utf-8'
    })

    return JSON.parse(file)
}