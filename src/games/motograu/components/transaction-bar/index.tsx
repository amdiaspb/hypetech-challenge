import React, { useState } from 'react'

import If from '@/core/components/conditions/if'
import Tabs, { Tab } from '../tabs'
import BetsTab from './tabs/bets'
import HistoryTab from './tabs/history'
import BestTab from './tabs/best'
import Footer from '@/games/motograu/components/footer'
import motograuLogo from '@/assets/logos/moto-grau.png'
import { LuCircleDollarSign } from "react-icons/lu";

type Props = {
  variant: string
}

export default function TransactionBar({ variant }: Props) {
  const [activeTab, setActiveTab] = useState('bets')

  const tabs: Tab[] = [
    { key: 'bets', title: 'Apostas', icon: () => <LuCircleDollarSign className='w-[18px] h-[18px] lg:w-[22px] lg:h-[22px]'/> },
    { key: 'history', title: 'Histórico', icon: HistorySVG },
    //{ key: 'best', title: 'Estatísticas', icon: RankingSVG },
  ]

  return (
    <div className="flex flex-col h-full p-1">
      <div className="flex flex-col flex-1 transaction-bar min-h-[400px] w-full p-3 rounded-t-lg bg-[#161616] border-2 border-b-0 border-stone-800 relative ">
        
        <img src={motograuLogo} alt="logo" className='w-[145px] -mt-16 mb-2 self-center hidden lg:block' />
        
        <section className="w-full flex justify-center ">
          <div className="w-full">
            <Tabs
              tabs={tabs}
              size="w-1/2"
              active={activeTab}
              toggle={setActiveTab}
              variant={variant}
            />
          </div>
        </section>

        <If condition={activeTab == 'bets'}>
          <BetsTab />
        </If>
        <If condition={activeTab == 'history'}>
          <HistoryTab />
        </If>
        <If condition={activeTab == 'best'}>
          <BestTab />
        </If>
      </div>

      <Footer />

    </div>
  )
}

function PokerChipSVG() {
  return (
    <svg className="w-[18px] h-[18px] lg:w-5 lg:h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 256">
      <path fill="currentColor" d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 152a48 48 0 1 1 48-48a48.05 48.05 0 0 1-48 48m39.21-98.53a63.66 63.66 0 0 0-31.21-13v-24.1a87.6 87.6 0 0 1 48.28 20ZM120 64.52a63.66 63.66 0 0 0-31.21 13L71.72 60.4a87.6 87.6 0 0 1 48.28-20ZM77.47 88.79a63.66 63.66 0 0 0-13 31.21h-24.1a87.6 87.6 0 0 1 20-48.28ZM64.52 136a63.66 63.66 0 0 0 13 31.21L60.4 184.28a87.6 87.6 0 0 1-20-48.28Zm24.27 42.53A63.66 63.66 0 0 0 120 191.48v24.15a87.6 87.6 0 0 1-48.28-20ZM136 191.48a63.66 63.66 0 0 0 31.21-12.95l17.07 17.07a87.6 87.6 0 0 1-48.28 20Zm42.53-24.27A63.66 63.66 0 0 0 191.48 136h24.15a87.6 87.6 0 0 1-20 48.28ZM191.48 120a63.66 63.66 0 0 0-12.95-31.21l17.07-17.07a87.6 87.6 0 0 1 20 48.28Z"/>
    </svg>
  );
}

function HistorySVG() {
  return (
    <svg className="w-[18px] h-[18px] lg:w-5 lg:h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 10">
      <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 1h10M6 5h10M6 9h10M1.49 1h.01m-.01 4h.01m-.01 4h.01"/>
    </svg>
  );
}

function RankingSVG() {
  return (
    <svg className="w-3.5 h-3.5 lg:w-4 lg:h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 18">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 12v5m5-9v9m5-5v5m5-9v9M1 7l5-6 5 6 5-6"/>
    </svg>
  );
}
