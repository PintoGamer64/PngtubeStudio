// Modules
import { useContext } from 'react';

// Contexts
import { AvatarsContext, SettingsContext } from '../contexts'

// Utils
import { ResolveRoute } from '../utils';

// Styles
import './styles/Main.css'

export default function Main() {

    const { SettingsState } = useContext(SettingsContext);
    const { AvatarsState } = useContext(AvatarsContext);

    function imgURL() {
        const responceURLWallpaper = ResolveRoute(`${SettingsState.Wallpapers}\\${SettingsState.Config.Custom.wallpaper}.png`);
        let responceStyle;
        if (SettingsState.Config.Custom.type === 'Color') {
            responceStyle = {
                background: SettingsState.Config.Custom.colorBackground
            }
        } else {
            responceStyle = {
                backgroundImage: `url("${responceURLWallpaper}")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover',
                filter: ''
            }
        }
        if (Math.floor(SettingsState.Config.Custom.brightness) !== 100) {
            responceStyle.filter = `brightness(${SettingsState.Config.Custom.brightness}%)`
        }
        return responceStyle;
    }

    return (
        <>
            <div id="ModelViewer" style={imgURL()}>
                <img id="ActualModel" src={ResolveRoute(AvatarsState[0].Image)} alt="ModelSpritesManager" width={200} height={200}/>
            </div>
            <main id="Main">

            </main>
        </>
    )
}