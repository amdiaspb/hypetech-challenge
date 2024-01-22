import React, { useContext, useEffect, useState } from 'react'
import BetList from '../lists/bets'

import { CrashGameContext } from '@/core/providers/games/crash-game.provider'
import Header from '../lists/bets/header'

export default function BetsTab({ previewMode }) {
  const { registeredBets, getRegisteredBets } =
    useContext(CrashGameContext)

  const sum = (bets = []) => {
    let sum = 0
    bets.map((bet) => {
      sum += parseFloat(bet.amount)
    })

    return sum.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL' 
    });
  }

  useEffect(() => {
    getRegisteredBets()
  }, [])

  return (
    <div className="flex flex-col flex-1">

      <section className="px-2.5 py-3 lg:px-3 lg:py-4 w-full">
        <div className="flex justify-between rounded bg-opacity-25 items-center ">

          <div className="flex flex-col">
            <div className='leading-[15px] text-[11px] lg:text-xs text-stone-400'>Apostadores</div>
            <div className="text-[13px] lg:text-sm font-medium text-white">{registeredBets.length}</div>
          </div>

          <div className="flex flex-col">
            <div className='leading-[15px] text-[11px] lg:text-xs text-stone-400'>Total Apostado</div>
            <div className="text-[13px] lg:text-sm font-medium text-white">{sum(registeredBets)}</div>
          </div>

          <div className='flex items-center gap-2.5 lg:gap-3 rounded-lg px-1 lg:px-3 text-[13px] lg:text-sm text-stone-400'>
            <div className='rounded-full w-2 h-2 bg-green-400 shadow-[0_0_10px_2px_rgb(0,0,0,0.2)] shadow-green-500'/>
            <div><span className='text-white font-medium'>123</span> Online</div>
          </div>
        </div>
      </section>

      <Header />

      <section className="h-full flex-shrink-1 flex-grow basis-0 overflow-y-scroll scrollbar-w-0 scrollbar-track-gray-400 scrollbar-thumb-gray-600 scrollbar scrollbar-track-rounded scrollbar-thumb-rounded">
        <BetList items={registeredBets} previewMode={previewMode} />
      </section>
    </div>
  )
}
