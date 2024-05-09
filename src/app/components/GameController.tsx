import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { ChangeEvent, Dispatch, ReactNode, useState } from "react";
import { check_formula } from "../utils/Game";
import { GameStateContext, Properties } from "../utils/GameStateContext";

export default function GameController({ setWorkerFormula, className }: { setWorkerFormula: Dispatch<string>, className: string }) {

    const [success, setSuccess] = useState(true);
    const handle_change = (e: ChangeEvent<HTMLTextAreaElement>, p: Properties) => {
        setWorkerFormula(e.target.value)
        setSuccess(check_formula(p, e.target.value))
    }

    return <div className={`boxed flex-auto m-2 ${className}`} >
        <GameStateContext.Consumer>
            {({ state, calculated_properties }) =>
            (
                <>
                    <h2 className="text">Formulas</h2>
                    <ControlGroup name="Workers"><textarea rows={4} className={`${success ? '' : 'bg-red-950'}`} value={state.workerFormula} onChange={(e) => { handle_change(e, calculated_properties) }} /></ControlGroup>
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



