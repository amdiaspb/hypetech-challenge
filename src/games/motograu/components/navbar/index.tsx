import React, { useState, useEffect, useRef, useContext } from 'react'
import { CrashGameContext } from '@/core/providers/games/crash-game.provider'
import {
  QuestionMarkCircleIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline'
import { FaRocketchat, FaBars } from "react-icons/fa6";
import { getGameLogo, getHowToPlay } from '@/core/helpers'
import GameLimitsModal from '../provably-fair/game-limits'
import { Chat } from '../chat'

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
}: Props) {
  const HowToPlay = getHowToPlay(game)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showChat, setShowChat] = useState(false)
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
    <div className="">
      <div className="navbar pb-0 mx-auto my-auto sm:px-3 h-12 flex items-center w-full justify-end">
        <h1 className="p-2 lg:hidden">{getGameLogo(game)}</h1>

        <div className="flex items-center ml-auto gap-2">
          <button
            onClick={() => {
              setShowModal(!showModal)
              soundClick()
            }}
            //className="py-1 pl-3 pr-4 flex items-center text-yellow-950 bg-yellow-400 shadow-[0_0_8px_1px_rgb(0,0,0,0.1)] shadow-yellow-400/30 hover:shadow-yellow-300/60 hover:bg-yellow-300/95 border-0 gap-2 rounded-md capitalize text-sm font-medium"
            className="py-1 p-2 lg:pl-3 lg:pr-4 flex items-center text-yellow-950 bg-yellow-400 hover:bg-yellow-300/95 gap-2 rounded-md text-sm font-medium transition" // border-yellow-800/80 hover:border-yellow-600/50 border-2
          >
            <QuestionMarkCircleIcon className="h-6 w-6" strokeWidth={2} />
            <span className="hidden sm:inline">Como Jogar?</span>
          </button>

          <div className="flex items-center gap-2 mx-2 px-2 py-1.5 rounded-lg border-2 border-stone-800 bg-stone-900/50 text-[15px] text-center font-semibold">
            <small className='px-1.5 py-0.5 rounded bg-green-400/20 text-green-400'>BRL</small>
            <span className="text-white">{formatter.format(+balance)}</span>
          </div>

          <button className="px-2 group"
            onClick={() => {
              setShowChat(!showChat)
              soundClick()
            }}
          >
            <FaRocketchat className={`w-6 h-6 ${showChat ? 'fill-stone-400' : 'fill-stone-500/80'} group-hover:fill-stone-300`}/>
          </button>

          <div className="dropdown dropdown-end mt-2" ref={dropdownRef}>
            <button onClick={toggleDropdown} className="px-1 group">
              <Bars3Icon className={`w-8 h-8 ${isDropdownOpen ? 'stroke-stone-400' : 'stroke-stone-500/80'} group-hover:stroke-stone-300`} />
            </button>

            {isDropdownOpen && (
              <div className="mt-2 menu menu-compact p-4 space-y-3 bg-[#161616] border-2 border-stone-800 rounded-lg w-[280px] max-w-[300px] absolute top-10 right-1 z-10 shadow-md">
                <div className="flex gap-4">
                  <img
                    src="https://api.multiavatar.com/NOME.svg"
                    className="h-12 invert rounded-lg"
                  />
                  <div className="mt-1">
                    <p className="font-bold text-xs text-white">
                      {/* Nome do Jogador */}
                      {playerName}
                    </p>
                    <p className="text-xs flex mt-1">
                      <span className="block mt-1 mr-2 rounded-full bg-green-600 h-2 w-2"></span>{' '}
                      <span className="opacity-50">Online agora</span>
                    </p>
                  </div>
                </div>

                <div className="text-xs item">
                  <div className="form-control">
                    <label className="label hover:font-bold cursor-pointer p-0">
                      <span className="label-text text-xs opacity-90">
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

                <div className="text-xs item">
                  <div className="form-control">
                    <label className="label hover:font-bold cursor-pointer p-0">
                      <span className="label-text text-xs opacity-90">
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
                {/*     {<div className="px-2 text-xs item">
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text text-xs opacity-90">Animação</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          onChange={handleAnimationEnabled}
                          checked={animationEnabled}
                          className="sr-only peer"
                        />
                      <div className="w-8 h-4 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-transparent rounded-full peer bg-black peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0px] after:left-[0px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </label>
                </div>
              </div>} */}

                <div
                  className="cursor-pointer hover:font-bold text-xs item"
                  onClick={() => {
                    setShowGameLimitsModal(!showGameLimitsModal)
                    soundClick()
                  }}
                >
                  <label className="cursor-pointer text-white text-xs opacity-75">
                    Limites de Jogo
                  </label>
                </div>

                <a
                  className="cursor-pointer hover:font-bold text-xs item"
                  href=""
                >
                  <label className="cursor-pointer text-white text-xs opacity-75">
                    Suporte ao jogador Hypetech
                  </label>
                </a>
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

      <Chat show={showChat} />

    </div>
  )
}
