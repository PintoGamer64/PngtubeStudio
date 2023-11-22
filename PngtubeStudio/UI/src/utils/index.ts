export const ResolveRoute = (stringParam: string) => {
    let newData: string = "";
    const newVariable = stringParam.split("/");

    for (let i = 0; i < newVariable.length; i++) {
        newData += `${newVariable[i]}\\`
    }

    return newData.slice(0, -1);
}