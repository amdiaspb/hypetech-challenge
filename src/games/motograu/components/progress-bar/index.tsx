import React from 'react'

type Props = {
  value: number
  max: number
  color: string
  label?: string
}

const getBackgroundColor = (color: string) => {
  switch (color) {
    case 'blue':
      return 'bg-blue-600'
    case 'lime':
      return 'bg-[#28a909]'
    case 'yellow':
      return 'bg-yellow-400'
    case 'amber':
      return 'bg-amber-600'
    case 'red':
      return 'bg-red-700'
    case 'pink':
      return 'bg-pink-700'
    case 'rose':
      return 'bg-rose-700'
    case 'gray':
      return 'bg-gray-400'
  }
}

export default function ProgressBar({
  max,
  value,
  color,
  label = 'Próxima Rodada em',
}: Props) {
  return (
    <div className="w-full relative flex items-center bg-black/50 rounded-md p-1 h-[26px]">
      <div className={`${getBackgroundColor(color)} h-full transition-all duration-100 rounded`}
        style={{
          width: `${(value / max) * 100}%`,
          transitionTimingFunction: 'linear',
          transitionDuration: '990ms',
        }}
      ></div>

      <small className="absolute w-full h-full font-semibold text-center text-sm pointer-events-none flex items-center justify-center text-gray-200 uppercase [text-shadow:1.5px_1.5px_1.5px_rgb(0_0_0_/_100%)]">
        {label} {Math.abs(value)}
      </small>
    </div>
  )
}
