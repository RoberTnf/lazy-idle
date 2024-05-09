import { GameStateContext } from "../utils/GameStateContext";

export default function GameStats() {
    return <GameStateContext.Consumer>
        {({ calculated_properties }) =>
        (
            <div>
                <StatGroup obj={calculated_properties.time} name="time" />
                <StatGroup obj={calculated_properties.money} name="money" />
                <StatGroup obj={calculated_properties.worker} name="worker" />
            </div>
        )
        }
    </GameStateContext.Consumer>
}


function Stat(props: { name: string, value: string }) {
    return <div className="grid grid-cols-2 gap-4">
        <div>{props.name} </div>
        <div>{props.value}</div>
    </div>
}


function StatGroup({ obj, name }: { obj: Object, name: string }) {
    return (
        <div className="boxed m-2">
            <h2>{name}</h2>
            {Object.keys(obj).map((key) => (
                // @ts-ignore
                <Stat name={key} value={obj[key].toPrecision(4)} key={key} />
            ))}
        </div>
    )
}