import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { Properties, State } from "../utils/GameStateContext";
import QuestionTooltip from "./QuestionTooltip";


export default function GameController(
    { state, className, calculated_properties }: { state: State, className: string, calculated_properties: Properties }
) {
    const workerWorker = new Worker(new URL('../utils/worker.tsx', import.meta.url), { type: 'module' })
    const factoryWorker = new Worker(new URL('../utils/worker.tsx', import.meta.url), { type: 'module' })
    const busterWorker = new Worker(new URL('../utils/worker.tsx', import.meta.url), { type: 'module' })
    const customWorker = new Worker(new URL('../utils/worker.tsx', import.meta.url), { type: 'module' })

    const { setWorkerFormula, setFactoryFormula, setBusterFormula, unlockedFactories, unlockedBusters, shouldBuyBuster, shouldBuyFactory, shouldBuyWorker, setShouldBuyBuster, setShouldBuyFactory, setShouldBuyWorker } = state
    const [customFormula, setCustomFormula] = useState("money.value")
    const [customResult, setCustomResult] = useState({ success: true, cond: true })
    const [successCustom, setSuccessCustom] = useState(true);



    workerWorker.onmessage = ({ data }) => {
        (data.cond != shouldBuyWorker.cond || data.success != shouldBuyWorker.success) && setShouldBuyWorker !== null && setShouldBuyWorker(data)
    }
    busterWorker.onmessage = ({ data }) => {
        (data.cond != shouldBuyBuster.cond || data.success != shouldBuyBuster.success) && setShouldBuyBuster !== null && setShouldBuyBuster(data)

    }
    factoryWorker.onmessage = ({ data }) => {
        (data.cond != shouldBuyFactory.cond || data.success != shouldBuyFactory.success) && setShouldBuyFactory !== null && setShouldBuyFactory(data)

    }
    customWorker.onmessage = ({ data }) => {
        data.success != successCustom && setSuccessCustom(data.success);
        (data.cond != customResult.cond || data.success != customResult.success) && setCustomResult(data)
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            customWorker.postMessage([calculated_properties, customFormula])
        }, 100);
        return () => clearInterval(intervalId)
    })
    const handleChangeCustom = (e: ChangeEvent<HTMLTextAreaElement>, p: Properties) => {
        setCustomFormula && setCustomFormula(e.target.value)
        customWorker.postMessage([p, e.target.value])
    }
    const handleChangeWorker = (e: ChangeEvent<HTMLTextAreaElement>, p: Properties) => {
        setWorkerFormula && setWorkerFormula(e.target.value)
        workerWorker.postMessage([p, e.target.value])
    }
    const handleChangeFactory = (e: ChangeEvent<HTMLTextAreaElement>, p: Properties) => {
        setFactoryFormula && setFactoryFormula(e.target.value)
        factoryWorker.postMessage([p, e.target.value])
    }
    const handleChangeBuster = (e: ChangeEvent<HTMLTextAreaElement>, p: Properties) => {
        setBusterFormula && setBusterFormula(e.target.value)
        busterWorker.postMessage([p, e.target.value])
    }


    return <div className={`boxed m-2 ${className}`} >
        <QuestionTooltip placement="right" title="Formulas">
            <div>
                Write arbitrary js code that will get executed in a <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers">Web Worker</a>.
                For all formulas except for <code>Custom</code>, if the result evaluates to true, you will try to buy one unit.
            </div>
        </QuestionTooltip>

        <ControlGroup name="Custom" cond={customResult.cond} tooltip={
            <div>
                Try any formula you want!
            </div>
        }><textarea rows={4} className={`${successCustom ? '' : 'bg-red-950'}`} value={customFormula} onChange={(e) => { handleChangeCustom(e, calculated_properties) }} /></ControlGroup>
        <ControlGroup name={`Workers`} cond={state.shouldBuyWorker.cond} tooltip={
            <div>
                They generate <code>money.value</code> according to <code>worker.base_revenue</code> per worker.
                They have a one time hiring cost <code>worker.cost_next_once</code> per worker, and a recurrent cost <code>worker.cost_recurrent_all</code> that includes all of your workers.
            </div>
        }><textarea rows={4} className={`${state.shouldBuyWorker.success ? '' : 'bg-red-950'}`} value={state.workerFormula} onChange={(e) => { handleChangeWorker(e, calculated_properties) }} /></ControlGroup>

        <ControlGroup name="Factories" cond={state.shouldBuyFactory.cond} tooltip={
            <div>
                They increase <code > worker.base_revenue</code> efficiency by <code > factory.worker_revenue_factor</code>.
            </div >
        } className={unlockedFactories ? "visible-custom" : "hidden-custom"} > <textarea rows={4} className={`${state.shouldBuyFactory.success ? '' : 'bg-red-950'}`} value={state.factoryFormula} onChange={(e) => { handleChangeFactory(e, calculated_properties) }} /></ControlGroup >

        <ControlGroup name="Union Busters" cond={state.shouldBuyBuster.cond} tooltip={
            <div>
                They reduce <code>worker.cost_recurrent_all</code> by <code>buster.worker_rec_cost_factor</code>.
            </div>
        } className={unlockedBusters ? "visible-custom" : "hidden-custom"}><textarea rows={4} className={`${state.shouldBuyBuster.success ? '' : 'bg-red-950'}`} value={state.busterFormula} onChange={(e) => { handleChangeBuster(e, calculated_properties) }} /></ControlGroup>
    </div >
}

function ControlGroup({ name, children, tooltip, className, cond }: { name: string, children: ReactNode, tooltip: ReactNode, className?: string, cond: any }) {
    let r
    if (typeof cond === "number") {
        r = cond.toPrecision(4)
    } else {
        r = cond !== undefined ? cond.toString() : "undefined"
    }
    return (
        <Disclosure as="div" className={`py-2 ${className}`} defaultOpen={true}>
            <DisclosureButton className="group flex w-full items-center justify-between p-0 py-2 gap-4">
                <QuestionTooltip placement="right" title={name} className="grow">{tooltip}</QuestionTooltip>
                <code className="p-1 min-w-32">{r}</code>
                <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
            </DisclosureButton>
            <DisclosurePanel className="mt-2 text-sm/5">
                {children}
            </DisclosurePanel>
        </Disclosure>
    )
}



