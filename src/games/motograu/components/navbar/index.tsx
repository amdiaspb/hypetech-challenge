import React, { useState, useEffect, useRef, useContext } from 'react'
import { CrashGameContext } from '@/core/providers/games/crash-game.provider'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { getGameLogo, getHowToPlay } from '@/core/helpers'
import GameLimitsModal from '../provably-fair/game-limits'
import { IoPersonCircleOutline, IoMusicalNotesSharp } from "react-icons/io5";
import { FaRocketchat } from "react-icons/fa6";
import { AiOutlineSound  } from "react-icons/ai";
import { MdOutlineSegment } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { FaCrown } from "react-icons/fa";

type Props = {
  game: string
  balance: string
  name: string
  executeAction: Function
  openChatHandler?: Function
}

export default function Navbar({
  game,
  balance,
  executeAction,
  showChat,
  setShowChat
}: Props) {
  const HowToPlay = getHowToPlay(game)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showGameLimitsModal, setShowGameLimitsModal] =
    useState<boolean>(false)

  const [animationEnabled, setAnimationEnabled] = useState(true)
  const [musicEnabled, setMusicEnabled] = useState(true)
  const [audioContextAllowed, setAudioContextAllowed] = useState(true) //////////////////////////////////////

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const {soundEnabled,
        setSoundEnabled,
        soundClick,
        playerName
        } = useContext(CrashGameContext)

  const handleSoundEnabled = (event) => {
    const { checked } = event.target
    executeAction(checked ? 'soundsOn' : 'soundsOff')
    setSoundEnabled(checked)
  }

  const handleMusicEnabled = (event) => {
    const { checked } = event.target

    executeAction(checked ? 'musicOn' : 'musicOff')
    setMusicEnabled(checked)
  }

  const handleAnimationEnabled = (event) => {
    const { checked } = event.target
    executeAction(checked ? 'animationOff' : 'animationOn')
    setAnimationEnabled(checked)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
    soundClick()
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)

    setTimeout(() => {
      if (window.AudioContext == false) {
        setAudioContextAllowed(false)
      }
    }, 2000)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  const handleOutsideClick = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false)
    }
    setAudioContextAllowed(false)
  }

  const isMobileDevice =
    /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL' 
  });
  
  return (
    <div className="z-40 sticky top-0 w-full bg-[#121212] lg:relative lg:bg-transparent">
      <div className="flex px-2 py-3 w-full justify-end">
        <h1 className="p-2 lg:hidden">{getGameLogo(game)}</h1>

        <div className="flex items-center ml-auto gap-1 lg:gap-2">

          <button
            onClick={() => {
              setShowModal(!showModal)
              soundClick()
            }}
            //className="py-1 pl-3 pr-4 flex items-center text-yellow-950 bg-yellow-400 shadow-[0_0_8px_1px_rgb(0,0,0,0.1)] shadow-yellow-400/30 hover:shadow-yellow-300/60 hover:bg-yellow-300/95 border-0 gap-2 rounded-md capitalize text-sm font-medium"
            className="lg:absolute lg:left-[458px] py-1 lg:px-2 flex items-center text-yellow-300/90 border-yellow-300/20 hover:border-yellow-300/50 lg:border-2 gap-2 rounded-md text-sm font-medium transition" // border-yellow-800/80 hover:border-yellow-600/50 border-2
          >
            <QuestionMarkCircleIcon className="h-6 w-6" strokeWidth={2} />
            <span className="hidden sm:inline">Como Jogar?</span>
          </button>

          <div className='hidden lg:flex flex-col mx-2 gap-1 text-sm tracking-wide'>
            <div className='flex gap-5'>
              <div className='flex gap-1.5 text-teal-300 saturate-[125%]'>
                <FaCrown className='w-[18px] h-[18px]'/>
                <div className='font-semibold'>Platina</div>
              </div>
              <div>Nível 80</div>
            </div>
            <div className='w-full h-1.5 rounded-sm bg-teal-200/20'>
              <div className='w-[20%] h-full rounded-sm bg-teal-300 saturate-[125%]'/>
            </div>
          </div>

          <div className="flex items-center gap-2 mx-2 px-2 py-2 rounded-lg border-2 border-stone-800/80 text-[15px] text-center font-semibold">
            <small className='px-1.5 py-0.5 rounded bg-green-400/20 text-green-400'>BRL</small>
            <span className="text-white">{formatter.format(+balance)}</span>
          </div>

          <button className="px-2 group"
            onClick={() => {
              setShowChat(!showChat)
              soundClick()
            }}
          >
            <FaRocketchat className={`w-[23px] h-[23px] ${showChat ? 'fill-white' : 'fill-white'} group-hover:fill-stone-300`}/>
          </button>

          <div className="dropdown dropdown-end mt-2" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="px-1 group">
              <IoPersonCircleOutline  className={`w-7 h-7 ${isDropdownOpen ? 'text-white' : 'text-white'} group-hover:text-stone-300`} />
            </button>

            {isDropdownOpen && (
              <div className="z-50 mt-2 menu menu-compact p-4 bg-[#161616] border-2 border-stone-800 rounded w-[280px] max-w-[300px] absolute top-[39px] right-1 z-10 shadow-[0px_0px_10px_3px_rgb(0,0,0,0.1)] shadow-black/40">
                <div className="flex gap-4">
                  <img
                    src="https://api.multiavatar.com/NOME.svg"
                    className="h-10 invert rounded-lg"
                  />
                  <div className="mt-1">
                    <p className="font-semibold text-sm text-white">
                      {/* Nome do Jogador */}
                      {playerName}
                    </p>
                    <p className="text-xs flex">
                      <span className="block mt-1 mr-1.5 rounded-full bg-green-600 h-2 w-2"></span>{' '}
                      <span className="text-white/70">Online agora</span>
                    </p>
                  </div>
                </div>

                <div className='w-full h-[1px] bg-white/10 my-4'/>

                <div className='space-y-1.5'>
                  <div className="text-xs item">
                    <div className="form-control">
                      <label className="label hover:font-bold cursor-pointer p-0">
                        <span className="label-text text-white text-[13px] font-light">
                          <AiOutlineSound className='w-5 h-5 inline mr-2'/>
                          Sons
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={soundEnabled}
                            onChange={handleSoundEnabled}
                            className="sr-only peer"
                          />
                          <div className="w-8 h-4 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent rounded-full peer bg-black peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0px] after:left-[0px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </label>
                    </div>
                  </div>
                  <div className="item">
                    <div className="form-control">
                      <label className="label hover:font-bold cursor-pointer p-0">
                        <span className="label-text text-white text-[13px] font-light">
                          <IoMusicalNotesSharp className='w-5 h-5 inline mr-2'/>
                          Música
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={musicEnabled}
                            onChange={handleMusicEnabled}
                            className="sr-only peer"
                          />
                          <div className="w-8 h-4 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent rounded-full peer bg-black peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0px] after:left-[0px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </label>
                    </div>
                  </div>
                </div>

                <div className='w-full h-[1px] bg-white/10 my-4'/>

                <div className='space-y-1.5'>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setShowGameLimitsModal(!showGameLimitsModal)
                      soundClick()
                    }}
                  >
                    <div className="cursor-pointer text-white text-[13px] font-light">
                      <MdOutlineSegment className='w-5 h-5 inline mr-2'/>
                      Limites de Jogo
                    </div>
                  </div>

                  <div className="cursor-pointer">
                    <div className="cursor-pointer text-white text-[13px] font-light">
                      <BiSupport className='w-5 h-5 inline mr-2'/>
                      Suporte ao jogador Hypetech
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      <HowToPlay show={showModal} toggle={setShowModal} />

      <GameLimitsModal
        show={showGameLimitsModal}
        toggle={setShowGameLimitsModal}
      />

    </div>
  )
}
