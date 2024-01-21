import React, { useState } from 'react'
import About from '@/games/motograu/components/modal-provably-fair'
import HypeTechLogo from '@/assets/logos/hypetech-logo-only.png'

export default function Footer({}) {
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    /* sm:w-[33%] xl:w-[25%] w-[100%] */
    <div
      className={`flex px-3 py-2 lg:px-4 lg:py-2.5 rounded-b-lg bg-[#101010] border-2 border-t-0 border-stone-800 relative w-full`}
    >

      <div className="flex gap-1 items-center flex-grow leading-none">
        <p className="text-white/50 font-light text-[9px] lg:text-[10px] md:text-[7px]">
          This game is
        </p>

        <button
          onClick={() => setShowModal(!showModal)}
          className="flex gap-1 text-[10px] lg:text-[11px] md:text-[7px] text-white items-center"
        >
          <i className="fi fi-rs-shield-check text-green-500 items-center">
            <img src="../images/icons/SecureLogo.svg" className="h-[18px] lg:h-5 mx-auto"/>
          </i>
          <span className="text-white/80">Provably Fair</span>
        </button>
      </div>

      <div className="flex gap-1 items-center leading-none">
        <p className="text-white/50 font-light text-[9px] lg:text-[10px] md:text-[7px]">
          Powered by
        </p>
        <a className="flex gap-1 items-center text-[11px] lg:text-xs text-white/75"
          href="https://hypetech.games/" target="_blank" rel="noopener noreferrer"
        >
          <img src={HypeTechLogo} alt="" className='h-[18px] lg:h-5' />
          <span className='font-semibold mt-[2px] scale-y-[85%]'>HYPETECH</span>
        </a>
      </div>

      <About show={showModal} toggle={setShowModal} />

    </div>
  )
}
