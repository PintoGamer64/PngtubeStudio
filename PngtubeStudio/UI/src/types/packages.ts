/* eslint-disable @typescript-eslint/no-explicit-any */
import { TypeComplement } from "./controllers"

export type PropagtorStructureList = {
    Id: number,
    Text: string,
    ChangeCondition: boolean,
    Execution: () => void
}[]

export type PropagtorStructureComponents = {
    Id: number,
    Component: JSX.ElementType,
    Execute: (args?: any) => void,
    ChangeCondition?: boolean,
    Complement: TypeComplement
}

// Functions
export interface IntComponentPropagator {
    Data: PropagtorStructureComponents[],
}

export type CheckboxType = {
    Execute: () => void,
    Complement: TypeComplement
    ChangeCondition?: boolean
}

export type ColorType = {
    Execute: (args?: any) => void,
    Complement: TypeComplement
    value: string
}