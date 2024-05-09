import { ChangeEvent, useState } from "react";
import Plot from "react-plotly.js";
import { check_formula } from "../utils/Game";
import { GameStateContext, Properties } from "../utils/GameStateContext";

const PlotStats = ({ history }: { history: Properties[] }) => {
    const [toPlot, setToPlot] = useState("money.value")
    const formatted_eval = toPlot.replace(/\w+\./g, "h.$&")
    const [success, setSuccess] = useState(true);

    let y_data;
    try {
        y_data = history.map((h) => eval(formatted_eval))
    } catch (error) {
        y_data = []
    }

    const handle_change = (e: ChangeEvent<HTMLTextAreaElement>, p: Properties) => {
        setToPlot(e.target.value)
        setSuccess(check_formula(p, e.target.value))
    }

    return <div className="boxed m-2 ">
        <GameStateContext.Consumer>
            {({ calculated_properties }) =>
            (
                <textarea rows={2} className={`${success ? '' : 'bg-red-950'} `} value={toPlot} onChange={e => { handle_change(e, calculated_properties) }}></textarea>
            )
            }
        </GameStateContext.Consumer>

        <Plot
            className="w-full"
            data={[
                {
                    x: history.map((h) => (h.time.value)),
                    y: y_data,
                    mode: "lines",
                    type: "scatter",
                },
            ]}
            layout={{
                autosize: true,
                paper_bgcolor: "#1E293B",
                plot_bgcolor: "#1E293B",
                xaxis: {
                    color: "white",
                    title: "Time",
                },
                yaxis: {
                    color: "white"
                },
                legend: {
                    font: {
                        color: "white"
                    },
                },
                title: {
                    font: {
                        color: "white",
                    },
                    text: toPlot
                },
                scene: {
                    xaxis: {
                        color: "white"
                    },
                    yaxis: {
                        color: "white"
                    },
                    zaxis: {
                        color: "white"
                    },
                }

            }}
        />
    </div >
}

export default PlotStats;