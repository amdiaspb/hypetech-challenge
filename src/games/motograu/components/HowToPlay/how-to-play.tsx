import Modal from '@/core/components/modal'
import {
  ArrowRightOnRectangleIcon,
  BanknotesIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import React from 'react'

type Props = {
  show: boolean
  toggle: Function
}

export default function HowToPlay({ show, toggle }: Props) {
  return (
    <Modal show={show} toggle={toggle}>
      <div className="py-0">
      <section
          className="modal-header px-6 py-4 flex justify-between items-center relative"
          style={{ position: 'sticky', top: 0, backgroundColor: '#141414', zIndex: 9999 }}
        >
          <h1 className="text-[17px] uppercase font-bold pl-1 flex gap-4 text-white">
            <BanknotesIcon className="opacity-50 w-6 h-6" />
            <span>Regras do Jogo - Moto Grau</span>
          </h1>
          <button
            onClick={(_) => toggle()}
            className="btn p-0 btn-sm hover:bg-transparent hover:text-white btn-ghost "
          >
            <XMarkIcon className="w-6 h-6 opacity-30" />
          </button>
        </section>

      <div className="p-4 lg:px-10 lg:pt-6 lg:pb-9 text-sm ">
        <div className="grid gap-8 align-center py-4">
            <img
              src="../images/logos/hypetech.png"
              className="h-16 mx-auto"
            />

            <div className="bg-black/80 rounded p-4 border-gray-700">
              <p className="text-xs text-white/60">
                A Hypetech é o último grito em entretenimento de jogo
                para uma nova geração de jogadores. Poderá ganhar várias
                vezes essa quantia em apenas alguns segundos! Nossos
                Jogos Turbo baseiam-se em uma forma que pode ser
                verificado no momento e é considerado como a única
                garantia real de funcionamento de justiça na indústria
                do jogo.
              </p>
            </div>
          </div>

          <div className="pt-4">
            <div className="grid lg:grid-cols-3 gap-12 mb-8">

              <div className="bg-black/50 rounded-lg sm:w-[50%] md:w-[40%] lg:w-[100%] lg:h-[200px] h-[230px]">
                <img
                  className="w-full rounded-t-lg lg:h-[75%] md:h-[77%] sm:h-[79%] h-[77%]"
                  src="../images/HTP/motograu/step-1.png"
                />
                <p className=" text-white p-3 text-[10px] leading-[13px] font-medium mx-auto">
                  Digite o valor desejado e clique em APOSTAR
                </p>
              </div>

              <div className="bg-black/50 rounded-lg sm:w-[50%] md:w-[40%] lg:w-[100%] lg:h-[200px] h-[230px]">
                <img
                  className="w-full rounded-t-lg lg:h-[75%] md:h-[77%] sm:h-[79%] h-[77%]"
                  src="../images/HTP/motograu/step-2.png"
                />
                <div className="description-box">
                  <p
                    className="text-white p-3 text-[10px] leading-[13px] font-medium mx-auto"
                  >
                    Veja como o motoqueiro dá o grau e as
                    probabilidades sobem!
                  </p>
                </div>
              </div>

              <div className="bg-black/50 rounded-lg sm:w-[50%] md:w-[40%] lg:w-[100%] lg:h-[200px] h-[230px]">
                <img
                  className="w-full rounded-t-lg lg:h-[75%] md:h-[77%] sm:h-[79%] h-[77%]"
                  src="../images/HTP/motograu/step-3.png"
                />
                <div className="description-box">
                  <p
                    className="text-white py-3 px-2 text-[10px] leading-[13px] font-medium mx-auto"
                  >
                    Retirar antes do motoqueiro perder o equilibrio e
                    ganhar X vezes!
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs font-light">
              No entanto, não se esqueça que tem um limite de tempo.
              Tem de se retirar antes do motoqueiro perder o
              equilibrio, caso contrário perderá a sua aposta. Jogar{' '}
              <b>Moto Grau</b> é puro jogo de azar! É aqui que se
              arrisca e ganha. Tudo depende de si!
            </p>

            <p className="text-white my-6 text-base font-medium">
              Como jogar e quais são as regras?
            </p>

            <ul className='list-disc list-inside space-y-4 mb-10'>
              <li className="text-xs text-white/60">
                Para fazer uma aposta, você precisa selecionar o valor
                desejado e clicar no botão <b>"APOSTAR"</b>.
              </li>
              <li className="text-xs text-white/60">
                Dito isto, não há necessidade de se limitar a apenas uma
                aposta de cada vez. Você pode fazer duas apostas ao
                mesmo tempo usando o painel de apostas esquerdo e
                direito.
              </li>
              <li className="text-xs text-white/60">
                Para retirar os seus ganhos, precisa de clicar no botão
                <b>"RETIRAR"</b>. Os seus ganhos consistem no total da
                sua aposta multiplicado pelo multiplicador de cashout.
              </li>
              <li className="text-xs text-white/60">
                Se não se retirar antes do motoqueiro perder o
                equilibrio, a aposta é perdida.
              </li>
            </ul>

            <p className="text-white my-6 text-base font-medium">
              Aposta automática e retirada automática
            </p>

            <ul className='list-disc list-inside space-y-4 mb-14'>
              <li className="text-xs text-white/60">
                A aposta automática pode ser ativada no painel de
                qualquer aposta ao clicar na aba <b>Auto</b> em cima do
                botão "Apostar". Nesse caso, as apostas são feitas
                automaticamente. No entanto, para retirar os ganhos,
                você ainda precisa pressionar o botão "Retirar" a cada
                rodada.
              </li>
              <li className="text-xs text-white/60">
                Se você deseja automatizar completamente o jogo, é
                possível configurar a retirada automática de ganhos.
                Para fazer isso, você deve definir no painel de apostas
                o valor de "Auto Retirar" e quantas vezes deseja repetir
                esta jogada no campo "Quantidade", e então, iniciar o
                jogo automático clicando em <b>"APOSTA AUTO"</b>.
              </li>
            </ul>
            
            <div className='relative flex justify-center w-full border-b-2 border-white/10 mb-12 -mt-6'>
              <p className="w-fit px-4 text-base font-medium text-white -mb-3 bg-[#1b1b1b]">
              A nossa interface de jogo
              </p>
            </div>

            <p className="text-white my-6 text-base font-medium">
              Apostas ao vivo e Estatísticas
            </p>

            <ul className='list-disc list-inside space-y-4 mb-10'>
              <li className="text-xs text-white/60">
                À esquerda (sob o quadro de apostas na interface móvel)
                existe o painel "Apostas ao vivo". Mostra as apostas que
                foram feitas na rodada atual.
              </li>
              <li className="text-xs text-white/60">
                O painel <b>"Histórico"</b> contém informações sobre as
                apostas feitas e os levantamentos durante todo o tempo
                do jogo.
              </li>
              <li className="text-xs text-white/60">
                O painel <b>"LANCES ANTERIORES"</b> que ha acima da tela
                do jogo contém informações sobre os últimos resultados
                que saíram durante os últimos jogos.
              </li>
            </ul>

            <p className="text-white my-6 text-base font-medium">
              Conversa dentro do jogo
            </p>

            <ul className='list-disc list-inside space-y-4 mb-10'>
              <li className="text-xs text-white/60">
                No canto superior direito, há uma barra de bate-papo
                geral. Ele é projetado para se comunicar com outros
                jogadores. Além disso, o bate-papo apresenta
                automaticamente informações sobre o recebimento de
                grandes ganhos.
              </li>
            </ul>

            <p className="text-white my-6 text-base font-medium">
              Lidar com problemas técnicos
            </p>

            <ul className='list-disc list-inside space-y-4'>
              <li className="text-xs text-white/60">
                O operador não é responsável pela perda de uma aposta
                devido a uma interrupção da conexão com a Internet.
                Recomendamos jogar se você tiver uma conexão estável.
              </li>
              <li className="text-xs text-white/60">
                Caso ocorra uma falha no equipamento de jogo ou no
                software do jogo, todas as apostas e pagamentos serão
                confiscados. Entretanto, as apostas serão reembolsadas
                na íntegra aos jogadores afetados no prazo de 1 hora.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  )
}
