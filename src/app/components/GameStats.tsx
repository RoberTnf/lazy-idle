import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { GameStateContext } from "../utils/GameStateContext";
import QuestionTooltip from "./QuestionTooltip";

export default function GameStats({ className, unlockedFactories, unlockedBusters }: { className: string, unlockedFactories: boolean, unlockedBusters: boolean }) {
    return <GameStateContext.Consumer>
        {({ calculated_properties }) =>
        (
            <div className={`boxed m-2 ${className}`}>

                <QuestionTooltip placement="right" title="Properties">
                    <div>
                        Values of all the properties available to the game for calculations. <br />
                        Use it in the formulas as, for example, <code>time.iterations</code>.
                    </div>
                </QuestionTooltip>

                <StatGroup obj={calculated_properties.time} name="time" />
                <StatGroup obj={calculated_properties.money} name="money" />
                <StatGroup obj={calculated_properties.worker} name="worker" />
                <StatGroup obj={calculated_properties.factory} className={unlockedFactories ? "visible-custom" : "hidden-custom"} name="factory" />
                <StatGroup obj={calculated_properties.buster} className={unlockedBusters ? "visible-custom" : "hidden-custom"} name="buster" />
            </div>
        )
        }
    </GameStateContext.Consumer>
}


function Stat(props: { name: string, value: string }) {
    return <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">{props.name} </div>
        <div>{props.value}</div>
    </div>
}


function StatGroup({ obj, name, className }: { obj: Object, name: string, className?: string }) {
    return (
        <Disclosure as="div" className={`py-2 ${className}`} defaultOpen={true}>
            <DisclosureButton className="group flex w-full items-center justify-between p-0 py-2">
                <span className="text-lg font-extrabold text-white group-data-[hover]:text-white/80">
                    {name}
                </span>
                <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
            </DisclosureButton>
            <DisclosurePanel className="mt-2 text-xs">
                {Object.keys(obj).map((key) => (
                    // @ts-ignore
                    <Stat name={key} value={obj[key].toPrecision(4)} key={key} />
                ))}
            </DisclosurePanel>
        </Disclosure>
    )
}

// function StatGroup({ obj, name }: { obj: Object, name: string }) {
//     return (
//         <div className="boxed m-2">
//             <h2>{name}</h2>
//             {Object.keys(obj).map((key) => (
//                 // @ts-ignore
//                 <Stat name={key} value={obj[key].toPrecision(4)} key={key} />
//             ))}
//         </div>
//     )
// }