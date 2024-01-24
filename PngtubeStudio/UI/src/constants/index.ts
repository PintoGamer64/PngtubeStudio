// Moduels
import { useContext } from 'react';

import { PropagtorStructureComponents, PropagtorStructureList } from "../types/packages";

/* import Checkbox from "../components/packages/Checkbox";

 */
/* export  */

import { AudioContext_Def, MemoryContext, SettingsContext } from "../contexts"
import Checkbox from '../components/packages/Checkbox';
import Color from '../components/packages/Color';
import Select from '../components/packages/Select';

export default function Contants() {
    const { MemoryState, ModifyState: ModifyMemory } = useContext(MemoryContext)

    const { SettingsState, ModifyState: ModifySettings } = useContext(SettingsContext);

    const { AudioState, ModifyState: ModifyAudio } = useContext(AudioContext_Def);

    // Functions
    function CustomBackground() {
        if (SettingsState.Config.Custom.type === "Color") {
            ModifySettings({
                action: 'Config',
                value: {
                    ...SettingsState.Config,
                    Custom: {
                        ...SettingsState.Config.Custom,
                        type: 'Image'
                    }
                }
            })
        } else {
            ModifySettings({
                action: 'Config',
                value: {
                    ...SettingsState.Config,
                    Custom: {
                        ...SettingsState.Config.Custom,
                        type: 'Color'
                    }
                }
            })
        }
    }

    function ColorSetter(color: string) {
        ModifySettings({
            action: 'Config',
            value: {
                ...SettingsState.Config,
                Custom: {
                    ...SettingsState.Config.Custom,
                    colorBackground: color
                }
            }
        });
    }

    function ChangeFftsize(value: string) {
        ModifySettings({
            action: 'Config',
            value: {
                ...SettingsState.Config,
                AudioFftsize: parseInt(value),
                Custom: {
                    ...SettingsState.Config.Custom
                }
            }
        });
        ModifyAudio({
            action: 'FftSize',
            value: parseInt(value)
        })
    }

    // Miscelaneo

    const VoiceFftsizes: number[] = [32, 64, 128, 256, 512, 1024, 2048, 4096]

    // Config
    const SettingsRoutes: PropagtorStructureComponents[] = [
        {
            Id: 1,
            Component: Checkbox,
            Execute: CustomBackground,
            ChangeCondition: SettingsState.Config.Custom.type === 'Color',
            Complement: {
                Text: "Color / Imagen",
                Definition: "Escoge entre una imagen o un color de fondo",
            }
        },
        {
            Id: 2,
            Component: Color,
            Execute: ColorSetter,
            Complement: {
                Text: "Paleta de color",
                Definition: "Escoge el color de fondo que quieras",
                value: SettingsState.Config.Custom.colorBackground
            }
        }
    ]

    const VoiceRoutes: PropagtorStructureComponents[] = [
        {
            Id: 1,
            Component: Select,
            Complement: {
                Text: "Tamaño de Buffer",
                Definition: "Aumentara la capacidad de deteccion (puede generar problemas de rendimiento)",
                value: `${AudioState.FftSize}`
            },
            Execute: ChangeFftsize
        }
    ]

    const SettingsListDetails: PropagtorStructureList = [
        {
            Id: 0,
            Text: "Appareance",
            ChangeCondition: MemoryState.SettingRouter === "Appareance",
            Execution: () => ModifyMemory({
                action: 'SettingRouter',
                value: "Appareance"
            })
        },
        {
            Id: 1,
            Text: "Voice",
            ChangeCondition: MemoryState.SettingRouter === "Voice",
            Execution: () => ModifyMemory({
                action: 'SettingRouter',
                value: "Voice"
            })
        },
        {
            Id: 2,
            Text: "Advanced",
            ChangeCondition: MemoryState.SettingRouter === "Advanced",
            Execution: () => ModifyMemory({
                action: 'SettingRouter',
                value: "Advanced"
            })
        }
    ]

    return {
        SettingsListDetails,
        SettingsRoutes,
        VoiceRoutes,
        consts: {
            VoiceFftsizes
        }
    }
}