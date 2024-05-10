import { Dispatch } from "react";

const TopControls = ({ pause, setPause, className, time, handleReset }: { pause: boolean, setPause: Dispatch<boolean>, className?: string, time: number, handleReset: () => void }) => {
    return <div className={className}>
        {/* Make sure that the classed are loaded */}
        <span className="bg-red-700" /><span className="hover:bg-red-900" /><span className="bg-green-700" /><span className="hover:bg-green-900" />
        <button
            onClick={() => { handleReset() }}
            className={`bg-slate-700 mx-2 hover:bg-slate-900 min-w-24`}
        >
            Reset
        </button>
    
        <button
            onClick={() => { setPause(!pause) }}
            className={`bg-${!pause ? 'red' : 'green'}-700 hover:bg-${!pause ? 'red' : 'green'}-900  min-w-24`}
        >
            {pause ? (time == 0 ? "Start" : "Resume") : "Pause"}
        </button>
    </div>
}

export default TopControls;