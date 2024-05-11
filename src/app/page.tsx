"use client"

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Disclaimer from "./components/Diclaimer";
import GameController from "./components/GameController";
import GameOver from "./components/GameOver";
import GameStats from "./components/GameStats";
import TopControls from "./components/Pause";
import Tutorial from "./components/Tutorial";
import Victory from "./components/Victory";
import { MONEY_VICTORY, TIME_CONSTANT } from "./utils/Config";
import { get_calculated_properties } from "./utils/Game";
import { GameStateContext, StartingGameContext, State } from "./utils/GameStateContext";

const PlotStats = dynamic(() => import('./components/PlotStats'), {
  ssr: false,
})

let lastTime = Date.now()
const fromStorage = (key: string, default_value: string) => {
  const s = localStorage.getItem(key)
  if (s !== null) {
    return s
  }
  return default_value
}
const workerWorker = new Worker(new URL('utils/worker.tsx', import.meta.url), { type: 'module' })
const busterWorker = new Worker(new URL('utils/worker.tsx', import.meta.url), { type: 'module' })
const factoryWorker = new Worker(new URL('utils/worker.tsx', import.meta.url), { type: 'module' })


export default function Home() {
  const [money, setMoney] = useState(StartingGameContext.state.money);
  const [time, setTime] = useState(StartingGameContext.state.time)
  const [workers, setWorkers] = useState(StartingGameContext.state.workers)
  const [factories, setFactories] = useState(StartingGameContext.state.factories)
  const [workerFormula, setWorkerFormula_] = useState(fromStorage("workerFormula", StartingGameContext.state.workerFormula))
  const [factoryFormula, setFactoryFormula_] = useState(fromStorage("factoryFormula", StartingGameContext.state.factoryFormula))
  const [busterFormula, setBusterFormula_] = useState(fromStorage("busterFormula", StartingGameContext.state.busterFormula))
  const [busters, setBusters] = useState(StartingGameContext.state.busters)
  const [pause, setPause] = useState(true)
  const [unlockedFactories, setUnlockedFactories] = useState(false)
  const [unlockedBusters, setUnlockedBusters] = useState(false)
  const [shouldBuyWorker, setShouldBuyWorker] = useState({ success: true, cond: false })
  const [shouldBuyFactory, setShouldBuyFactory] = useState({ success: true, cond: false })
  const [shouldBuyBuster, setShouldBuyBuster] = useState({ success: true, cond: false })
  const [ups, setUps] = useState(0)
  const [isVictory, setIsVictory] = useState(false)

  const [isDisclaimerAccepted, setDisclaimerAccepted] = useState(process.env.NODE_ENV ? true : false)


  const setWorkerFormula = (t: string) => {
    setWorkerFormula_(t);
    localStorage.setItem("workerFormula", t)
  }
  const setFactoryFormula = (t: string) => {
    setFactoryFormula_(t);
    localStorage.setItem("factoryFormula", t)
  }
  const setBusterFormula = (t: string) => {
    setBusterFormula_(t);
    localStorage.setItem("busterFormula", t)
  }

  const state: State = {
    money,
    workers,
    time,
    setMoney,
    setWorkers,
    factories,
    setFactories,
    busters,
    setBusters,
    workerFormula,
    factoryFormula,
    busterFormula,
    setWorkerFormula,
    setFactoryFormula,
    setBusterFormula,
    unlockedFactories,
    unlockedBusters,
    shouldBuyBuster,
    shouldBuyFactory,
    shouldBuyWorker,
    setShouldBuyBuster,
    setShouldBuyFactory,
    setShouldBuyWorker,
    ups
  }

  const calculated_properties = get_calculated_properties(state)
  let [history, setHistory] = useState([calculated_properties])
  const context = {
    state,
    calculated_properties
  }

  const [isGameOver, setIsGameOver] = useState(false);


  const handleReset = () => {
    setMoney(StartingGameContext.state.money);
    setTime(StartingGameContext.state.time);
    setWorkers(StartingGameContext.state.workers);
    setFactories(StartingGameContext.state.factories);
    setBusters(StartingGameContext.state.busters)
    setPause(true);
    setIsGameOver(false);
    setHistory([])
    setIsVictory(false)
    console.log("Resetting")
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (pause) { return };
      if (money > MONEY_VICTORY) { setIsVictory(true); return }
      workerWorker.postMessage([calculated_properties, workerFormula])
      factoryWorker.postMessage([calculated_properties, factoryFormula])
      busterWorker.postMessage([calculated_properties, busterFormula])
      const newTime = Date.now()
      const time_since_last = (newTime - lastTime) / 1000
      lastTime = newTime
      setUps(1 / time_since_last)
      setTime(time + (0.1 * TIME_CONSTANT));
      state.money += calculated_properties.money.change * TIME_CONSTANT


      if (shouldBuyWorker.cond && (state.money > calculated_properties.worker.cost_next_once)) {
        state.workers += 1
        state.money -= calculated_properties.worker.cost_next_once
        setWorkers(workers + 1)
      }
      if (shouldBuyFactory.cond && (state.money > calculated_properties.factory.cost_next_once)) {
        state.factories += 1
        state.money -= calculated_properties.factory.cost_next_once
        setFactories(factories + 1)
      }
      if (shouldBuyBuster.cond && (state.money > calculated_properties.buster.cost_next_once)) {
        state.busters += 1
        state.money -= calculated_properties.buster.cost_next_once
        setBusters(busters + 1)
      }


      setMoney(state.money)
      history.push(calculated_properties)
      setHistory(history.splice(-100))

      if (money < 0) {
        setIsGameOver(true);
        setPause(true);
      }

      if (!unlockedBusters && money > calculated_properties.buster.cost_next_once) {
        setUnlockedBusters(true)
      }
      if (!unlockedFactories && money > calculated_properties.factory.cost_next_once) {
        setUnlockedFactories(true)
      }
    }, 100); // increment time every 1000ms (1 second)
    return () => clearInterval(intervalId); // clean up when component unmounts
  });

  workerWorker.onmessage = ({ data }) => {
    (data.cond != shouldBuyWorker.cond || data.success != shouldBuyWorker.success) && setShouldBuyWorker !== null && setShouldBuyWorker(data)
  }
  busterWorker.onmessage = ({ data }) => {
    (data.cond != shouldBuyBuster.cond || data.success != shouldBuyBuster.success) && setShouldBuyBuster !== null && setShouldBuyBuster(data)

  }
  factoryWorker.onmessage = ({ data }) => {
    (data.cond != shouldBuyFactory.cond || data.success != shouldBuyFactory.success) && setShouldBuyFactory !== null && setShouldBuyFactory(data)
  }

  return (
    <main className="flex flex-col justify-between p-12 max-w-7xl w-full m-auto my-2">
      <div className="flex">
        <div className={`${isDisclaimerAccepted ? "flex-auto" : "mx-auto"}`}>
          <h1>Lazy Idle</h1>
        </div>
        {!isGameOver && isDisclaimerAccepted && <TopControls pause={pause} setPause={setPause} isVictory={isVictory} handleReset={handleReset} time={state.time} />}
      </div>
      {!isDisclaimerAccepted ? <Disclaimer handleAcceptDisclaimer={() => { setDisclaimerAccepted(true) }} /> :
        <>
          <GameStateContext.Provider value={context}>
            <Victory state={state} isVictory={isVictory} handleReset={handleReset} />
            <div className="z-10 w-full font-mono text-sm flex items-stretch">
              {!isGameOver ? <GameController state={state} calculated_properties={calculated_properties} className="flex-auto" /> : <GameOver className="flex-auto" handleReset={handleReset} />}
              <GameStats className="flex-initial" unlockedFactories={unlockedFactories} unlockedBusters={unlockedBusters} />
            </div>
            <PlotStats history={history} />
            <Tutorial unlockedFactories={unlockedFactories} unlockedBusters={unlockedBusters} />
          </GameStateContext.Provider>
        </>
      }
    </main >
  );
}
