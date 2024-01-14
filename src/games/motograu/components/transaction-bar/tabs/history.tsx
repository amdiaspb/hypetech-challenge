import React, { useContext, useEffect, useState } from 'react'
import BetList, { TransactionStatus } from '../lists/history'
import { CrashGameContext } from '@/core/providers/games/crash-game.provider'
import Header from '../lists/history/header'

export default function HistoryTab() {
  const { betsHistory, getBetsHistory } = useContext(CrashGameContext)
  console.log

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
    getBetsHistory()
  }, [])

  return (
    <div className="flex flex-col flex-1">

      <section className="py-4 px-3 w-full">
        <div className="flex justify-between rounded bg-opacity-25 items-center ">

          <div className="flex flex-col">
            <div className='text-xs text-stone-400'>Nº de apostas</div>
            <div className="text-sm font-medium text-white">{betsHistory.length}</div>
          </div>

          <div className="flex flex-col">
            <div className='text-xs text-stone-400'>Total Apostado</div>
            <div className="text-sm font-medium text-white">{sum(betsHistory)}</div>
          </div>

        </div>
      </section>

      <Header />

      <section className="h-full flex-shrink-1 flex-grow basis-0  overflow-y-scroll scrollbar-w-0 scrollbar-track-gray-400 scrollbar-thumb-gray-700 scrollbar scrollbar-track-rounded scrollbar-thumb-rounded">
        <BetList items={betsHistory} />
      </section>
    </div>
  )
}
