import { Info } from 'lucide-react'
import React from 'react'

function ValidityCard({dataValidade, produto, onClick}) {
  

    return (
    <div className="text-black items-center justify-between flex gap-1 bg-gray-200 px-4 py-2 rounded-lg max-w-120">
      {/* DIV DO HORÁRIO/DATA */}
      <div className="flex flex-col place-items-center">
        <h1> <strong>Data de Validade</strong></h1>
        <h1>{produto.validade}</h1>
      </div>

      <div className="border-1 h-8 border-[#B6B6B6]" />
      
      <div className="flex flex-col place-items-center min-w-30 max-w-30">
        <h1><strong>Produto</strong></h1>
        <h1 className='max-w-30 whitespace-nowrap overflow-hidden'>{produto.nome}</h1>
      </div>

      <div className="border-1 h-8 border-[#B6B6B6]" />
      <Info className='mr-2 hover:scale-110 hover:cursor-pointer active:scale-95' onClick={onClick}/>
    </div>
  )
}

export default ValidityCard
