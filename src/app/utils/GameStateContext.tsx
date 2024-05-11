import { Dispatch, SetStateAction, createContext } from "react";
import { startingState } from "./Config";
import { get_calculated_properties } from "./Game";

interface ShouldType {
    success: boolean, cond: boolean
}
interface State {
    money: number,
    setMoney: null | Dispatch<SetStateAction<number>>,
    time: number,
    workers: number,
    setWorkers: null | Dispatch<SetStateAction<number>>,
    factories: number,
    setFactories: null | Dispatch<SetStateAction<number>>,
    busters: number,
    setBusters: null | Dispatch<SetStateAction<number>>,
    workerFormula: string,
    factoryFormula: string,
    busterFormula: string,
    setWorkerFormula: null | ((arg0: string) => void),
    setFactoryFormula: null | ((arg0: string) => void),
    setBusterFormula: null | ((arg0: string) => void),
    unlockedFactories: boolean,
    unlockedBusters: boolean,
    shouldBuyWorker: ShouldType,
    shouldBuyFactory: ShouldType,
    shouldBuyBuster: ShouldType,
    setShouldBuyWorker: null | Dispatch<SetStateAction<ShouldType>>,
    setShouldBuyFactory: null | Dispatch<SetStateAction<ShouldType>>,
    setShouldBuyBuster: null | Dispatch<SetStateAction<ShouldType>>,
    ups: number
}

interface Worker {
    cost_recurrent_all: number,
    cost_next_recurrent_all: number,
    cost_next_once: number,
    base_revenue: number,
    count: number
}

interface Factory {
    cost_recurrent_all: number,
    cost_next_recurrent_all: number,
    cost_next_once: number,
    worker_revenue_factor: number,
    worker_revenue_factor_next: number,
    count: number
}

interface Time {
    iterations: number,
    iterations_per_s: number
}

interface Money {
    value: number,
    revenue: number,
    cost: number,
    change: number
}

interface Buster {
    cost_recurrent_all: number,
    cost_next_recurrent_all: number,
    cost_next_once: number,
    worker_rec_cost_factor: number,
    worker_rec_cost_factor_next: number,
    count: number
}

interface Properties {
    time: Time,
    worker: Worker,
    money: Money,
    factory: Factory,
    buster: Buster
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

