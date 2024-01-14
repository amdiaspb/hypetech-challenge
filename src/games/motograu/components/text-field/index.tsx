import React from 'react'

type Props = {
  id: string
  name: string
  label: string
  disabled: boolean
  value: any
  setValue: Function
}

export default function TextField({
  id,
  name,
  label,
  disabled = false,
  value,
  setValue,
}: Props) {
  return (
    <div className="relative w-full h-full">
      <input
        type="text"
        name={name}
        value={value}
        disabled={disabled}
        onChange={(e) => setValue(e.target.value)}
        id={id}
        autoComplete="off"
        className={`h-full font-semibold bg-[#0e0e0e] input input-sm focus:outline-none rounded w-full border-0 border-gray-300 appearance-none disabled:bg-[#0e0e0e] dark:border-gray-600 focus:ring-0 peer ${
          label === 'Valor'
            ? 'p-0 px-3 pt-4 text-[33px] text-white'
            : 'px-2 pb-1.5 pt-5 text-xs text-gray-400'
        }`}
        placeholder=" "
      />
        <label htmlFor={id}
          className={`absolute text-xs whitespace-nowrap capitalize text-gray-500 dark:text-gray-400
           duration-300 transform -translate-y-3 scale-75 font-bold z-9 origin-[0] 
           peer-focus:text-gray-400 peer-focus:dark:text-gray-100 peer-placeholder-shown:scale-100
           peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3
           ${label === 'Valor' ? 'top-[19px] lg:top-[22px] left-3' : 'top-4 left-2'}
          `}
        >
        {label}
      </label>
    </div>
  )
}
