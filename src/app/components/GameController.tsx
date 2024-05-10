import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { ChangeEvent, Dispatch, ReactNode, useState } from "react";
import { check_formula } from "../utils/Game";
import { GameStateContext, Properties } from "../utils/GameStateContext";
import QuestionTooltip from "./QuestionTooltip";

export default function GameController(
    { setWorkerFormula, className, setFactoryFormula, setBusterFormula, unlockedFactories, unlockedBusters }:
        { setWorkerFormula: Dispatch<string>, setFactoryFormula: Dispatch<string>, className: string, setBusterFormula: Dispatch<string>, unlockedFactories: boolean, unlockedBusters: boolean }
) {

    const [successWorker, setSuccessWorker] = useState(true);
    const handleChangeWorker = (e: ChangeEvent<HTMLTextAreaElement>, p: Properties) => {
        setWorkerFormula(e.target.value)
        setSuccessWorker(check_formula(p, e.target.value))
    }

    const [successFactory, setSuccessFactory] = useState(true);
    const handleChangeFactory = (e: ChangeEvent<HTMLTextAreaElement>, p: Properties) => {
        setFactoryFormula(e.target.value)
        setSuccessFactory(check_formula(p, e.target.value))
    }

    const [successBuster, setSuccessBuster] = useState(true);
    const handleChangeBuster = (e: ChangeEvent<HTMLTextAreaElement>, p: Properties) => {
        setBusterFormula(e.target.value)
        setSuccessBuster(check_formula(p, e.target.value))
    }

    return <div className={`boxed flex-auto m-2 ${className}`} >
        <GameStateContext.Consumer>
            {({ state, calculated_properties }) =>
            (
                <>

                    <QuestionTooltip placement="right" title="Formulas">
                        <div>
                            Input formulas to determine when a given entity is bought.
                            Use javascript code, all units available in the Properties pane are available here,
                            for example <br /><code>time.value &gt; 100</code> or <br /><code>worker.revenue &gt; worker.cost_next_once</code>
                        </div>
                    </QuestionTooltip>

                    <ControlGroup name="Workers" tooltip={
                        <div>
                            They generate <code>money.value</code> according to <code>worker.revenue</code> per worker.
                            They have a one time hiring cost <code>worker.cost_next_once</code> per worker, and a recurrent cost <code>worker.cost_recurrent_all</code> that includes all of your workers.
                        </div>
                    }><textarea rows={4} className={`${successWorker ? '' : 'bg-red-950'}`} value={state.workerFormula} onChange={(e) => { handleChangeWorker(e, calculated_properties) }} /></ControlGroup>

                    <ControlGroup name="Factories" tooltip={
                        <div>
                            They increase <code>worker.revenue</code> efficiency by <code>factory.worker_revenue_factor</code>.
                        </div>
                    } className={unlockedFactories ? "visible-custom" : "hidden-custom"}><textarea rows={4} className={`${successFactory ? '' : 'bg-red-950'}`} value={state.factoryFormula} onChange={(e) => { handleChangeFactory(e, calculated_properties) }} /></ControlGroup>

                    <ControlGroup name="Union Busters" tooltip={
                        <div>
                            They reduce <code>worker.cost_recurrent_all</code> by <code>buster.worker_rec_cost_factor</code>.
                        </div>
                    } className={unlockedBusters ? "visible-custom" : "hidden-custom"}><textarea rows={4} className={`${successBuster ? '' : 'bg-red-950'}`} value={state.busterFormula} onChange={(e) => { handleChangeBuster(e, calculated_properties) }} /></ControlGroup>
                </>
            )
            }
        </GameStateContext.Consumer>
    </div >
}

function ControlGroup({ name, children, tooltip, className }: { name: string, children: ReactNode, tooltip: ReactNode, className?: string }) {
    return (
        <Disclosure as="div" className={`py-2 ${className}`} defaultOpen={true}>
            <DisclosureButton className="group flex w-full items-center justify-between p-0 py-2">
                {/* <span className="text-lg font-extrabold text-white group-data-[hover]:text-white/80">
                    {name}
                </span> */}
                <QuestionTooltip placement="right" title={name}>{tooltip}</QuestionTooltip>
                <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
            </DisclosureButton>
            <DisclosurePanel className="mt-2 text-sm/5">
                {children}
            </DisclosurePanel>
        </Disclosure>
    )
}



