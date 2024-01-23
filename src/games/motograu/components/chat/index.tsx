import React, { useContext, useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import { faker } from '@faker-js/faker';
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

export const Chat = ({ show, previewMode }: Props) => {
  const { messages, sendMessage, session } = useContext(CrashGameContext)
  const [showEmojiPicker, setShowEmojiPicker] = useState(null)
  const [message, setMessage] = useState<string>('')
  const currMessages = previewMode ? previewMessages : messages;

  const divRef = useRef(null);
  const [users, setUsers] = useState({});
  const [usersRank, setUsersRank] = useState({});
  const colors = ['text-blue-400', 'text-red-400', 'text-red-400', 'text-yellow-400', 'text-orange-400', 'text-amber-400', 'text-lime-400', 'text-emerald-400', 'text-cyan-400', 'text-sky-400', 'text-indigo-400', 'text-violet-400', 'text-purple-400', 'text-fuchsia-400', 'text-pink-400', 'text-rose-400'];
  const rankColors = ['text-orange-300', 'text-gray-300', 'text-yellow-300', 'text-teal-300'];

  useEffect(() => {
    setUsers(currMessages.reduce((o, i) => { if (!o[i.userId]) o[i.userId] = colors[(Math.floor(Math.random() * colors.length))]; return o; }, users));
    setUsersRank(currMessages.reduce((o, i) => { if (!o[i.userId]) o[i.userId] = rankColors[(Math.floor(Math.random() * rankColors.length))]; return o; }, usersRank));
    divRef.current.scrollIntoView({ behavior: 'smooth' });
    if (previewMode) {
      if (currMessages.length >= 20) currMessages.splice(0, currMessages.length - 20);
    } 
  }, [currMessages.length]);

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

  useEffect(() => {
    
    const mod = {
      userId: Math.floor(Math.random() * 10000), 
      name: 'Radahn', mod: true, createdAt: dayjs()
    };
    const msg = { ...mod,
      message: "Não é permitido: 💳 dados pessoais 📲 contato 💸 pedir dinheiro 🤬 vocabulário impróprio 💩 flood 🛒 vender ou divulgar produtos 🤖 vender ou divulgar serviços 🕹️ promover plataformas terceiras.",
    };
    previewMessages.push(msg);

    const chatUsers = [mod];
    const names = [
      "Ígor Macedo",
      "Maria Alice Braga",
      "Maria Júlia Nogueira",
      "Eduarda Macedo",
      "Paulo Martins",
      "Bernardo Barros",
      "Fabiano Nogueira",
      "Bryan Franco",
      "Yango Albuquerque",
      "Lorena Souza",
      "Raul Moreira",
      "Cecília Moraes",
      "Breno Oliveira",
      "Hugo Santos",
      "João Pedro Oliveira",
      "Heloísa Macedo",
      "Gabriel Pereira",
      "Guilherme Oliveira",
      "Eloá Carvalho",
      "Lavínia Costa",
      "Heitor Souza",
      "Dalila Barros",
      "Nicolas Costa",
      "Célia Saraiva",
      "Sophia Xavier",
      "Morgana Martins",
      "Heitor Barros",
      "Júlio César Carvalho",
      "Fabrício Martins",
      "Marcela Santos",
      "Arthur Melo",
      "Miguel Nogueira",
      "Leonardo Reis",
      "Caio Braga",
      "Gúbio Nogueira",
      "Deneval Silva",
      "Davi Souza",
      "João Lucas Albuquerque",
      "Ofélia Saraiva",
      "Gael Braga",
      "Isabel Melo",
      "Calebe Xavier",
      "Helena Reis",
      "Salvador Braga",
      "Gabriel Albuquerque"
    ]

    for (let i = 0; i < names.length; i++) {
      const user = {
        userId: Math.floor(Math.random() * 10000), 
        name: names[i], mod: false, createdAt: dayjs()
      };

      const interval = setInterval(() => {
        const message = faker.lorem.lines({ min: 1, max: 5 }); // faker.lorem.text()
        previewMessages.push({...user, message });
      }, Math.max(10000, Math.floor(Math.random() * 500000)));

      chatUsers.push(interval);
    }



    return function cleanup() {
      chatUsers.forEach(i => clearInterval(i));
    }
  }, []);

  return (
    <div className={`
      group z-30 lg:z-20 pointer-events-none fixed left-0 top-16 w-screen h-[calc(100vh-4rem)] bg-[#161616]/90 backdrop-blur
      leading-[18px] text-[13px] font-light text-white border-stone-800 opacity-0 overflow-hidden transition-all duration-500
      lg:left-0 lg:top-0 lg:w-auto lg:h-full lg:relative lg:h-full lg:rounded-lg lg:transition-none lg:bg-[#161616]
      ${show && 'pointer-events-auto opacity-100 p-3 lg:ml-3 lg:border-2'}
    `}>
      <div className={`absolute border-white/20 top-1.5 left-0 right-0 bottom-14 flex flex-col overflow-y-scroll scrollbar-thin group-hover:scrollbar-thumb-stone-600 scrollbar-track-transparent`}>
        
        {currMessages.map((data: IGameMessage, idx: number) => 
          <div key={idx} className='hover:bg-white/[15%] px-4 py-1.5 rounded break-words'>
            <div>
              {/* <span className='text-white/50'>{dayjs(data.createdAt).format('HH:mm')} </span> */}
              <span className={`font-semibold cursor-pointer saturate-150 ${users[data.userId]}`}>
                {data.mod 
                  ? <FaScroll className={'inline mb-0.5 mr-1 w-[18px] h-[18px] rounded text-green-400'}/>
                  : <FaCrown className={`inline mb-0.5 mr-1 w-[18px] h-[18px] saturate-[125%] ${usersRank[data.userId]}`}/>
                }
                {data.name ? data.name : 'Usuário ' + data.userId}:
              </span>
              <span> {data.message}</span>
            </div>
            {dayjs().diff(dayjs(data.createdAt), 'hours') > 24 && <span className='text-white/50 text-xs'>{dateToHumanReadable(data.createdAt)}</span>}
          </div>
        )}

        {/* <div className='hover:bg-white/[15%] px-4 py-1.5 rounded break-words'>
          <div>
            <span className={`font-semibold cursor-pointer saturate-150 text-green-400`}>
              <FaScroll className={'inline mb-0.5 mr-1 w-[18px] h-[18px] rounded text-green-400'}/>
              Radahn:
            </span>
            <span> Não é permitido: 💳 dados pessoais 📲 contato 💸 pedir dinheiro 🤬 vocabulário impróprio 💩 flood 🛒 vender ou divulgar produtos 🤖 vender ou divulgar serviços 🕹️ promover plataformas terceiras.</span>
          </div>
        </div> */}

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

const previewMessages = [];

const previewMessages2 = [
  {
      "userId": 1054,
      "message": "teste",
      "createdAt": "Sat, 20 Jan 2024 05:22:02 GMT"
  },
  {
      "userId": 1054,
      "message": "message message message message message message",
      "createdAt": "Sat, 20 Jan 2024 05:22:25 GMT"
  },
  {
      "userId": 277,
      "message": "chat",
      "createdAt": "Sat, 20 Jan 2024 19:01:12 GMT"
  },
  {
      "userId": 892,
      "message": "teste",
      "createdAt": "Sun, 21 Jan 2024 15:00:33 GMT"
  },
  {
      "userId": 892,
      "message": "oi",
      "createdAt": "Sun, 21 Jan 2024 15:00:40 GMT"
  },
  {
      "userId": 892,
      "message": "ola",
      "createdAt": "Sun, 21 Jan 2024 15:00:42 GMT"
  },
  {
      "userId": 892,
      "message": "ola",
      "createdAt": "Sun, 21 Jan 2024 15:04:23 GMT"
  },
  {
      "userId": 892,
      "message": "como vcs estao",
      "createdAt": "Sun, 21 Jan 2024 15:04:28 GMT"
  },
  {
      "userId": 892,
      "message": "teste",
      "createdAt": "Sun, 21 Jan 2024 15:04:35 GMT"
  },
  {
      "userId": 892,
      "message": "teste",
      "createdAt": "Sun, 21 Jan 2024 15:04:41 GMT"
  },
  {
      "userId": 892,
      "message": "teste",
      "createdAt": "Sun, 21 Jan 2024 15:04:44 GMT"
  },
  {
      "userId": 892,
      "message": "sfdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "createdAt": "Sun, 21 Jan 2024 15:04:53 GMT"
  },
  {
      "userId": 892,
      "message": "teste",
      "createdAt": "Sun, 21 Jan 2024 15:11:55 GMT"
  },
  {
      "userId": 892,
      "message": "testando...",
      "createdAt": "Sun, 21 Jan 2024 17:14:15 GMT"
  },
  {
      "userId": 791,
      "message": "soidfj",
      "createdAt": "Sun, 21 Jan 2024 18:10:13 GMT"
  },
  {
      "userId": 791,
      "message": "aw",
      "createdAt": "Sun, 21 Jan 2024 18:12:14 GMT"
  },
  {
      "userId": 1063,
      "message": "oijsd",
      "createdAt": "Sun, 21 Jan 2024 18:13:28 GMT"
  },
  {
      "userId": 272,
      "message": "oi",
      "createdAt": "Sun, 21 Jan 2024 18:58:34 GMT"
  },
  {
      "userId": 272,
      "message": "none",
      "createdAt": "Sun, 21 Jan 2024 19:00:33 GMT"
  },
  {
      "userId": 272,
      "message": "hello",
      "createdAt": "Sun, 21 Jan 2024 19:04:02 GMT"
  },
  {
      "userId": 272,
      "message": "folks",
      "createdAt": "Sun, 21 Jan 2024 19:04:26 GMT"
  },
  {
      "userId": 272,
      "message": "sdf",
      "createdAt": "Sun, 21 Jan 2024 19:05:01 GMT"
  },
  {
      "userId": 272,
      "message": "fgwerg",
      "createdAt": "Sun, 21 Jan 2024 19:05:12 GMT"
  },
  {
      "userId": 272,
      "message": "yeyah",
      "createdAt": "Sun, 21 Jan 2024 19:06:36 GMT"
  },
  {
      "userId": 272,
      "message": "cojwiwis",
      "createdAt": "Sun, 21 Jan 2024 19:06:45 GMT"
  },
  {
      "userId": 272,
      "message": "asda",
      "createdAt": "Sun, 21 Jan 2024 19:07:13 GMT"
  },
  {
      "userId": 791,
      "message": "asdasdwe",
      "createdAt": "Sun, 21 Jan 2024 19:07:56 GMT"
  },
  {
      "userId": 272,
      "message": "dfg",
      "createdAt": "Sun, 21 Jan 2024 19:10:10 GMT"
  },
  {
      "userId": 272,
      "message": "dfg",
      "createdAt": "Sun, 21 Jan 2024 19:11:04 GMT"
  },
  {
      "userId": 272,
      "message": "w",
      "createdAt": "Sun, 21 Jan 2024 19:14:23 GMT"
  },
  {
      "userId": 272,
      "message": "none",
      "createdAt": "Sun, 21 Jan 2024 19:14:26 GMT"
  },
  {
      "userId": 791,
      "message": "fgh",
      "createdAt": "Sun, 21 Jan 2024 19:14:38 GMT"
  },
  {
      "userId": 272,
      "message": "mptjomg",
      "createdAt": "Sun, 21 Jan 2024 19:14:43 GMT"
  },
  {
      "userId": 272,
      "message": "dfgsdfjgosidjfgosdjfg",
      "createdAt": "Sun, 21 Jan 2024 19:22:07 GMT"
  },
  {
      "userId": 272,
      "message": "simbora",
      "createdAt": "Sun, 21 Jan 2024 19:25:13 GMT"
  },
  {
      "userId": 272,
      "message": "alou",
      "createdAt": "Sun, 21 Jan 2024 21:10:21 GMT"
  },
  {
      "userId": 1065,
      "message": "azaza",
      "createdAt": "Mon, 22 Jan 2024 01:28:22 GMT"
  },
  {
      "userId": 1065,
      "message": "dfdfdfdf",
      "createdAt": "Mon, 22 Jan 2024 01:48:38 GMT"
  }
];
