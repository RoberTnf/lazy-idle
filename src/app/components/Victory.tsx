import { MONEY_VICTORY } from "../utils/Config";
import { State } from "../utils/GameStateContext";
import ResetButton from "./ResetButton";

function Victory({ state, isVictory, handleReset }: { state: State, isVictory: boolean, handleReset: () => void }) {
    const top_score = 3435
    return <div className={`border rounded-lg flex ${isVictory ? "visible-custom " : "hidden-custom"} m-2`}>
        <div className="mx-auto text-center my-32">
            <h1>🎊 Victory! 🎊</h1>

            You reached <code>money.value === {MONEY_VICTORY}</code><br />in <code>time.iterations === {state.time}</code>.
            <br /><br />
            This site&apos;s creator did it in {top_score} <code>time.iterations</code>. <br />
            {
                state.time >= top_score ? (<h2 className="my-4">Can you do it faster?</h2>) : <h2 className="my-4">You beat him by {top_score - state.time} iterations!</h2>
            }
            <ResetButton handleReset={handleReset} />
        </div >
    </div>
}

export default Victory;