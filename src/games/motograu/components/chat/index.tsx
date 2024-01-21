import React, { useContext, useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import { FaCrown, FaScroll } from "react-icons/fa";

import EmojiPicker, {
  Theme,
  Categories,
  EmojiClickData,
} from 'emoji-picker-react'
import { FaceSmileIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { CrashGameContext } from '@/core/providers/games/crash-game.provider'
import { IGameMessage } from '../../providers/interfaces/game-message.interface'
import { dateToHumanReadable } from '@/core/helpers/date'

type Props = { show: boolean };

export const Chat = ({ show }: Props) => {
  const { messages, sendMessage, session } = useContext(CrashGameContext)
  const [showEmojiPicker, setShowEmojiPicker] = useState(null)
  const [message, setMessage] = useState<string>('')

  const divRef = useRef(null);
  const [users, setUsers] = useState({});
  const [usersRank, setUsersRank] = useState({});
  const colors = ['text-blue-400', 'text-red-400', 'text-red-400', 'text-yellow-400', 'text-orange-400', 'text-amber-400', 'text-lime-400', 'text-emerald-400', 'text-cyan-400', 'text-sky-400', 'text-indigo-400', 'text-violet-400', 'text-purple-400', 'text-fuchsia-400', 'text-pink-400', 'text-rose-400'];
  const rankColors = ['text-orange-300', 'text-gray-300', 'text-yellow-300', 'text-teal-400'];

  useEffect(() => {
    setUsers(messages.reduce((o, i) => { if (!o[i.userId]) o[i.userId] = colors[(Math.floor(Math.random() * colors.length))]; return o; }, users));
    setUsersRank(messages.reduce((o, i) => { if (!o[i.userId]) o[i.userId] = rankColors[(Math.floor(Math.random() * rankColors.length))]; return o; }, usersRank));
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  function onClick(emojiData: EmojiClickData, event: MouseEvent) {
    event.stopPropagation()
    setMessage(message + ' ' + emojiData.emoji)
  }

  function handleShowEmojiPicker(e: MouseEvent) {
    e.stopPropagation()

    setShowEmojiPicker(!showEmojiPicker)
  }

  const attemptSendMessage = () => {
    const parsed = message.trim();
    setShowEmojiPicker(false);

    if (parsed.length > 0) {
      sendMessage(message);
      setMessage('');
    }
  }

  const handleMessage = (e) => {
    if (e.key && e.key.toUpperCase() == 'ENTER') {
      e.preventDefault();
      attemptSendMessage();
    }
    else setMessage(e.target.value);
  }

  return (
    <div className={`font-chat relative group flex-[0_0_0] rounded-lg leading-[18px] text-[13px] font-light text-white border-stone-800 opacity-0 overflow-hidden transition-allduration-500 ${show && 'opacity-100 p-3 border-2 ml-4 flex-[3_1_0]'}`}>
      <div className={`absolute top-1.5 left-0 right-0 bottom-14 flex flex-col overflow-y-scroll scrollbar-thin group-hover:scrollbar-thumb-stone-600 scrollbar-track-transparent`}>
        
        {messages.map((data: IGameMessage, idx: number) => 
          <div key={idx} className='hover:bg-white/[15%] py-1.5 px-3 rounded break-words'>
            <div>
              {/* <span className='text-white/50'>{dayjs(data.createdAt).format('HH:mm')} </span> */}
              <span className={`font-semibold cursor-pointer saturate-150 ${users[data.userId]}`}>
                <FaCrown className={`inline mb-0.5 mr-1 w-[18px] h-[18px] ${usersRank[data.userId]}`}/>
                Usuário {data.userId}:
              </span>
              <span> {data.message}</span>
            </div>
            {dayjs().diff(dayjs(data.createdAt), 'hours') > 12 && <span className='text-white/50 text-xs'>{dateToHumanReadable(data.createdAt)}</span>}
          </div>
        )}

        <div className='hover:bg-white/[15%] py-1.5 px-3 rounded break-words'>
          <div>
            <span className={`font-semibold cursor-pointer saturate-150 text-green-400`}>
              <FaScroll className={'inline mb-0.5 mr-1 w-[18px] h-[18px] rounded text-green-400'}/>
              Radahn:
            </span>
            <span> Não é permitido: 💳 dados pessoais 📲 contato 💸 pedir dinheiro 🤬 vocabulário impróprio 💩 flood 🛒 vender ou divulgar produtos 🤖 vender ou divulgar serviços 🕹️ promover plataformas terceiras.</span>
          </div>
        </div>

        <div ref={divRef} />
      </div>

      <div className='absolute bottom-3 left-3 right-3 bg-transparent border rounded border-white/20'>
        <textarea 
          className='h-9 w-full -mb-[5px] pr-8 overflow-hidden bg-transparent border-none resize-none focus:ring-0 leading-[18px] text-[13px] font-light placeholder:font-normal placeholder:text-white/60'
          placeholder='Envie uma mensagem'
          onChange={handleMessage}
          onKeyDown={handleMessage}
          value={message}
        />
        <PaperAirplaneIcon 
          className={`w-6 absolute right-2 bottom-1.5 cursor-pointer transition duration-200 ${message ? 'text-white' : 'text-white/50'}`}
          onClick={attemptSendMessage}
        />
      </div>
    </div>
  )
}
