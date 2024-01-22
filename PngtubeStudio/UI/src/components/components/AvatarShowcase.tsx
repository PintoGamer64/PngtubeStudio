import { useContext } from "react";
import { AvatarsContext, MemoryContext } from "../../contexts";
import AddModel from "../../icons/AddModel";

export default function AvatarsShowcase() {

    const { AvatarsState } = useContext(AvatarsContext);
    const { MemoryState } = useContext(MemoryContext);

    console.log(AvatarsState);

    return (
        <aside id="AvatarShowcase" className={MemoryState.AvatarsShowcase ? "AvatarShowcase-Active" : "AvatarShowcase-Desactive"}>
            <ul id="AvatarShowcase-List">
                {
                    AvatarsState.Data.map(({ Name, Id, Image }) =>
                        <li key={Id} className="AvatarShowcase-List-Elements">
                            <img src={Image} alt={Name} className="AvatarShowcase-List-AvatarImage" width={50} height={50} />
                            <p className="AvatarShowcase-List-AvatarName">{Name}</p>
                        </li>
                    )
                }
                <li className="AvatarShowcase-List-Elements">
                    <AddModel />
                    <p className="AvatarShowcase-List-AvatarName">Añadir</p>
                </li>
            </ul>
        </aside>
    )
}