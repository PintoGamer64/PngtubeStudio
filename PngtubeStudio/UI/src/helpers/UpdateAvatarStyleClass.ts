import { TypeUpdateAvatarStyleClass } from '../types/helpers'

export default function UpdateAvatarStyleClass({
    Animate,
    AudioState,
    Volume
}: TypeUpdateAvatarStyleClass
) {

    if (AudioState.State) {
        if ((Volume / AudioState.Amplifier) * 100 < (AudioState.Sensibility / 100) * 100) {
            Animate.classList.remove('AvatarActive');
        }
        if ((Volume / AudioState.Amplifier) * 100 > (AudioState.Sensibility / 100) * 100) {
            Animate.classList.add('AvatarActive');
        }
    } else {
        Animate.classList.remove('AvatarActive');
    }

}