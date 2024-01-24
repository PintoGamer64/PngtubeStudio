import { useEffect, useContext, useRef, useMemo } from 'react';
import UpdateAvatarStyleClass from '../../helpers/UpdateAvatarStyleClass';
import { AudioContext_Def, AvatarsContext } from '../../contexts';
import useMicrophone from '../../hooks/EventMicrophone';
import { ResolveRouteLeft } from '../../utils';

export default function ModelViewer() {

    const { AudioState } = useContext(AudioContext_Def);
    const { AvatarsState } = useContext(AvatarsContext);

    const Animate = useRef<HTMLImageElement>(null!);
    const { Volume } = useMicrophone();

    useEffect(() => {
        UpdateAvatarStyleClass({
            Animate: Animate.current,
            AudioState,
            Volume
        })
        return () => { };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Volume])

    const State_1 = ResolveRouteLeft(`${AvatarsState.Data[AvatarsState.Select - 1].Data.Router}\\${AvatarsState.Data[AvatarsState.Select - 1].Data.States[0][0]}.png`);
    const State_2 = ResolveRouteLeft(`${AvatarsState.Data[AvatarsState.Select - 1].Data.Router}\\${AvatarsState.Data[AvatarsState.Select - 1].Data.States[0][1]}.png`);

    const ActualModelStyle = useMemo(() => {
        if (AudioState.State) {
            if ((Volume / AudioState.Amplifier) * 100 < (AudioState.Sensibility / 100) * 100) {
                return State_1
            }
            if ((Volume / AudioState.Amplifier) * 100 > (AudioState.Sensibility / 100) * 100) {
                return State_2
            }
        } else {
            return State_1
        }
    }, [Volume, AudioState.State, AudioState.Amplifier, AudioState.Sensibility, State_2, State_1])

    return <img id="ActualModel" ref={Animate} src={ActualModelStyle} alt="ModelSpritesManager" width={400} height={400} />
}