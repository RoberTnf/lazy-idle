
const ResetButton = ({ handleReset }: { handleReset: () => void }) => {
    return <button
        onClick={() => { handleReset() }}
        className={`bg-slate-700 mx-2 hover:bg-slate-900 min-w-24`}
    >
        Reset
    </button>
}

export default ResetButton;