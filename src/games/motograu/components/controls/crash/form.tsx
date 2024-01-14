import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Tabs from '@/games/motograu/components/tabs'
import If from '@/core/components/conditions/if'
import TextField from '@/games/motograu/components/text-field'
import { GameStatus } from '@/core/providers/enums/game-status'

import {
  formatCurrencyToNumber,
  formatOdd,
  formatBRLCurrency,
} from '@/core/helpers/format-currency'
import { CrashGameContext } from '@/core/providers/games/crash-game.provider'
import { TransactionStatus } from '@/core/providers/enums/transaction'
import { TransactionMode } from '@/core/providers/enums/transaction'
import { MAX_AMOUNT, MIN_AMOUNT } from '@/core/constants'

import { MdAutorenew } from "react-icons/md";
import { FaArrowPointer } from "react-icons/fa6";

type Props = {
  secondEnabled?: boolean
  toggleSecond?: Function
  hideSelf?: Function
  color?: string
  position: string
}

const getBackgroundColor = (color: string) => {
  switch (color) {
    case 'blue':
      return 'bg-blue-600 hover:bg-blue-700'
    case 'lime':
      return 'bg-[#28a909] hover:bg-[#28a909] border-[#b2f2a3]'
    case 'amber':
      return 'bg-amber-600 hover:bg-amber-700'
    case 'yellow':
      return 'bg-yellow-400 hover:bg-yellow-500'
    case 'red':
      return 'bg-red-700 hover:bg-red-800'
    case 'redDark':
      return 'bg-red-800 hover:bg-red-800'
    case 'pink':
      return 'bg-pink-700 hover:bg-pink-800'
    case 'rose':
      return 'bg-rose-700 hover:bg-rose-800'
    case 'custom-freestyle-v2':
      return 'custom-button-freestyle-v2'
    case 'purple':
      return 'bg-purple-600 hover:bg-purple-700'
    case 'blue2':
      return 'bg-blue-800 hover:bg-blue-700'
  }
}

export default function CrashForm({
  toggleSecond,
  secondEnabled,
  hideSelf,
  color = 'lime',
  position,
}: Props) {
  if (color === 'custom-freestyle-v2') {
    // Set hideSelf to true and secondEnabled to false when color is blue
    if (hideSelf) hideSelf()
    if (toggleSecond) toggleSecond()
  }

  const backgroundColor = getBackgroundColor(color)
  const formRef = useRef<any>(null)

  const {
    gameStatus,
    multiplier,
    registerTransaction,
    cancelTransaction,
    transactions,
    setTransactions,
    cashOut,
  } = useContext<any>(CrashGameContext)

  const transaction = transactions[position]

  useEffect(() => {
    updateAmount(formatBRLCurrency(1.0))
    updateExitValue(formatBRLCurrency(100.0))
  }, [])

  function submitTransaction(e) {
    e.preventDefault()
    registerTransaction(position)
  }

  function cancelFuterTransaction() {
    transaction.status = TransactionStatus.UNREGISTERED
    setTransactions({ ...transactions, [position]: transaction })
  }

  const updateMode = (value: string) => {
    transaction.mode = value
    setTransactions({ ...transactions, [position]: transaction })
  }

  const updateAmount = (value: string) => {
    let newAmount = formatCurrencyToNumber(value)

    if (newAmount < MIN_AMOUNT) newAmount = MIN_AMOUNT
    else if (newAmount > MAX_AMOUNT) newAmount = MAX_AMOUNT

    transaction.amount = formatOdd(newAmount)
    setTransactions({ ...transactions, [position]: transaction })
  }

  const updateExitValue = (value: string) => {
    const multiplier = formatCurrencyToNumber(value)

    transaction.exitValue = formatOdd(multiplier)
    // Verifica se o novo valor é menor que 1.5, se for, define como 1.5 - NUNCA pode ser menor que 1.5 pois reflete em um grande problema
    if (multiplier < 1.5) {
      transaction.exitValue = formatOdd(1.5)
    } else {
      transaction.exitValue = formatOdd(multiplier)
    }
    setTransactions({ ...transactions, [position]: transaction })
  }

  const updateRoundCount = (value) => {
    let parsed = parseInt(value)

    if (isNaN(parsed)) parsed = 0
    else if (parsed < 0) parsed = 0
    else if (parsed > 100) parsed = 100

    transaction.roundCount = parsed
    setTransactions({ ...transactions, [position]: transaction })
  }

  const doubleAmount = () => {
    const realAmount = transaction.amount
    updateAmount(formatBRLCurrency(realAmount * 2))
  }

  const divideAmount = () => {
    const realAmount = transaction.amount
    updateAmount(formatBRLCurrency(realAmount / 2))
  }

  const tabs = [
    { key: TransactionMode.COMMON, title: 'Normal', icon: () => <FaArrowPointer className='w-4 h-4'/> },
    { key: TransactionMode.AUTO, title: 'Auto', icon: () => <MdAutorenew className='w-5 h-5'/> },
  ]

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2
  });

  return (
    <div className="bg-[#161616] border-2 border-stone-800 w-full md:w-1/2 flex rounded-md p-3 md:p-5 relative">
      <If condition={toggleSecond && !secondEnabled}>
        <button
          onClick={toggleSecond}
          className={`btn border-none bg-stone-800 btn-xs btn-circle absolute rounded-tr-lg right-0 top-0 z-10`}
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </If>

      <If condition={hideSelf}>
        <button
          onClick={() => hideSelf()}
          className={`btn border-none bg-stone-800 btn-xs btn-circle absolute rounded-tr-lg right-0 top-0 z-10`}
        >
          <MinusIcon className="h-4 w-4" />
        </button>
      </If>

      <form
        ref={formRef}
        method="POST"
        className="w-full mx-auto justify-center"
        onSubmit={(e) => submitTransaction(e)}
      >
        {/* <input type="hidden" name="teste" /> */}

        <div className="w-full flex justify-center mb-2 md:hidden">
          <div className="w-full">
            <Tabs
              tabs={tabs}
              size="w-1/2"
              active={transaction.mode}
              toggle={updateMode}
              variant={'gray'}
            />
          </div>
        </div>

        <section className="flex mx-auto gap-3 md:gap-5">

          <div className="flex flex-col w-1/2 lg:w-[60%]">

            <div className="w-full md:flex justify-center mb-2 hidden">
              <div className="w-full">
                <Tabs
                  tabs={tabs}
                  size="w-1/2"
                  active={transaction.mode}
                  toggle={updateMode}
                  variant={'gray'}
                />
              </div>
            </div>

            <div className='flex gap-2 flex-wrap lg:flex-nowrap'>
              <div className="w-full lg:w-1/2">
                <TextField
                  id="valueInput"
                  name="amount"
                  disabled={
                    transaction.status !=
                    TransactionStatus.UNREGISTERED
                  }
                  value={transaction.amount}
                  setValue={updateAmount}
                  label="Valor"
                />
              </div>

              <div className="flex flex-col gap-2 w-full lg:w-1/2">

                <div className="flex gap-2 h-1/2">
                  <button
                    onClick={divideAmount}
                    type="button"
                    disabled={
                      transaction.status !=
                      TransactionStatus.UNREGISTERED
                    }
                    className="w-full h-full rounded text-xl font-medium disabled:cursor-not-allowed disabled:text-white/20 bg-[#121212] border-2 border-stone-800/60"
                  >
                    &frac12;
                  </button>
                  <button
                    onClick={doubleAmount}
                    type="button"
                    disabled={
                      transaction.status !=
                      TransactionStatus.UNREGISTERED
                    }
                    className="w-full h-full rounded font-medium disabled:cursor-not-allowed disabled:text-white/20 bg-[#121212] border-2 border-stone-800/60"
                  >
                    2x
                  </button>
                </div>

                <div className="flex gap-2 h-1/2">
                  <TextField
                    id="valueInput"
                    name="amount"
                    disabled={
                      transaction.status != TransactionStatus.UNREGISTERED
                    }
                    value={transaction.exitValue}
                    setValue={updateExitValue}
                    label="Auto Retirar"
                  />

                  <If condition={transaction.mode == TransactionMode.AUTO}>
                    <TextField
                      id="valueInput"
                      name="amount"
                      disabled={
                        transaction.status !=
                        TransactionStatus.UNREGISTERED
                      }
                      value={transaction.roundCount}
                      setValue={updateRoundCount}
                      label="Quantidade"
                    />
                  </If>
                </div>
              </div>
            </div>
            
          </div>

          <div className="w-1/2 lg:w-[40%]">
            <If
              condition={
                transaction == null ||
                transaction?.status == TransactionStatus.UNREGISTERED
              }
            >
              <button
                className={`relative flex flex-col h-full w-full justify-center items-center rounded-xl font-medium
                text-white saturate-200 [text-shadow:2px_2px_2px_rgb(0_0_0_/_40%)] transition hover:saturate-[300%]
                bg-gradient-to-b from-emerald-600 to-emerald-800 border-2 border-emerald-700 uppercase
              `}
            >
              <span>
                {transaction.mode == TransactionMode.COMMON ? 'Apostar' : 'Aposta Auto'}
              </span>
              
              <span className="-mt-1 text-xl">
                {formatter.format(transaction.amount)}
                <small className='text-emerald-300'> BRL</small>
              </span>
              </button>
            </If>

            <If
              condition={
                gameStatus != GameStatus.RUNNING &&
                transaction?.status == TransactionStatus.REGISTERED
              }
            >
              <button
                className={`relative flex flex-col h-full w-full justify-center items-center rounded-xl font-medium
                  text-white saturate-100 [text-shadow:2px_2px_2px_rgb(0_0_0_/_40%)] transition hover:saturate-[125%]
                  bg-gradient-to-b from-red-600 to-red-800 border-2 border-red-700 uppercase
                `}
                onClick={() => cancelTransaction(position)}
              >
                <If condition={transaction.autoStarted}>
                  <span>Cancelar ({transaction.roundCount + 1})</span>
                </If>

                <If condition={!transaction.autoStarted}>
                  <span>Cancelar</span>
                </If>

                <span className="-mt-1 text-xl font-semibold">
                  {formatter.format(transaction.amount)}
                  <small className='text-red-300'> BRL</small>
                </span>
              </button>
            </If>

            <If
              condition={
                gameStatus != GameStatus.IDLE &&
                transaction?.status == TransactionStatus.PENDING
              }
            >
              <div className="flex flex-col w-full h-full">
                <button
                  className={`relative flex flex-col h-full w-full justify-center items-center rounded-xl font-medium
                    text-white saturate-100 [text-shadow:2px_2px_2px_rgb(0_0_0_/_40%)] transition hover:saturate-[125%]
                    bg-gradient-to-b from-red-600 to-red-800 border-2 border-red-700 uppercase
                  `}
                  onClick={cancelFuterTransaction}
                >
                  <If condition={transaction.autoStarted}>
                    <span>Cancelar ({transaction.roundCount})</span>
                  </If>

                  <If condition={!transaction.autoStarted}>
                    <span className="-mt-1 text-xl">Cancelar</span>
                  </If>
                </button>
              </div>
            </If>

            <If
              condition={
                gameStatus == GameStatus.RUNNING &&
                transaction?.status == TransactionStatus.REGISTERED
              }
            >
              <button
                className={`relative flex flex-col h-full w-full justify-center items-center rounded-xl font-medium
                  text-white saturate-100 [text-shadow:2px_2px_2px_rgb(0_0_0_/_40%)] transition hover:saturate-[125%]
                  bg-gradient-to-b from-amber-500 to-amber-700 border-2 border-amber-600 uppercase
                  shadow-[0_0_5px_2px_rgb(0,0,0,0.1)] shadow-amber-500/40 
                `}
                onClick={() => cashOut(position)}
              >
                <If condition={transaction.autoStarted}>
                  <span>Retirar ({transaction.roundCount + 1})</span>
                </If>

                <If condition={!transaction.autoStarted}>
                  <span>Retirar</span>
                </If>
                <span className="-mt-1 text-xl">
                  {formatter.format(transaction.amount * multiplier)}
                  <small className='text-amber-300'> BRL</small>
                </span>
              </button>
            </If>
          </div>
        </section>
      </form>
    </div>
  )
}
