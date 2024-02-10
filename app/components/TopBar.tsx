import React from 'react'

// Components
import useWindowEvents from "../hooks/EventWindow";
import Close from "../icons/Close";
import MaxMin from "../icons/MaxMin";
import Minimize from "../icons/Minimize";
// Styles
import "./styles/TopBar.css"

export default function Topbar() {

    const { MinimizeEvent, CloseEvent, MaxMinEvent } = useWindowEvents();

    return (
        <header id="TopBar">
            <nav id="TopBar-Section">
                <div className="TopBar-Title" >
                    <h1>PNGTUBE STUDIO</h1>
                </div>
                <div className="TopBar-Buttons">
                    <button id="TopBar-Buttons-Minimize" className="TopBar-Buttons-Icon" onClick={MinimizeEvent}>
                        <Minimize />
                    </button>
                    <button id="TopBar-Buttons-MaxMin" className="TopBar-Buttons-Icon" onClick={MaxMinEvent}>
                        <MaxMin />
                    </button>
                    <button id="TopBar-Buttons-Close" className="TopBar-Buttons-Icon" onClick={CloseEvent}>
                        <Close />
                    </button>
                </div>
            </nav>
        </header>
    )
}