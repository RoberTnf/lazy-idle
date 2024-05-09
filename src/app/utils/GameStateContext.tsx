import { Dispatch, SetStateAction, createContext } from "react";
import { get_calculated_properties } from "./Game";

interface State {
    money: number,
    setMoney: null | Dispatch<SetStateAction<number>>,
    time: number,
    workers: number,
    setWorkers: null | Dispatch<SetStateAction<number>>,
    workerFormula: string
}

interface Worker {
    cost_recurrent: number,
    cost_next_recurrent: number,
    cost_next_once: number,
    revenue: number,
    value: number
}

interface Time {
    value: number
}

interface Money {
    value: number,
    revenue: number,
    cost: number,
    change: number
}


interface Properties {
    time: Time,
    worker: Worker,
    money: Money
}

interface Context {
    state: State,
    calculated_properties: Properties
}

const state = {
    money: 5,
    setMoney: null,
    workers: 1,
    setWorkers: null,
    time: 0,
    workerFormula: "(money.value > worker.cost_next_once) && ((worker.cost_next_recurrent - worker.cost_recurrent) < worker.revenue)"
}

const StartingGameContext: Context = {
    state,
    calculated_properties: get_calculated_properties(state)
}

const GameStateContext = createContext(StartingGameContext);

export { GameStateContext, StartingGameContext };
export type { Properties, State, Worker };

