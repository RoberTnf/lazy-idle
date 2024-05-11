const workerConfig = {
    revenue: 1,
    cost_recurrent_all: 0.25,
    cost_once: 1,
    cost_recurrent_all_base: 1.1,
    cost_once_base: 1.1,
}

const factoryConfig = {
    worker_revenue_factor: 1.1,
    cost_recurrent_all: 4,
    cost_once: 2000,
    cost_recurrent_all_base: 1.11,
    cost_once_base: 1.1,
}

const busterConfig = {
    worker_rec_cost_factor: 0.9,
    cost_recurrent_all: 10,
    cost_once: 50000,
    cost_recurrent_all_base: 1.4,
    cost_once_base: 1.1,
}

const startingState = {
    money: 0,
    setMoney: null,
    workers: 1,
    setWorkers: null,
    factories: 0,
    setFactories: null,
    busters: 0,
    setBusters: null,
    time: 0,
    workerFormula: "(money.value > worker.cost_next_once)",
    factoryFormula: "",
    busterFormula: "",
    unlockedFactories: false,
    unlockedBusters: false,
    shouldBuyWorker: { success: false, cond: true },
    shouldBuyFactory: { success: false, cond: true },
    shouldBuyBuster: { success: false, cond: true },
    setShouldBuyWorker: null,
    setShouldBuyFactory: null,
    setShouldBuyBuster: null,
    setWorkerFormula: null,
    setFactoryFormula: null,
    setBusterFormula: null,
    // workerFormula: "(money.value > worker.cost_next_once) && ((worker.cost_next_recurrent_all - worker.cost_recurrent_all) * buster.worker_rec_cost_factor < worker.base_revenue*factory.worker_revenue_factor)",
    // factoryFormula: "(money.value > factory.cost_next_once) && (((factory.worker_revenue_factor_next - factory.worker_revenue_factor) * worker.base_revenue * worker.count) > (factory.cost_next_recurrent_all - factory.cost_recurrent_all))",
    // busterFormula: "(money.value > buster.cost_next_once) && (((buster.worker_rec_cost_factor - buster.worker_rec_cost_factor_next) * worker.cost_recurrent_all) > (buster.cost_next_recurrent_all - buster.cost_recurrent_all))",
    ups: 0
}

const TIME_CONSTANT = (process.env.NODE_ENV === "development") ? 1 : 1
const MONEY_VICTORY = 10


export { MONEY_VICTORY, TIME_CONSTANT, busterConfig, factoryConfig, startingState, workerConfig }
