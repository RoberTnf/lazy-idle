
function Disclaimer({ handleAcceptDisclaimer }: { handleAcceptDisclaimer: () => void }) {
    return <div className="border p-10 rounded-lg max-w-4xl mx-auto mt-10">
        <h2>Disclaimer</h2><br />
        <p>
            You will be writing your own js code. This is a coding game that executes your custom js code in a{" "}
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers">Web Worker</a>,
            which provides some level of isolation and security, however, running unknown code might be dangerous.
        </p><br />
        <p><b>Don&apos;t run code made by other people</b> that you don&apos;t understand.</p> <br />
        <div className="flex">
            <button className={`mx-auto bg-slate-700 min-w-24 hover:bg-slate-900`} onClick={handleAcceptDisclaimer}>I Understand, take me to the game</button>
        </div>
    </div >
}

export default Disclaimer;