import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { ChangeEvent, Dispatch, ReactNode, useState } from "react";
import { check_formula } from "../utils/Game";
import { GameStateContext, Properties } from "../utils/GameStateContext";

export default function GameController(
    { setWorkerFormula, className, setFactoryFormula, setBusterFormula }:
        { setWorkerFormula: Dispatch<string>, setFactoryFormula: Dispatch<string>, className: string, setBusterFormula: Dispatch<string> }
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
                    <h2 className="text">Formulas</h2>
                    <ControlGroup name="Workers"><textarea rows={4} className={`${successWorker ? '' : 'bg-red-950'}`} value={state.workerFormula} onChange={(e) => { handleChangeWorker(e, calculated_properties) }} /></ControlGroup>
                    <ControlGroup name="Factories"><textarea rows={4} className={`${successFactory ? '' : 'bg-red-950'}`} value={state.factoryFormula} onChange={(e) => { handleChangeFactory(e, calculated_properties) }} /></ControlGroup>
                    <ControlGroup name="Busters"><textarea rows={4} className={`${successBuster ? '' : 'bg-red-950'}`} value={state.busterFormula} onChange={(e) => { handleChangeBuster(e, calculated_properties) }} /></ControlGroup>
                </>
            )
            }
        </GameStateContext.Consumer>
    </div >
}

function ControlGroup({ name, children }: { name: string, children: ReactNode }) {
    return (
        <Disclosure as="div" className="py-2" defaultOpen={true}>
            <DisclosureButton className="group flex w-full items-center justify-between p-0 py-2">
                <span className="text-lg font-extrabold text-white group-data-[hover]:text-white/80">
                    {name}
                </span>
                <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
            </DisclosureButton>
            <DisclosurePanel className="mt-2 text-sm/5">
                {children}
            </DisclosurePanel>
        </Disclosure>
    )
}



