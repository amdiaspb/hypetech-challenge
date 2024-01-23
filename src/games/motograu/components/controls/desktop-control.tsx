import React, { useState } from 'react'
import CrashForm from './crash/form'
import If from '@/core/components/conditions/if'

type Props = {
  color: string
}

export default function DesktopControl({ color, previewMode }: Props) {
  const [second, setSecond] = useState<boolean>(true)
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2
  });

  return (
    <div className="hidden w-full gap-3 justify-center flex-wrap md:flex-nowrap md:flex">
      <CrashForm
        color={color}
        secondEnabled={second}
        toggleSecond={setSecond}
        position="left"
        previewMode={previewMode}
      />

      <If condition={second && !previewMode}>
        <CrashForm
          color={color}
          hideSelf={setSecond}
          position="right"
        />
      </If>
    </div>
  )
}
