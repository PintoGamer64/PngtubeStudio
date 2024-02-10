import React from 'react'

import { CheckboxType } from "../../types/packages";

export default function Checkbox({ Complement, Execute, ChangeCondition }: CheckboxType) {

    return (
        <div className="OptionsElement">
            <div className="OptionsElement-Data">
                <h2>{Complement.Text}</h2>
                <p> {Complement.Definition} </p>
            </div>
            <div className="OptionsElement-Execution">
                <input className={
                    !ChangeCondition
                    ? "OptionsElement-Execution-Input Execution-Allow"
                    : "OptionsElement-Execution-Input Execution-Off"
                } type="checkbox" onClick={Execute} />
            </div>
        </div>
    )
}