import React from 'react'

import Contants from "../../constants";
import { SelectType } from "../../types/packages";

export default function Select({
    Complement,
    Execute
}: SelectType
) {

    const { consts } = Contants();

    return (
        <div className="OptionsElement">
            <div className="OptionsElement-Data">
                <h2>{Complement.Text}</h2>
                <p> {Complement.Definition} </p>
            </div>
            <div className="OptionsElement-Execution">
                <select value={Complement.value} className="OptionsElement-Execution-Select" onChange={(ev) => {
                    if (`${Complement.value}` !== ev.target.value) {
                        Execute(ev.target.value)
                    }
                }}>
                    {
                        consts.VoiceFftsizes.map(value => <option value={value}>{value}</option>)
                    }
                </select>
            </div>
        </div>
    )
}