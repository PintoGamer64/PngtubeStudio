//Components
import LateralLeft from "./controllers/LateralLeft";
import Microphone from "./controllers/Microphone";
//Styles
import "./styles/FooBar.css"

export default function FooBar() {

    return (
        <footer id="FooBar">
            <LateralLeft />
            <Microphone />
            <div id="FooBar-LateralRight">

            </div>
        </footer>
    )
}