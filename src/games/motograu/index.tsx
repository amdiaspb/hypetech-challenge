import './index.css'

import React, { useContext, useEffect } from 'react'
import Display from './components/display'
import Snackbar from '@/core/components/snackbar'
import Results from '@/core/components/results'
import TransactionBar from '@/core/components/transaction-bar'
import Controls from '@/core/components/controls/crash-control'
import { CrashGameContext } from '@/core/providers/games/crash-game.provider'
import { SessionContext } from '@/core/providers/session.provider'
import { GameStatus } from '@/core/providers/enums/game-status'
import Navbar from '@/core/components/navbar'
import bgFlag from '@/assets/background/motograu-flag.png'

function HomePage() {
  const { setLoading } = useContext<any>(SessionContext)
  const { iframeRef, gameStatus, executeAction, balance } =
    useContext<any>(CrashGameContext)

  useEffect(() => {
    iframeRef.current?.contentWindow.addEventListener(
      'instance-created',
      () => {
        setLoading(false)
        if (gameStatus == GameStatus.RUNNING)
          setTimeout(() => executeAction('start'), 1000)
      }
    )
  }, [iframeRef])

  return (
    <div className="flex min-h-screen overflow-hidden bg-gradient-to-r motograu-game font-sans">
      <img src={bgFlag} alt="" className='absolute'/>
      <div className="flex w-full sm:gap-3 min-h-screen relative">
        <section className="flex flex-col h-full grow p-0">

          <div className="" style={{ zIndex: 100 }}>
            <Navbar
              game="motograu"
              executeAction={executeAction}
              balance={balance}
            />
          </div>

          <div className="grid p-3 gap-3 grow rounded w-full grid-cols-12">
            <div className="col-span-12 sm:col-span-4 grow xl:col-span-3 order-2 sm:order-1">
              <TransactionBar />
            </div>

            <div className="relative col-span-12 sm:col-span-8 xl:col-span-9 order-1 sm:order-1 lg:order-2 p-1">
              <div className="flex gap-3 h-full flex-col">

                <div className="grow relative z-0">
                  <iframe
                    ref={iframeRef}
                    className="rounded-md overflow-hidden w-full h-full pointer-events-none min-h-[250px] sm:min-h-[300px]"
                    src="/motograu/index.html"
                  ></iframe>
                  <div className="bg-gray-700 hidden rounded-md overflow-hidden w-full h-full pointer-events-none min-h-[250px] sm:min-h-[300px]"></div>
                  <div className="w-full h-full">
                    <Display color={'pink'} />
                  </div>
                  <Snackbar />
                </div>

                <Results />

                <Controls color="lime" position={'center'} />
                
              </div>

            </div>
          </div>
          
        </section>
      </div>
    </div>
  )
}

export default HomePage
