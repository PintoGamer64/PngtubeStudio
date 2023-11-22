// Modules
import { useContext, useEffect, useRef } from 'react';

// Contexts
import { AudioContext_Def, AvatarsContext, SettingsContext } from '../contexts'

// Utils
import { ResolveRoute } from '../utils';

// Styles
import './styles/Main.css'
import useImgURL from '../hooks/BackgroundStyle';
import useMicrophone from '../hooks/EventMicrophone';
import UpdateAvatarStyleClass from '../helpers/UpdateAvatarStyleClass';

export default function Main() {

    const { SettingsState } = useContext(SettingsContext);
    const { AvatarsState } = useContext(AvatarsContext);
    const { AudioState } = useContext(AudioContext_Def);

    const Animate = useRef<HTMLImageElement>(null!);

    const { Volume } = useMicrophone();

    useEffect(() => {
        UpdateAvatarStyleClass({
            Animate: Animate.current,
            AudioState,
            Volume
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Volume])

    return (
        <>
            <div id="ModelViewer" style={useImgURL(`${SettingsState.Wallpapers}\\${SettingsState.Config.Custom.wallpaper}.png`)}>
                <img id="ActualModel" ref={Animate} src={ResolveRoute(AvatarsState[0].Image)} className={
                    Animate ?
                        ''
                        :
                        ''
                } alt="ModelSpritesManager" width={200} height={200} />
            </div>
            <main id="Main">

            </main>
        </>
    )
}