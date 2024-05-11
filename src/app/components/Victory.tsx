import { MONEY_VICTORY } from "../utils/Config";
import { State } from "../utils/GameStateContext";
import ResetButton from "./ResetButton";

function Victory({ state, isVictory, handleReset }: { state: State, isVictory: boolean, handleReset: () => void }) {
    return <div className={`border rounded-lg flex ${isVictory ? "visible-custom " : "hidden-custom"} m-2`}>
        <div className="mx-auto text-center my-32">
            <h1>🎊 Victory! 🎊</h1>

            You reached <code>money.value === {MONEY_VICTORY}</code><br />in <code>time.iterations === {state.time.toFixed(1)}</code>.
            <br /><br />
            Can you do it faster?
            <br /><br />
            <ResetButton handleReset={handleReset} />
        </div >
    </div>
}

export default Victory;