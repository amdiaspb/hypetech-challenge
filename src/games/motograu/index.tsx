import './index.css'

import React, { useContext, useEffect, useRef, useState } from 'react'
import Display from './components/display'
import Snackbar from '@/games/motograu/components/snackbar'
import Results from '@/games/motograu/components/results'
import TransactionBar from '@/games/motograu/components/transaction-bar'
import Controls from '@/games/motograu/components/controls/crash-control'
import { CrashGameContext } from '@/core/providers/games/crash-game.provider'
import { SessionContext } from '@/core/providers/session.provider'
import { GameStatus } from '@/core/providers/enums/game-status'
import Navbar from '@/games/motograu/components/navbar'
import { Chat } from '@/games/motograu/components/chat'
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

  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showChat ? 'hidden' : 'unset';
  }, [showChat]);

  return (
    <div className="flex min-h-screen relative motograu-game font-sans">

      <img src={bgFlag} alt="Moto Grau Logo" className='hidden absolute lg:block'/>
      
      <div className="flex flex-col">

        <Navbar
          game="motograu"
          executeAction={executeAction}
          balance={balance}
          showChat={showChat}
          setShowChat={setShowChat}
        />

        <div className="flex flex-col-reverse lg:flex-row flex-auto p-3 pt-0 gap-3 rounded">
          
          <div className='flex-[1_1_0]'>
            <TransactionBar />
          </div>

          <div className="flex flex-col flex-[3_1_0] gap-3">
            <div className='flex h-full'>
              <div className="relative flex-[10_1_0] h-full overflow-hidden">
                <iframe
                  ref={iframeRef}
                  className="w-full h-full min-h-[250px] sm:min-h-[300px] rounded-md pointer-events-none"
                  src="/motograu/index.html"
                />
                <Display color={'pink'} />
                <Snackbar />
              </div>

              <div className={`hidden lg:block lg:flex-[0_0_0] ${showChat && 'lg:flex-[3_1_0]'}`}>
                <Chat show={showChat}/>
              </div>
            </div>

            <Results />

            <Controls color="lime" position={'center'} />
          </div>

        </div>
        
      </div>

      <div className={`lg:hidden`}>
        <Chat show={showChat}/>
      </div>

    </div>
  )
}

export default HomePage
