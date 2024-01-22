//Components
import LateralLeft from "./controllers/LateralLeft";
import LateralRight from "./controllers/LateralRight";
import Microphone from "./controllers/Microphone";
//Styles
import "./styles/FooBar.css"

export default function FooBar() {

    return (
        <footer id="FooBar">
            <LateralLeft />
            <Microphone />
            <LateralRight />
        </footer>
    )
}