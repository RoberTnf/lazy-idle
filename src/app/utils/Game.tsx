import { factoryConfig, workerConfig } from "./Config"
import { Properties, State } from "./GameStateContext"

const get_worker_info = (n: number) => ({
    cost_once: workerConfig.cost_once * workerConfig.cost_once_base ** (n - 1),
    cost_recurrent: workerConfig.cost_recurrent * workerConfig.cost_recurrent_base ** (n - 1),
    revenue: workerConfig.revenue
})

const get_factory_info = (n: number) => ({
    cost_once: factoryConfig.cost_once * factoryConfig.cost_once_base ** (n - 1),
    cost_recurrent: n > 0 ? factoryConfig.cost_recurrent * factoryConfig.cost_recurrent_base ** (n - 1) : 0,
    worker_maintenance_factor: factoryConfig.worker_maintenance_factor ** (n)
})

const get_calculated_properties = (state: State) => {
    const { workers, time, factories } = state
    const worker_next = get_worker_info(workers + 1)
    const worker = get_worker_info(workers)
    const factory = get_factory_info(factories)
    const factory_next = get_factory_info(factories + 1)
    const revenue = workers * (worker.revenue)
    const cost = worker.cost_recurrent * factory.worker_maintenance_factor + factory.cost_recurrent

    const calculated_properties: Properties = {
        money: {
            value: state.money,
            change: revenue - cost,
            cost,
            revenue,
        },
        time: {
            value: time
        },
        worker: {
            value: workers,
            revenue: worker.revenue,
            cost_recurrent: worker.cost_recurrent,
            cost_next_once: worker_next.cost_once,
            cost_next_recurrent: worker_next.cost_recurrent,
        },
        factory: {
            value: factories,
            cost_next_once: factory_next.cost_once,
            cost_next_recurrent: factory_next.cost_recurrent,
            cost_recurrent: factory.cost_recurrent,
            worker_maintenance_factor: factory.worker_maintenance_factor,
            worker_maintenance_factor_next: factory_next.worker_maintenance_factor
        }
    }

    return calculated_properties
}

const buyWorkers = (p: Properties, s: State) => {
    const formated_formula = s.workerFormula.replace(/\w+\./g, "p.$&");
    let cond;
    try {
        cond = eval(formated_formula)
    } catch {
        return false
    }

    if (cond && (s.money > p.worker.cost_next_once)) {
        s.workers += 1
        s.money -= p.worker.cost_next_once
        return true
    }
    return false
}

const buyFactory = (p: Properties, s: State) => {
    const formated_formula = s.factoryFormula.replace(/\w+\./g, "p.$&");
    let cond;
    try {
        cond = eval(formated_formula)
    } catch {
        return false
    }

    if (cond && (s.money > p.factory.cost_next_once)) {
        s.factories += 1
        s.money -= p.factory.cost_next_once
        return true
    }
    return false
}

const check_formula = (p: Properties, formula: string) => {
    const formated_formula = formula.replace(/\w+\./g, "p.$&");
    //@ts-ignore
    const variables = Array.from(formated_formula.matchAll(/[a-zA-Z\._]+/gi)).map((m) => (m[0]))
    try {
        eval(formated_formula)
    } catch {
        return false
    }


    return !variables.some((variable) => {
        try {
            return (eval(variable) === undefined)
        }
        catch { return true }
    })
}

export { buyFactory, buyWorkers, check_formula, get_calculated_properties, get_worker_info }

