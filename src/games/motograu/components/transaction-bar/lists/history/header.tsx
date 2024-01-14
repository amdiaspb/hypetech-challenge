import React from 'react'

export default function Header() {
  return (
    <div className="w-full bg-white/5 rounded z-10 grid-cols-5 flex items-center text-xs px-4 py-2 mb-1.5 font-medium">
      <h1 className="w-1/4 text-left">#</h1>
      <h1 className="w-1/4 text-center">Valor</h1>
      <h1 className="w-1/4 text-center">Fair</h1>
      <div className="w-1/4 text-right">Ganho</div>
    </div>
  )
}
