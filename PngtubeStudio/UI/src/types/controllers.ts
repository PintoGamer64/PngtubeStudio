// Complements
export type TypeComplement = {
    minLength?: number,
    maxLength?: number,
    steps?: number,
    Switch?: boolean,
    Text: string,
    Definition: string,
    value?: string,
    Accept?: "Non-Drag" | "Drag",
    Actions?: "Delete" | "Select" | "Multi-Delete",
    Elements?: {
        IdElement: number,
        TextElement: string,
        ImageElement: string,
        DefinitionElement?: string
    }[]
}