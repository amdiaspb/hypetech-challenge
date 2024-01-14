export default function Transaction({
  amount,
  cashed_out_at,
  index,
}) {
  return (
    <div className="rounded-lg -translate-y-1/2 saturate-150">

      <section className={'bg-emerald-600 rounded-lg text-gray-200 shadow-[0_0_10px_5px_rgb(0,0,0,0.1)] shadow-emerald-800/50'} role="alert">

        <div className="flex gap-3 items-center px-4 py-3">

          <div className={'flex flex-col items-center text-center px-2.5 py-1.5 bg-emerald-800/80 rounded-lg'}>
            <div className="text-lg text-white font-semibold [text-shadow:2px_2px_2px_rgb(0_0_0_/_20%)]">
              {parseFloat(cashed_out_at).toFixed(2)}<span className="font-medium text-emerald-100 ml-0.5">x</span>
            </div>
          </div>

          <div className="flex flex-col text-center items-center">
            <div className="text-xs -mb-1 text-white/95 [text-shadow:1px_1px_2px_rgb(0_0_0_/_70%)]">Você ganhou</div>
            <div className="text-white text-[22px] font-semibold [text-shadow:2px_2px_2px_rgb(0_0_0_/_50%)]">
              R$ {parseFloat(amount * cashed_out_at).toFixed(2)}
            </div>
          </div>

        </div>

      </section>
    </div>
  )
}
