import React from 'react'

type Props = {
  multipler: string
  roundId: number
  textColor: string
  showRoundInfo: Function
}

export default function MultiplierBadge({
  multipler,
  roundId,
  textColor,
  showRoundInfo,
}: Props) {
  return (
    <>
      <button
        onClick={() => showRoundInfo(roundId)}
        className={`flex h-8 py-3 px-3 items-center justify-center rounded-lg bg-stone-950/80 saturate-[80%] hover:border-stone-800 hover:saturate-150 text-xs font-semibold transition cursor-pointer ${textColor}`}
      >
        {parseFloat(multipler).toFixed(2)}x
      </button>
    </>
  )
}
