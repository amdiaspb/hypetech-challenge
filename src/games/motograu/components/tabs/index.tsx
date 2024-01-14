import React from 'react'
import { CiBitcoin } from "react-icons/ci";
import { IconType } from 'react-icons/lib/cjs/iconBase'

export type Tab = {
  key: string
  title: string
  icon?: () => React.JSX.Element
}

type Props = {
  tabs: Tab[]
  active: string
  size: string
  toggle: Function
  variant: string
}

const getVariantColor = (variant: string) => {
  switch (variant) {
    case 'blue':
      return 'bg-blue-700'
    case 'lime':
      return 'bg-lime-600'
    case 'yellow':
      return 'bg-yellow-400'
    case 'red':
      return 'bg-red-700'
    case 'pink':
      return 'bg-pink-700'
    case 'rose':
      return 'bg-rose-700'
    case 'orange':
      return 'bg-orange-700'
    case 'slate':
      return 'bg-slate-600'
  }
}

export default function Tabs({
  tabs,
  size,
  active,
  toggle,
  variant = 'slate',
}: Props) {
  return (
    <div
      className={`tabs p-1 rounded-lg bg-[#0e0e0e] border-2 border-stone-800/60 flex w-full justify-center flex-wrap`}
    >
      {tabs.map((tab) => {
        return (
          <a
            key={tab.key}
            className={`tab tab-sm flex grow h-8 gap-1.5 items-center text-xs font-medium text-[#5e5e5e] ${
              active == tab.key
                ? `rounded bg-[#121212] text-[#969696] [&>svg]:text-[#dddfdc]`
                : 'hover:text-[#969696]'
            }`}
            onClick={() => toggle(tab.key)}
          >
            {tab.icon && <tab.icon/>}
            {tab.title}
          </a>
        )
      })}
    </div>
  )
}
