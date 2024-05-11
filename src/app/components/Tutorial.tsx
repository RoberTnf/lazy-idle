import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { MONEY_VICTORY, busterConfig, factoryConfig } from "../utils/Config";

function Tutorial({ unlockedFactories, unlockedBusters }: { unlockedFactories: boolean, unlockedBusters: boolean }) {
    return <div className="boxed mx-2">
        <Disclosure as="div" defaultOpen={true}>
            <DisclosureButton className="group flex w-full items-center justify-between p-0 gap-4">
                <h2>How to Play</h2>
                <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
            </DisclosureButton>
            <DisclosurePanel className="mt-2 text-sm/5">
                <h2 className="mt-4">Unlocks</h2>
                This game unlocks content as you progress. This tutorial will also expand as you progress.

                <h2 className="mt-4">Game objective</h2>
                The game ends in victory if you reach <code>money.value &gt;== {MONEY_VICTORY.toPrecision(2)}</code>, and in defeat if <code>money.value &lt; 0</code>.

                <h2 className="mt-4">Properties</h2>
                <div>
                    Values of all the properties available to the game for calculations.
                    Use it in the formulas as, for example, <code>time.iterations</code>.
                </div>

                <h2 className="mt-4">Formulas</h2>
                <div>
                    Write arbitrary js code that will get executed in a <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers">Web Worker</a>.
                    For all formulas except for <code>Custom</code>, if the result evaluates to true, you will try to buy one unit.
                </div>
                <h2 className="mt-4">Workers</h2>
                <div>
                    They generate <code>money.value</code> according to <code>worker.base_revenue</code> per worker.
                    They have a one time hiring cost <code>worker.cost_next_once</code> per worker, and a recurrent cost <code>worker.cost_recurrent_all</code> that includes all of your workers.
                    <br /><br />
                    The default formula will buy a worker every time it can, however, that will end up with too many workers causing your <code>money.cost</code> to outgrow your <code>money.revenue</code>, ending up in bankruptcy (game over).
                    Try to avoid this! Hint: Adding a new worker will add a cost of <code>worker.cost_next_recurrent_all - worker.cost_recurrent_all</code>.
                </div>

                {
                    unlockedFactories ?
                        (<div>
                            <h2>Factories</h2>
                            <div>
                                They increase <code > worker.base_revenue</code> efficiency by <code > factory.worker_revenue_factor</code>.
                            </div >
                            {
                                unlockedBusters ?
                                    <div>
                                        They reduce <code>worker.cost_recurrent_all</code> by <code>buster.worker_rec_cost_factor</code>.
                                    </div> :
                                    <div><h2 className="mt-4">Union Busters</h2><div>Unlock union busters at <code>money.value === {busterConfig.cost_once}</code>.</div></div>
                            }
                        </div>
                        ) :
                        <div><h2 className="mt-4">Factories</h2><div>Unlock factories at <code>money.value === {factoryConfig.cost_once}</code>.</div></div>
                }


            </DisclosurePanel>
        </Disclosure>
    </div >
}

export default Tutorial;