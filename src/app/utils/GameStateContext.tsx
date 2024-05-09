import { Dispatch, SetStateAction, createContext } from "react";
import { startingState } from "./Config";
import { get_calculated_properties } from "./Game";

interface State {
    money: number,
    setMoney: null | Dispatch<SetStateAction<number>>,
    time: number,
    workers: number,
    setWorkers: null | Dispatch<SetStateAction<number>>,
    workerFormula: string,
    factories: number,
    setFactories: null | Dispatch<SetStateAction<number>>,
    factoryFormula: string
}

interface Worker {
    cost_recurrent: number,
    cost_next_recurrent: number,
    cost_next_once: number,
    revenue: number,
    value: number
}

interface Factory {
    cost_recurrent: number,
    cost_next_recurrent: number,
    cost_next_once: number,
    worker_maintenance_factor: number,
    worker_maintenance_factor_next: number,
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
    money: Money,
    factory: Factory
}

interface Context {
    state: State,
    calculated_properties: Properties
}



const StartingGameContext: Context = {
    state: startingState,
    calculated_properties: get_calculated_properties(startingState)
}

const GameStateContext = createContext(StartingGameContext);

export { GameStateContext, StartingGameContext };
export type { Properties, State, Worker };

