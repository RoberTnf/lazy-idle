const workerConfig = {
    revenue: 1,
    cost_recurrent: 0.25,
    cost_once: 1,
    cost_recurrent_base: 1.1,
    cost_once_base: 1.1,
}

const factoryConfig = {
    worker_maintenance_factor: 0.8,
    cost_recurrent: 1,
    cost_once: 100,
    cost_recurrent_base: 1.1,
    cost_once_base: 1.1,
}

const startingState = {
    money: 5,
    setMoney: null,
    workers: 1,
    setWorkers: null,
    factories: 0,
    setFactories: null,
    factoryFormula: "",
    time: 0,
    workerFormula: "(money.value > factory.cost_next_once)"
}

export { factoryConfig, startingState, workerConfig }

