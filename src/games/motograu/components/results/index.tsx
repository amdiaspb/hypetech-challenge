import React, { useContext, useEffect, useState } from 'react'
import { ClockIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Badge from '@/games/motograu/components/results/badge'
import If from '@/core/components/conditions/if'
import { CrashGameContext } from '@/core/providers/games/crash-game.provider'
import RoundInfoModal from '../shared/modals/crash/round-info'
import { LuHistory } from "react-icons/lu";

type Props = {
  variant: string
}

type ICrashResult = {
  round_id?: number
  point: number
}

export default function MultiplierResults({ variant }: Props) {
  const [expand, setExpand] = useState(false)
  const { results, getResults } = useContext<any>(CrashGameContext)
  const { roundInfo, getRoundInfo } =
    useContext<any>(CrashGameContext)

  const [showInfo, setShowInfo] = useState<boolean>(false)

  const showRoundInfo = (roundId) => {
    getRoundInfo(roundId)
    setShowInfo(true)
  }

  useEffect(() => {
    getResults()
  }, [])

  return (
    <div className="relative">


      <If condition={!expand}>
        <div className='absolute z-10 w-10 h-full right-12 lg:right-14 bg-gradient-to-l from-[#121212] pointer-events-none' />

        {/* <button
          className={
            `flex gap-1.5 h-8 py-3 px-3 pl-2.5 text-blue-50
            items-center justify-center rounded-lg bg-blue-600 opacity-90 hover:opacity-100
            uppercase text-xs font-semibold whitespace-nowrap tracking-wider transition cursor-pointer
            shadow-[0_0_5px_1px_rgb(0,0,0,0.1)] shadow-blue-600/30
          `}
        >
          <span className='text-xl'>🤩</span>
          Receba 10 gráus grátis agora!
        </button> */}

        <div className='relative h-8 mr-12 lg:mr-14 overflow-hidden'>
          <div className="flex absolute gap-2">
            {results?.map((result, idx) => {
              return (
                <Badge
                  key={idx}
                  showRoundInfo={showRoundInfo}
                  textColor={
                    result.point < 2
                      ? 'text-[#34b4ff]'
                      : result.point < 10
                      ? 'text-[#913ef8]'
                      : 'text-[#c017b4]'
                  }
                  roundId={result.round_id}
                  multipler={result.point}
                />
              )
            })}
          
          </div>
        </div>
      </If>

      <If condition={expand}>
        <div className="h-8"/>
        
        <div className="h-auto z-20 absolute -bottom-1 w-full rounded-b-lg bg-[#121212] p-6">
          <div className="rounded-md">
            <h3 className="relative flex gap-2 font-medium text-sm w-fit pl-1 pr-2 pb-3 -mt-1 border-b-2 border-white/50 -mb-0.5 z-50 uppercase">
              <LuHistory className="h-5 w-5" strokeWidth={2} />
              Histórico de Partidas
            </h3>

            <div className="flex flex-wrap border-t-2 pt-3.5 border-stone-800 max-h-40 rounded-b gap-2 overflow-y-scroll scrollbar-w-0 scrollbar-track-gray-400 scrollbar-thumb-gray-700 scrollbar scrollbar-track-rounded scrollbar-thumb-rounded">
              {results?.map((result, idx) => {
                return (
                  <Badge
                    key={idx}
                    showRoundInfo={showRoundInfo}
                    textColor={
                      result.point < 2
                        ? 'text-[#34b4ff]'
                        : result.point < 10
                        ? 'text-[#913ef8]'
                        : 'text-[#c017b4]'
                    }
                    roundId={result.round_id}
                    multipler={result.point}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </If>

      <div className=" results-btn h-auto flex absolute top-0 right-1 mt-0 z-20 rounded-xl">
        <button
          className={`flex h-8 py-3 px-3 items-center justify-center rounded-lg text-stone-400 hover:text-white text-xs font-semibold transition cursor-pointer`}
          onClick={(e) => setExpand(!expand)}
        >
          <If condition={!expand}>
            <LuHistory className="h-5 w-5" strokeWidth={2} />
          </If>

          <If condition={expand}>
            <div className='w-[44px] scale-y-90 scale-x-105 -mx-3 mb-0.5 text-xl font-normal'>x</div>
          </If>
        </button>
      </div>

      <RoundInfoModal
        show={showInfo}
        data={roundInfo}
        toggle={setShowInfo}
      />
    </div>
  )
}
