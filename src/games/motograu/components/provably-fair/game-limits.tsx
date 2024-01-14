import Modal from '@/games/motograu/components/modal'
import { XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'

type Props = {
  show: boolean
  toggle: Function
}

export default function GameLimitsModal({ show, toggle }: Props) {
  return (
    <Modal show={show} toggle={toggle}>
      <div className="w-full rounded-md bg-[#383A3E] opacity-100">
        <section className="modal-header px-6 py-4 flex justify-between items-center relative bg-[#141414]">
          <h1 className="text-[17px] uppercase font-bold pl-1 flex gap-4 text-white">
            Limites do Jogo
          </h1>
          <button
            onClick={(_) => toggle()}
            className="btn p-0 btn-sm hover:bg-transparent hover:text-white  btn-ghost "
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </section>

        <div className="flex text-sm flex-col p-8 bg-[#1b1b1b]">
          <div className="flex justify-between px-4 items-center border-b-0 text-sm w-full h-12 rounded-t-md border-2 border-white/10 bg-transparent">
            <span>Aposta mínima (R$):</span>

            <span className="text-emerald-400 px-2 py-1 rounded font-medium saturate-100">
              1.00
            </span>
          </div>
          <div className="flex justify-between px-4 items-center text-sm w-full h-12 border-2 border-white/10 bg-transparent">
            <span>Aposta máxima (R$):</span>

            <span className="text-emerald-400 px-2 py-1 rounded font-medium saturate-100">
              500.00
            </span>
          </div>

          <div className="flex justify-between px-4 items-center text-sm w-full h-12 border-t-0 rounded-b-md border-2 border-white/10 bg-transparent">
            <span>Ganho máximo por aposta (R$):</span>

            <span className="text-emerald-400 px-2 py-1 rounded font-medium saturate-100">
              10000.00
            </span>
          </div>
        </div>
      </div>
    </Modal>
  )
}
