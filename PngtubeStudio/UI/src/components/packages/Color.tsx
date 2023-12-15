import { ColorType } from "../../types/packages";

export default function Color({ Complement, Execute }: ColorType) {
    return (
        <div className="OptionsElement">
            <div className="OptionsElement-Data">
                <h2>{Complement.Text}</h2>
                <p> {Complement.Definition} </p>
            </div>
            <div className="OptionsElement-Execution" onClick={(e) => e.stopPropagation()}>
                <input className="OptionsElement-Execution-InputColor" type="color" value={Complement.value} onChange={ev => {
                    Execute(ev.target.value)
                }} />
            </div>
        </div>
    )
}