import React from 'react'

export default function Header() {
  return (
    <div className="w-full bg-white/5 rounded z-10 grid-cols-5 flex items-center text-[11px] lg:text-xs px-2.5 py-1.5 lg:px-4 lg:py-2 mb-1.5 font-medium">
      <h1 className="w-1/4 text-left">Usuário</h1>
      <h1 className="w-1/4 text-center">Aposta</h1>
      <h1 className="w-1/4 text-center">Multiplicador</h1>
      <h1 className="w-1/4 text-right">Lucro</h1>
    </div>
  )
}
