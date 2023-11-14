// Components
import WindowEvents from "../hooks/EventWindow";
import Close from "../icons/Close";
import MaxMin from "../icons/MaxMin";
import Minimize from "../icons/Minimize";
// Styles
import "./styles/TopBar.css"

export default function Topbar() {

    const { MinimizeEvent, CloseEvent, MaxMinEvent } = WindowEvents();

    return (
        <header id="TopBar">
            <nav id="TopBar-Section">
                <div className="TopBar-Title">
                    <h1>PNGTUBE STUDIO</h1>
                </div>
                <div className="TopBar-Buttons">
                    <button className="TopBar-Buttons-Icon" onClick={MinimizeEvent}>
                        <Minimize />
                    </button>
                    <button className="TopBar-Buttons-Icon" onClick={MaxMinEvent}>
                        <MaxMin />
                    </button>
                    <button className="TopBar-Buttons-Icon" onClick={CloseEvent}>
                        <Close />
                    </button>
                </div>
            </nav>
        </header>
    )
}