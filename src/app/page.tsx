"use client"

import dynamic from 'next/dynamic'
// import MainGame from "./components/MainGame"
const MainGame = dynamic(() => import('./components/MainGame'), {
  ssr: false
})
export default function Home() {
  return <main className="flex flex-col justify-between p-12 max-w-7xl w-full m-auto my-2">
    <MainGame />
  </main>
}
