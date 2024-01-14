import React, { useContext, useEffect, useState } from 'react'
import ProgressBar from '@/core/components/progress-bar'
import If from '@/core/components/conditions/if'
import { GameStatus } from '@/core/providers/enums/game-status'
import { CrashGameContext } from '@/core/providers/games/crash-game.provider'

type Props = {
  color: string
}

export default function Display({ color }: Props) {
  const { startTimeout, gameStatus, multiplier } =
    useContext<any>(CrashGameContext)

  const bloom = (multiplier > 5)
    ? ['h-[166%] w-[166%]', 'bg-[#ff55aa]', 'bg-[#943162]', 'h-[250%]', 'bg-white/50']
    : (multiplier > 2) ? ['h-[133%] w-[133%]', 'bg-[#a45aff]', 'bg-[#603596]', 'h-[250%]', 'bg-[#603596]/30']
    : ['h-[100%] w-[100%]', 'bg-[#34b4ff]', 'bg-[#2277a8]', 'h-[200%]', 'bg-[#2277a8]/30']
  ;

  return (
    <div className="absolute top-0 left-0 flex flex-col gap-3 justify-center items-center w-full h-full pointer-events-none overflow-hidden">

      <If condition={gameStatus == GameStatus.IDLE}>
        <div className="absolute top-[14%] flex justify-center items-center">
          <div className={`absolute h-[233%] w-[133%] rounded-full bg-black/20 blur-2xl`}/>
          <div className="w-fit">
            <div className={`mb-0.5 text-lg lg:text-2xl font-semibold text-gray-200 drop-shadow [text-shadow:2px_2px_1px_rgb(0_0_0_/_100%)] uppercase animate-bounce`}>
            🚀 Preparando para empinar 🚀
            </div>
            <ProgressBar
              max={10}
              value={startTimeout}
              color={color}
              label=""
            />
          </div>
        </div>
      </If>

      <If condition={gameStatus == GameStatus.RUNNING}>
        <div className="absolute top-[15%] flex justify-center items-center">
          <div className={`absolute ${bloom[0]} rounded-full ${bloom[1]} blur-xl`}/>
          <div className={`absolute ${bloom[0]} rounded-full ${bloom[2]} blur-xl mix-blend-hard-light`}/>
          <div className={`absolute ${bloom[3]} aspect-square rounded-full ${bloom[4]} saturate-200 mix-blend-plus-lighter blur-[2px] animate-ping`}/>

          <h1 className="text-6xl md:text-6xl lg:text-6xl font-semibold text-gray-200 drop-shadow [text-shadow:2px_2px_1px_rgb(0_0_0_/_100%)]">
            {multiplier?.toFixed(2)}x
          </h1>
        </div>
      </If>

      <If condition={gameStatus == GameStatus.MAINTENANCE}>
        <div className="relative flex justify-center items-center">
          <h1
            className="text-2xl md:text-3xl uppercase lg:text-3xl font-bold text-gray-200 drop-shadow"
            style={{ WebkitTextStroke: '1px #000' }}
          >
            Em manutenção!
          </h1>
        </div>
      </If>

      <If condition={gameStatus == GameStatus.GAME_OVER}>
        <div className="absolute top-[15%] gap-3 flex flex-col justify-center items-center">
          <div className={`absolute h-[250%] w-[150%] rounded-full bg-black/20 blur-2xl`}/>
          <h1 className={`text-6xl md:text-6xl lg:text-6xl font-bold text-red-600 drop-shadow [text-shadow:2px_2px_1px_rgb(0_0_0_/_100%)]`} style={{ WebkitTextStroke: '1px #000' }}>
            {multiplier.toFixed(2)}x
          </h1>
          <h1 className={`z-10 text-2xl md:text-2xl lg:text-2xl font-semibold text-gray-200 drop-shadow [text-shadow:2px_2px_1px_rgb(0_0_0_/_100%)] uppercase animate-bounce`}>
          🔥 O piloto caiu! 🔥
          </h1>
        </div>
      </If>
    </div>
  )
}
