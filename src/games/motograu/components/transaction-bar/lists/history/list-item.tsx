import React, { useContext, useState } from 'react'
import If from '@/core/components/conditions/if'
import { ShieldCheckIcon } from '@heroicons/react/24/outline'
import { dateToHumanReadable } from '@/core/helpers/date'

type Props = {
  data: any
  showRoundInfo: Function
}

export default function ListItem({ data, showRoundInfo }: Props) {
  const isGreen = data.outcome == 'win'
  const isRed = data.outcome == 'lose'

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL' 
  });
  const breakpoint = [2, 5];

  return (
    <>
      <div
        className={`flex items-center rounded mb-1.5 py-2 px-4 gap-1 text-xs ${
          isGreen ? (data.payout < breakpoint[0]) ? 'bg-[#34b4ff]/5': (data.payout < breakpoint[1]) ? 'bg-[#913ef8]/5' : 'bg-[#c017b4]/5' : ''
        } `}
      >
        <h1 className="w-1/4 flex gap-3 items-center">
          {dateToHumanReadable(data.updated_at)}
        </h1>

        <h1 className="w-1/4 text-center items-center gap-2">
          <span className={`w-10 text-right font-medium`}>
            {formatter.format(data.amount)}
          </span>
        </h1>

        <h1 
          className={`w-1/4 flex gap-1 items-center justify-center font-medium text-white/40 cursor-pointer`}
          onClick={() => showRoundInfo(data.round_id)}
        >
          <span
            className={
              `flex items-center justify-center h-5 w-[52px] ml-2 rounded text-xs text-center border border-transparent text-gray-100 [text-shadow:1px_1px_1px_rgb(0_0_0_/_50%)]
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
          <ShieldCheckIcon className="w-5 h-5 text-white/50" />
        </h1>

        <div className={
            `w-1/4 text-right font-semibold ${data.profit > 100 && ' [text-shadow:_0_0_10px_var(--tw-shadow-color)]'} 
            ${data.profit >= 200 ? 'shadow-yellow-400' : data.profit >= 100 ? 'shadow-green-400' : ''} 
            ${isGreen ? data.profit >= 200 ? 'text-yellow-400' : 'text-green-400' : isRed ? 'text-red-500/80' : 'text-white/40'}`
          }>
          {data.profit !== undefined && formatter.format(+data.profit)}
        </div>

{/*         <div className="w-1/4 flex items-center justify-end relative gap-1">
          <div className="z-0">
            <button
              className="btn btn-xs btn-ghost p-1 h-1"
              onClick={() => showRoundInfo(data.round_id)}
            >
              <ShieldCheckIcon className="w-4 h-4" />
            </button>
          </div>
        </div> */}

      </div>
    </>
  )
}
