import { ChangeEvent, Dispatch, useState } from "react";
import { check_formula } from "../utils/Game";
import { GameStateContext, Properties } from "../utils/GameStateContext";

export default function GameController({ setWorkerFormula }: { setWorkerFormula: Dispatch<string> }) {

    const [success, setSuccess] = useState(true);
    const handle_change = (e: ChangeEvent<HTMLTextAreaElement>, p: Properties) => {
        setWorkerFormula(e.target.value)
        setSuccess(check_formula(p, e.target.value))
    }

    return <div className="boxed flex-auto m-2" >
        <GameStateContext.Consumer>
            {({ state, calculated_properties }) =>
            (
                <>
                    <h2 className="text">Workers</h2>
                    <ul>
                        <li>Workers formula: <textarea rows={4} className={`${success ? '' : 'bg-red-950'}`} value={state.workerFormula} onChange={(e) => { handle_change(e, calculated_properties) }} /> </li>
                    </ul>
                </>
            )
            }
        </GameStateContext.Consumer>
    </div >
}


