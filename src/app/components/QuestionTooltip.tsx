import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import { Tooltip } from "@material-tailwind/react";
import { ReactNode } from "react";

function QuestionTooltip({ children, placement, title, className }: { children: ReactNode, placement: string, title: string, className?: string }) {
    return <div className={`flex content-center ${className}`}>
        <h2 className="text inline">{title}</h2>
        <Tooltip className="max-w-96 bg-zinc-300  z-10 p-2 rounded text-black" content={children} placement={placement}>
            <QuestionMarkCircleIcon className="mx-1 h-4 inline fill-white/60 hover:fill-white align-middle" />
        </Tooltip>
    </div>
}

export default QuestionTooltip;

