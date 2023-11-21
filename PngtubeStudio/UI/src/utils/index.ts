export function ResolveRoute(stringParam: string) {
    let newData: string = "";
    const newVariable = stringParam.split("\\");

    for (let i = 0; i < newVariable.length; i++) {
        newData += `/${newVariable[i]}`
    }

    console.log(newData);
    console.log(newData.slice(1));
    
    return newData.slice(1);
}