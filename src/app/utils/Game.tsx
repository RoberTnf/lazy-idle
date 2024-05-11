import { busterConfig, factoryConfig, workerConfig } from "./Config"
import { Properties, State } from "./GameStateContext"

const get_worker_info = (n: number) => ({
    cost_once: workerConfig.cost_once * workerConfig.cost_once_base ** (n - 1),
    cost_recurrent_all: workerConfig.cost_recurrent_all * workerConfig.cost_recurrent_all_base ** (n - 1),
    base_revenue: workerConfig.revenue
})

const get_factory_info = (n: number) => ({
    cost_once: factoryConfig.cost_once * factoryConfig.cost_once_base ** (n - 1),
    cost_recurrent_all: n > 0 ? factoryConfig.cost_recurrent_all * factoryConfig.cost_recurrent_all_base ** (n - 1) : 0,
    worker_revenue_factor: n === 0 ? 1 : 2 * factoryConfig.worker_revenue_factor ** (n)
})

const get_buster_info = (n: number) => ({
    cost_once: busterConfig.cost_once * busterConfig.cost_once_base ** (n - 1),
    cost_recurrent_all: n > 0 ? busterConfig.cost_recurrent_all * busterConfig.cost_recurrent_all_base ** (n - 1) : 0,
    worker_rec_cost_factor: busterConfig.worker_rec_cost_factor ** (n)
})

const get_calculated_properties = (state: State) => {
    const { workers, time, factories, busters } = state
    const worker_next = get_worker_info(workers + 1)
    const worker = get_worker_info(workers)
    const factory = get_factory_info(factories)
    const factory_next = get_factory_info(factories + 1)
    const buster = get_buster_info(busters)
    const buster_next = get_buster_info(busters + 1)
    const revenue = workers * (worker.base_revenue * factory.worker_revenue_factor)
    const cost = worker.cost_recurrent_all * buster.worker_rec_cost_factor + factory.cost_recurrent_all + buster.cost_recurrent_all

    const calculated_properties: Properties = {
        money: {
            value: state.money,
            change: revenue - cost,
            cost,
            revenue,
        },
        time: {
            iterations: time,
            iterations_per_s: state.ups
        },
        worker: {
            count: workers,
            base_revenue: worker.base_revenue,
            cost_recurrent_all: worker.cost_recurrent_all,
            cost_next_once: worker_next.cost_once,
            cost_next_recurrent_all: worker_next.cost_recurrent_all,
        },
        factory: {
            count: factories,
            cost_next_once: factory_next.cost_once,
            cost_next_recurrent_all: factory_next.cost_recurrent_all,
            cost_recurrent_all: factory.cost_recurrent_all,
            worker_revenue_factor: factory.worker_revenue_factor,
            worker_revenue_factor_next: factory_next.worker_revenue_factor
        },
        buster: {
            count: busters,
            cost_next_once: buster_next.cost_once,
            cost_next_recurrent_all: buster_next.cost_recurrent_all,
            cost_recurrent_all: buster.cost_recurrent_all,
            worker_rec_cost_factor: buster.worker_rec_cost_factor,
            worker_rec_cost_factor_next: buster_next.worker_rec_cost_factor
        }
    }

    return calculated_properties
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

export { check_formula, get_calculated_properties, get_worker_info }

