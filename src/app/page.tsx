"use client"

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import GameController from "./components/GameController";
import GameStats from "./components/GameStats";
import Pause from "./components/Pause";
import { buyWorkers, get_calculated_properties } from "./utils/Game";
import { GameStateContext, StartingGameContext } from "./utils/GameStateContext";

const PlotStats = dynamic(() => import('./components/PlotStats'), {
  ssr: false,
})

export default function Home() {
  const [money, setMoney] = useState(StartingGameContext.state.money);
  const [time, setTime] = useState(StartingGameContext.state.time)
  const [workerFormula, setWorkerFormula] = useState(StartingGameContext.state.workerFormula)
  const [workers, setWorkers] = useState(StartingGameContext.state.workers)
  const [pause, setPause] = useState(false)

  const state = {
    money: money,
    workers: workers,
    time: time,
    setMoney: setMoney,
    setWorkers: setWorkers,
    workerFormula: workerFormula
  }

  const calculated_properties = get_calculated_properties(state)
  let [history, setHistory] = useState([calculated_properties])
  const context = {
    state,
    calculated_properties
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (pause) { return };
      setTime(time + 0.1);
      state.money += calculated_properties.money.profit

      const bought = buyWorkers(calculated_properties, state)
      if (bought) { setWorkers(state.workers) }
      setMoney(state.money)
      history.push(calculated_properties)
      setHistory(history.splice(-300))


    }, 100); // increment time every 1000ms (1 second)
    return () => clearInterval(intervalId); // clean up when component unmounts
  });

  return (
    <>
      <main className="flex flex-col justify-between p-12 max-w-5xl w-full m-auto boxed my-2">
        <div className="flex">
          <div className="flex-auto">
            <h1>Lazy Idle</h1>
          </div>
          <Pause pause={pause} setPause={setPause} />
        </div>
        <GameStateContext.Provider value={context}>
          <div className="z-10 w-full  justify-between font-mono text-sm flex items-stretch">
            <GameController setWorkerFormula={setWorkerFormula} />
            <GameStats />
          </div>
          <PlotStats history={history} />
        </GameStateContext.Provider>
      </main >
    </>
  );
}
