import { Dispatch } from "react";

const Pause = ({ pause, setPause, className }: { pause: boolean, setPause: Dispatch<boolean>, className?: string }) => {
    return <div className={className}>
        {/* Make sure that the classed are loaded */}
        <span className="bg-red-500" /><span className="hover:bg-red-700" /><span className="bg-green-500" /><span className="hover:bg-green-700" />
        <button
            onClick={() => { setPause(!pause) }}
            className={`bg-${pause ? 'red' : 'green'}-500 hover:bg-${pause ? 'red' : 'green'}-700 `}
        >
            {pause ? "Resume" : "Pause"}
        </button>
    </div>
}

export default Pause;