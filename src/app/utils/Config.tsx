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
    cost_once: 1000,
    cost_recurrent_all_base: 1.15,
    cost_once_base: 1.1,
}

const busterConfig = {
    worker_rec_cost_factor: 0.9,
    cost_recurrent_all: 10,
    cost_once: 50000,
    cost_recurrent_all_base: 1.15,
    cost_once_base: 1.1,
}

const startingState = {
    money: 5,
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
    // workerFormula: "(money.value > worker.cost_next_once) && ((worker.cost_next_recurrent_all - worker.cost_recurrent_all) * buster.worker_rec_cost_factor < worker.revenue*factory.worker_revenue_factor)",
    // factoryFormula: "(money.value > factory.cost_next_once) && (((factory.worker_revenue_factor_next - factory.worker_revenue_factor) * worker.revenue * worker.count) > (factory.cost_next_recurrent_all - factory.cost_recurrent_all))",
    // busterFormula: "(money.value > buster.cost_next_once) && (((buster.worker_rec_cost_factor - buster.worker_rec_cost_factor_next) * worker.cost_recurrent_all) > (buster.cost_next_recurrent_all - buster.cost_recurrent_all))",
}

export { busterConfig, factoryConfig, startingState, workerConfig }

