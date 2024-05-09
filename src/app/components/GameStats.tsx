import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { GameStateContext } from "../utils/GameStateContext";

export default function GameStats({ className }: { className: string }) {
    return <GameStateContext.Consumer>
        {({ calculated_properties }) =>
        (
            <div className={`boxed m-2 ${className}`}>
                <h2>Stats</h2>
                <StatGroup obj={calculated_properties.time} name="time" />
                <StatGroup obj={calculated_properties.money} name="money" />
                <StatGroup obj={calculated_properties.worker} name="worker" />
                <StatGroup obj={calculated_properties.factory} name="factory" />
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


function StatGroup({ obj, name }: { obj: Object, name: string }) {
    return (
        <Disclosure as="div" className="py-2" defaultOpen={true}>
            <DisclosureButton className="group flex w-full items-center justify-between p-0 py-2">
                <span className="text-lg font-extrabold text-white group-data-[hover]:text-white/80">
                    {name}
                </span>
                <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
            </DisclosureButton>
            <DisclosurePanel className="mt-2 text-sm/5">
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