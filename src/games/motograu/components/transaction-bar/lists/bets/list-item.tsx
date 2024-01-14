import React, { useState, useEffect } from 'react'
import { Transaction, TransactionStatus } from '.'
import If from '@/core/components/conditions/if'

type Props = {
  data: Transaction
}

export default function ListItem({ data }: Props) {
  const isGreen = data.outcome == 'win'
  const isRed = data.outcome == 'lose'
  const [randomNumber, setRandomNumber] = useState(null)
  
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL' 
  });
  const breakpoint = [2, 5];

  // Gere o número aleatório uma única vez quando o componente for montado
  useEffect(() => {
    const randomNum = Math.floor(Math.random() * 21)
    setRandomNumber(randomNum)
  }, []) // O array vazio [] garante que o efeito seja executado apenas uma vez

  return (
    <div
      className={`flex items-center rounded mb-1.5 py-2 px-4 gap-1 text-xs ${
        isGreen ? (data.payout < breakpoint[0]) ? 'bg-[#34b4ff]/5': (data.payout < breakpoint[1]) ? 'bg-[#913ef8]/5' : 'bg-[#c017b4]/5' : ''
      } `}
    >
      <h1 className="w-1/4 flex gap-3 overflow-hidden items-center">
        <img
          src={`https://api.multiavatar.com/${randomNumber}.svg`}
          className="w-5 h-5 rounded invert"
        />
        <span className="whitespace-nowrap player-name truncate opacity-80">
          {data.player.username}
        </span>
      </h1>

      <h1 className="w-1/4 text-center items-center gap-2">
        <span className={`w-10 text-right font-medium ${isRed && 'text-red-500/80'}`}>
          {formatter.format(data.amount)}
        </span>
      </h1>

      <h1 className={`w-1/4 items-center text-center gap-2 font-medium ${isRed ? 'text-red-500/80' : 'text-white/40'}`}>
        {!data.payout && <span>-</span>}
        <If condition={data.outcome == 'win'}>
          <span
            className={
              `flex items-center justify-center h-5 w-[52px] mx-auto rounded text-xs text-center border border-transparent text-gray-100 [text-shadow:1px_1px_1px_rgb(0_0_0_/_50%)]
               ${
                  (data.payout < breakpoint[0]) ? 'bg-[#34b4ff]/30' 
                  : (data.payout < breakpoint[1]) ? 'bg-[#a45aff]/30 shadow-[0_0_8px_1px_rgb(0,0,0,0.1)] shadow-[#a45aff]/30' 
                  : 'bg-[#ff55f4]/30 shadow-[0_0_10px_2px_rgb(0,0,0,0.1)] shadow-[#ff55f4]/40'
                }
              `
            }>
            <span className={(data.payout < breakpoint[0]) ? 'text-[#5ed9ff]': (data.payout < breakpoint[1]) ? 'text-[#c393ff]' : 'text-[#ff7af8]'}>
              {data.payout}x
            </span>
          </span>
        </If>
      </h1>

      <div className={
          `w-1/4 text-right font-semibold ${data.profit > 100 && ' [text-shadow:_0_0_10px_var(--tw-shadow-color)]'} 
          ${data.profit >= 200 ? 'shadow-yellow-400' : data.profit >= 100 ? 'shadow-green-400' : ''} 
          ${isGreen ? data.profit >= 200 ? 'text-yellow-400' : 'text-green-400' : isRed ? 'text-red-500/80' : 'text-white/40'}`
        }>

        {!data.profit && <span className='font-medium'>-</span>}

        <If condition={isGreen}>
          {data.profit !== undefined && typeof data.profit === 'number'
            ? formatter.format(data.profit)
            : '0,00'}
        </If>
      </div>

    </div>
  )
}
