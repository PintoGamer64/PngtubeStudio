// Modules
import { AvatarsContext } from "..";
import usePngtubeStudioAPI from "../../hooks/PngtubeStudioAPI";
import { TypeModelsConfig } from "../../types/WindowEvent";
import { Contextinterface } from "../../types/contexts";

export default function AvatarsProvider({ children }: Contextinterface) {

    const { Get } = usePngtubeStudioAPI();

    const Models: TypeModelsConfig = Get.Models("getModels");

    return (
        <AvatarsContext.Provider value={{
            AvatarsState: Models
        }}>
            {children}
        </AvatarsContext.Provider>
    )
}