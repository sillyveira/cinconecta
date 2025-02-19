import React from "react";
import DropDownMenu from "./Dropdown";
import Botao from "./Botao";
export default function FiltroAuditoria({
  info,
  setInfo,
  className,
  aplicarFiltro
}) {
  
  return (
    <div className={`bg-gray-100 max-w-sm w-full flex flex-col items-center border rounded-xl shadow-lg h-fit pb-8 px-4 ${className}`}>
      <h1 className="text-2xl text-black font-bold">Filtro</h1>
      <hr className="border-t-2 border-[#B6B6B6] w-full" />
        <div className="flex gap-4 pt-4">
          {/* Filtros de data */}
          <div>
            <label htmlFor="data-inicio" className="text-black pl-2">Data inicial</label>
            <input
              type="date"
              name="data-inicio"
              value={info.dataInicial}
              onChange={(e) => setInfo(prev => ({...prev, dataInicial: e.target.value}) )}
              className="appearance-none p-2 bg-[#B6B6B6] h-[46px] text-[#F7F7F7] text-left pt-2 border rounded-[15px]"
            />
          </div>
          <div>
            <label htmlFor="data-final" className="text-black pl-2">Data final</label>
            <input
              type="date"
              name="data-final"
              value={info.dataFinal}
              onChange={(e) => setInfo(prev => ({...prev, dataFinal: e.target.value}) )}
              className="appearance-none p-2 bg-[#B6B6B6] h-[46px] text-[#F7F7F7] text-left pt-2 border rounded-[15px]"
            />
          </div>
          {/* ------------------ */}
        </div>
        <div className="pt-4">
        <label htmlFor="filtrar-por-acao" className="text-black pl-2">Filtrar por Ação:</label>
          <DropDownMenu
              variant="gray"
              label="Selecione..."
              opcoes={info.categorias}
              className={"w-86"}
              onChange={(value) => setInfo(prev => ({...prev, acao: value})) }
          />
        </div>
        <Botao texto={"Salvar"} className={"mt-6"} onClick={aplicarFiltro}/>
    </div>
  );
}
