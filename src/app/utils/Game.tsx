import { Properties, State } from "./GameStateContext"

const get_worker_info = (n: number) => ({
    cost_once: 2.5 * 2 ** (0.2 * n),
    cost_recurrent: 0.25 * 2 ** (0.2 * n),
    revenue: 1
})

const get_calculated_properties = (state: State) => {
    const { workers, time, workerFormula } = state
    const worker_next = get_worker_info(workers + 1)
    const worker = get_worker_info(workers)
    const revenue = workers * (worker.revenue)
    const cost = worker.cost_recurrent

    const calculated_properties: Properties = {
        money: {
            cost,
            revenue,
            profit: revenue - cost,
            value: state.money
        },
        time: {
            value: time
        },
        worker: {
            cost_recurrent: worker.cost_recurrent,
            cost_next_once: worker_next.cost_once,
            cost_next_recurrent: worker_next.cost_recurrent,
            revenue: worker.revenue,
            value: workers
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

export { buyWorkers, check_formula, get_calculated_properties, get_worker_info }

 