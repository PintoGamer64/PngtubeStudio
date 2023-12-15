import { useEffect, useMemo, useContext, useRef } from 'react';
import UpdateAvatarStyleClass from '../../helpers/UpdateAvatarStyleClass';
import { AudioContext_Def, AvatarsContext, SettingsContext } from '../../contexts';
import useMicrophone from '../../hooks/EventMicrophone';
import { ResolveRouteLeft } from '../../utils';

export default function ModelViewer() {

    const { AudioState } = useContext(AudioContext_Def);
    const { AvatarsState } = useContext(AvatarsContext);
    const { SettingsState } = useContext(SettingsContext);

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const ActualModelStyle = useMemo(() => ResolveRouteLeft(AvatarsState[0].Image), [SettingsState.Model])

    return <img id="ActualModel" ref={Animate} src={ActualModelStyle} alt="ModelSpritesManager" width={400} height={400} />
}