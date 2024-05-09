"use client"

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import GameController from "./components/GameController";
import GameOver from "./components/GameOver";
import GameStats from "./components/GameStats";
import Pause from "./components/Pause";
import { buyFactory, buyWorkers, get_calculated_properties } from "./utils/Game";
import { GameStateContext, StartingGameContext, State } from "./utils/GameStateContext";

const PlotStats = dynamic(() => import('./components/PlotStats'), {
  ssr: false,
})

export default function Home() {
  const [money, setMoney] = useState(StartingGameContext.state.money);
  const [time, setTime] = useState(StartingGameContext.state.time)
  const [workerFormula, setWorkerFormula] = useState(StartingGameContext.state.workerFormula)
  const [workers, setWorkers] = useState(StartingGameContext.state.workers)
  const [factoryFormula, setFactoryFormula] = useState(StartingGameContext.state.factoryFormula)
  const [factories, setFactories] = useState(StartingGameContext.state.factories)
  const [pause, setPause] = useState(true)

  const state: State = {
    money,
    workers,
    time,
    setMoney,
    setWorkers,
    workerFormula,
    factories,
    setFactories,
    factoryFormula
  }

  const calculated_properties = get_calculated_properties(state)
  let [history, setHistory] = useState([calculated_properties])
  const context = {
    state,
    calculated_properties
  }

  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (money < 0) {
      setIsGameOver(true);
      setPause(true);
    }
  }, [money]);

  const handleReset = () => {
    setMoney(StartingGameContext.state.money);
    setTime(StartingGameContext.state.time);
    setWorkers(StartingGameContext.state.workers);
    setFactories(StartingGameContext.state.factories)
    setPause(true);
    setIsGameOver(false);
    setHistory([])
    console.log("Resetting")
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (pause) { return };
      setTime(time + 0.1);
      state.money += calculated_properties.money.change

      {
        const bought = buyWorkers(calculated_properties, state)
        if (bought) { setWorkers(state.workers) }
      }
      {
        const bought = buyFactory(calculated_properties, state)
        if (bought) { setFactories(state.factories) }
      }

      setMoney(state.money)
      history.push(calculated_properties)
      setHistory(history.splice(-1000))

    }, 100); // increment time every 1000ms (1 second)
    return () => clearInterval(intervalId); // clean up when component unmounts
  });

  return (
    <>
      <main className="flex flex-col justify-between p-12 max-w-5xl w-full m-auto my-2">
        <div className="flex">
          <div className="flex-auto">
            <h1>Lazy Idle</h1>
          </div>
          {!isGameOver && <Pause pause={pause} setPause={setPause} />}
        </div>
        <GameStateContext.Provider value={context}>
          <div className="z-10 w-full font-mono text-sm flex items-stretch">
            {!isGameOver ? <GameController setWorkerFormula={setWorkerFormula} setFactoryFormula={setFactoryFormula} className="flex-1" /> : <GameOver className="flex-1" handleReset={handleReset} />}
            <GameStats className="flex-1" />
          </div>
          <PlotStats history={history} />
        </GameStateContext.Provider>
      </main >
    </>
  );
}
