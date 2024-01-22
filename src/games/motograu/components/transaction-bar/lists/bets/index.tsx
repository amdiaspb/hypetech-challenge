import React, { useEffect, useState } from 'react'
import ListItem from './list-item'

export enum TransactionStatus {
  PENDING = 'pending',
  PROCESSED = 'processed',
  CANCELED = 'canceled',
}

export type Transaction = {
  player: {
    username: string
  }
  amount: number
  cashed_out_at?: number
  status: TransactionStatus
  outcome: string
  payout: number
  profit: number
}

type Props = {
  items: Transaction[]
}

export default function BetList({ items, previewMode }: Props) {
  const list = previewMode ? previewList : items;
  useEffect(() => {
    const interval = setInterval(()=> shuffle(previewList), 10000);
    return function cleanup() {
      clearInterval(interval);
    }
  }, []);
  /* const names = previewList.reduce((a, i) => { a.push(i.player.username); return a; }, []);
  console.log(names); */
  
  return (
    <div className="relative">
      {list.map((item, idx) => (
        <ListItem key={idx} data={item} />
      ))}
    </div>
  )
}

const previewList = [
  {
      "amount": 12,
      "index": "left",
      "payout": 3.85,
      "profit": 34.2,
      "player": {
          "username": "Ígor Macedo"
      },
      "extras": {
          "exit_value": 3.85
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 300,
      "index": "left",
      "payout": 2.15,
      "profit": 345,
      "player": {
          "username": "Maria Alice Braga"
      },
      "extras": {
          "exit_value": 2.15
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 50.04,
      "index": "left",
      "payout": 3.81,
      "profit": 140.61,
      "player": {
          "username": "Maria Júlia Nogueira"
      },
      "extras": {
          "exit_value": 3.81
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 15.57,
      "index": "left",
      "payout": 5.44,
      "profit": 69.13,
      "player": {
          "username": "Eduarda Macedo"
      },
      "extras": {
          "exit_value": 5.44
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 4,
      "index": "left",
      "payout": 0,
      "profit": 0,
      "player": {
          "username": "Paulo Martins"
      },
      "extras": {
          "exit_value": 44.59
      },
      "outcome": ""
  },
  {
      "amount": 50,
      "index": "left",
      "payout": 3.33,
      "profit": 116.5,
      "player": {
          "username": "Bernardo Barros"
      },
      "extras": {
          "exit_value": 3.33
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 300,
      "index": "left",
      "payout": 2.85,
      "profit": 555,
      "player": {
          "username": "Fabiano Nogueira"
      },
      "extras": {
          "exit_value": 2.85
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 19.93,
      "index": "left",
      "payout": 5.18,
      "profit": 83.31,
      "player": {
          "username": "Bryan Franco"
      },
      "extras": {
          "exit_value": 5.18
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 45.59,
      "index": "left",
      "payout": 1.82,
      "profit": 37.38,
      "player": {
          "username": "Yango Albuquerque"
      },
      "extras": {
          "exit_value": 1.82
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 10,
      "index": "left",
      "payout": 3.16,
      "profit": 21.6,
      "player": {
          "username": "Lorena Souza"
      },
      "extras": {
          "exit_value": 3.16
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 49,
      "index": "left",
      "payout": 3.13,
      "profit": 104.37,
      "player": {
          "username": "Raul Moreira"
      },
      "extras": {
          "exit_value": 3.13
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 2.45,
      "index": "left",
      "payout": 32.35,
      "profit": 76.81,
      "player": {
          "username": "Cecília Moraes"
      },
      "extras": {
          "exit_value": 32.35
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 300,
      "index": "left",
      "payout": 2.85,
      "profit": 555,
      "player": {
          "username": "Breno Oliveira"
      },
      "extras": {
          "exit_value": 2.85
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 300,
      "index": "left",
      "payout": 2.68,
      "profit": 504,
      "player": {
          "username": "Hugo Santos"
      },
      "extras": {
          "exit_value": 2.68
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 37.89,
      "index": "left",
      "payout": 5.7,
      "profit": 178.08,
      "player": {
          "username": "João Pedro Oliveira"
      },
      "extras": {
          "exit_value": 5.7
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 19,
      "index": "left",
      "payout": 3.51,
      "profit": 47.69,
      "player": {
          "username": "Heloísa Macedo"
      },
      "extras": {
          "exit_value": 3.51
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 35,
      "index": "left",
      "payout": 3.53,
      "profit": 88.55,
      "player": {
          "username": "Gabriel Pereira"
      },
      "extras": {
          "exit_value": 3.53
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 47.81,
      "index": "left",
      "payout": 3.09,
      "profit": 99.92,
      "player": {
          "username": "Guilherme Oliveira"
      },
      "extras": {
          "exit_value": 3.09
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 16.24,
      "index": "left",
      "payout": 4.81,
      "profit": 61.87,
      "player": {
          "username": "Eloá Carvalho"
      },
      "extras": {
          "exit_value": 4.81
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 30.64,
      "index": "left",
      "payout": 1.81,
      "profit": 24.82,
      "player": {
          "username": "Lavínia Costa"
      },
      "extras": {
          "exit_value": 1.81
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 44,
      "index": "left",
      "payout": 3.45,
      "profit": 107.8,
      "player": {
          "username": "Heitor Souza"
      },
      "extras": {
          "exit_value": 3.45
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 24,
      "index": "left",
      "payout": 5.48,
      "profit": 107.52,
      "player": {
          "username": "Dalila Barros"
      },
      "extras": {
          "exit_value": 5.48
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 19.37,
      "index": "left",
      "payout": 5.77,
      "profit": 92.39,
      "player": {
          "username": "Nicolas Costa"
      },
      "extras": {
          "exit_value": 5.77
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 20,
      "index": "left",
      "payout": 4.42,
      "profit": 68.4,
      "player": {
          "username": "Célia Saraiva"
      },
      "extras": {
          "exit_value": 4.42
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 300,
      "index": "left",
      "payout": 2.11,
      "profit": 333,
      "player": {
          "username": "Sophia Xavier"
      },
      "extras": {
          "exit_value": 2.11
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 100,
      "index": "left",
      "payout": 2.56,
      "profit": 156,
      "player": {
          "username": "Morgana Martins"
      },
      "extras": {
          "exit_value": 2.56
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 14,
      "index": "left",
      "payout": 1.57,
      "profit": 7.98,
      "player": {
          "username": "Heitor Barros"
      },
      "extras": {
          "exit_value": 1.57
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 2,
      "index": "left",
      "payout": 0,
      "profit": 0,
      "player": {
          "username": "Júlio César Carvalho"
      },
      "extras": {
          "exit_value": 62.62
      },
      "outcome": ""
  },
  {
      "amount": 100,
      "index": "left",
      "payout": 1.61,
      "profit": 61,
      "player": {
          "username": "Fabrício Martins"
      },
      "extras": {
          "exit_value": 1.61
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 200,
      "index": "left",
      "payout": 1.72,
      "profit": 144,
      "player": {
          "username": "Marcela Santos"
      },
      "extras": {
          "exit_value": 1.72
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 100,
      "index": "left",
      "payout": 1.84,
      "profit": 84,
      "player": {
          "username": "Arthur Melo"
      },
      "extras": {
          "exit_value": 1.84
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 2,
      "index": "left",
      "payout": 0,
      "profit": 0,
      "player": {
          "username": "Miguel Nogueira"
      },
      "extras": {
          "exit_value": 53.02
      },
      "outcome": ""
  },
  {
      "amount": 1,
      "index": "left",
      "payout": 0,
      "profit": 0,
      "player": {
          "username": "Leonardo Reis"
      },
      "extras": {
          "exit_value": 69.05
      },
      "outcome": ""
  },
  {
      "amount": 5,
      "index": "left",
      "payout": 0,
      "profit": 0,
      "player": {
          "username": "Caio Braga"
      },
      "extras": {
          "exit_value": 81.1
      },
      "outcome": ""
  },
  {
      "amount": 200,
      "index": "left",
      "payout": 1.37,
      "profit": 74,
      "player": {
          "username": "Gúbio Nogueira"
      },
      "extras": {
          "exit_value": 1.37
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 52,
      "index": "left",
      "payout": 1.27,
      "profit": 14.04,
      "player": {
          "username": "Deneval Silva"
      },
      "extras": {
          "exit_value": 1.27
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 44,
      "index": "left",
      "payout": 5.01,
      "profit": 176.44,
      "player": {
          "username": "Davi Souza"
      },
      "extras": {
          "exit_value": 5.01
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 200,
      "index": "left",
      "payout": 1.85,
      "profit": 170,
      "player": {
          "username": "João Lucas Albuquerque"
      },
      "extras": {
          "exit_value": 1.85
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 200,
      "index": "left",
      "payout": 1.64,
      "profit": 128,
      "player": {
          "username": "Ofélia Saraiva"
      },
      "extras": {
          "exit_value": 1.64
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 200,
      "index": "left",
      "payout": 1.7,
      "profit": 140,
      "player": {
          "username": "Gael Braga"
      },
      "extras": {
          "exit_value": 1.7
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 24.07,
      "index": "left",
      "payout": 4.61,
      "profit": 86.89,
      "player": {
          "username": "Isabel Melo"
      },
      "extras": {
          "exit_value": 4.61
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 100,
      "index": "left",
      "payout": 2.79,
      "profit": 179,
      "player": {
          "username": "Calebe Xavier"
      },
      "extras": {
          "exit_value": 2.79
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 23,
      "index": "left",
      "payout": 1.15,
      "profit": 3.45,
      "player": {
          "username": "Helena Reis"
      },
      "extras": {
          "exit_value": 1.15
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 4.21,
      "index": "left",
      "payout": 32.79,
      "profit": 133.84,
      "player": {
          "username": "Salvador Braga"
      },
      "extras": {
          "exit_value": 32.79
      },
      "status": "settled",
      "outcome": "win"
  },
  {
      "amount": 300,
      "index": "left",
      "payout": 1.97,
      "profit": 291,
      "player": {
          "username": "Gabriel Albuquerque"
      },
      "extras": {
          "exit_value": 1.97
      },
      "status": "settled",
      "outcome": "win"
  }
]

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
