import Plot from "react-plotly.js";
import { Properties } from "../utils/GameStateContext";


const PlotStats = ({ history }: { history: Properties[] }) => {
    return <div className="boxed m-2 ">
        <Plot
            className="w-full"
            data={[
                {
                    x: history.map((x) => x.time.iterations),
                    y: history.map((x) => x.money.value),
                    mode: "lines",
                    type: "scatter",
                    name: "money.value",
                    yaxis: "y",
                    xaxis: "x"
                },
                {
                    x: history.map((x) => x.time.iterations),
                    y: history.map((x) => x.money.change),
                    mode: "lines",
                    type: "scatter",
                    yaxis: "y2",
                    name: "money.change",
                    xaxis: "x2"
                },
            ]}
            layout={{
                autosize: true,
                paper_bgcolor: "#1E293B",
                plot_bgcolor: "#1E293B",
                xaxis: {
                    color: "white",
                    title: "Time",
                    position: 0.1
                },
                yaxis: {
                    color: "white",
                    title: "money.value",
                    showgrid: false,
                    zeroline: false
                },
                yaxis2: {
                    title: "money.change",
                    side: "right",
                    overlaying: "y",
                    color: "white",
                    showgrid: false,
                    zeroline: false
                },
                xaxis2: {
                    overlaying: "x",
                    visible: false,
                    showticklabels: false,
                    showgrid: false
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
                    text: "money"
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
                },
                uirevision: 1

            }}
        />
    </div >
}

export default PlotStats;