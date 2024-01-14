import Modal from '@/games/motograu/components/modal'
import {
  ServerIcon,
  ShieldCheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import React from 'react'

export interface IRoundInfo {
  id: number
  seed: string
  extras: {
    hash: string
    point: number
    decimal: number
    slice: string
  }
}

type Props = {
  show: boolean
  toggle: Function
  data: IRoundInfo
}


export default function RoundInfoModal({
  show,
  toggle,
  data,
}: Props) {
  return (
    <Modal show={show} toggle={toggle}>
      <div className="w-full rounded-md">
        <section className="modal-header px-6 py-4 flex justify-between items-center relative bg-[#141414]">
          <h1 className="text-[17px] uppercase font-bold pl-1 flex items-center gap-4 text-white">
            Partida #{data.id} 
            <span className="font-semibold text-xs text-emerald-400 border-2 border-emerald-400/50 rounded-lg px-3 py-1 normal-case">{data.extras?.point}x</span>
          </h1>
          <button
            onClick={() => toggle()}
            className="btn p-0 btn-sm hover:bg-slate-900 bg-opacity25 input focus:outline-none focus:shadow-none input-sm0 hover:text-white btn-ghost "
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </section>

        <div className="w-full text-sm bg-[#1b1b1b] p-8">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <ServerIcon className="w-8 h-8 pt-1 text-[#6c73a8]" />
                <div>
                  <p className="text-base font-semibold text-white">Server Seed</p>
                  <p className="text-xs text-white/60 -mt-0.5">Gerado por Provably Fair</p>
                </div>

              </div>

              <div className="w-full rounded-lg">
                <input
                  type="text"
                  value={data.seed}
                  className="w-full rounded-md border-0 bg-black/30 text-white/50 input input-sm text-[13px] p-5 focus:shadow-none focus:outline-0 cursor-text"
                  readOnly
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <ShieldCheckIcon className="w-8 h-8 pt-1 text-[#6c73a8]" />
                <div>
                  <p className="text-base font-semibold text-white">Hash SHA512 combinada</p>
                  <p className="text-xs text-white/60 -mt-[1px]">A seed acima mencionada é convertidas em hash SHA512. Este é o resultado deste jogo</p>
                </div>
              </div>

              <div className="w-full rounded-lg">
                <input
                  type="text"
                  value={data.extras?.hash}
                  className="w-full rounded-md border-0 bg-black/30 text-white/50 input input-sm text-[13px] p-5 focus:shadow-none focus:outline-0 cursor-text"
                  readOnly
                />
              </div>
            </div>

            <div className="flex fake-box justify-between bg-black/[15%] p-4">
              <div className="flex flex-col gap-2">
                <div className="text-center text-gray-300/90 text-xs">HEX</div>

                <div className="w-full">
                  <input
                    type="text"
                    value={data.extras?.slice}
                    className="w-full rounded-md border-0 text-center bg-black/30 text-white/50 input input-sm text-[13px] focus:shadow-none focus:outline-0 cursor-text"
                    readOnly
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="text-center text-xs text-gray-300/90">
                  DEC
                </div>

                <div className="w-full">
                  <input
                    type="text"
                    value={data.extras?.decimal}
                    className="w-full rounded-md border-0 text-center bg-black/30 text-white/50 input input-sm text-[13px] focus:shadow-none focus:outline-0 cursor-text"
                    readOnly
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="text-center text-xs text-gray-300/90">
                  Resultado
                </div>

                <div className="w-full">
                  <input
                    type="text"
                    value={data.extras?.point}
                    className="w-full rounded-md border-0 text-center bg-black/30 text-white/50 input input-sm text-[13px] focus:shadow-none focus:outline-0 cursor-text"
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
