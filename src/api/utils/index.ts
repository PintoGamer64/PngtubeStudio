import { TypeBaseConfig, TypeModelsConfigIndividual } from "../../types";
import { readFileSync } from "node:fs";

export async function readJSON(route: string) {
    return JSON.parse(
        readFileSync(route, { encoding: 'utf-8' })
    )
}