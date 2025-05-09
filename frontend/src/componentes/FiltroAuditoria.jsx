import React from "react";
import DropDownMenu from "./Dropdown";
import Botao from "./Botao";
import { RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";


export default function FiltroAuditoria({
  info,
  setInfo,
  className,
  aplicarFiltro,
  refreshFunction
}) {

  const verificarData = (data) => {
      const [ano, mes, dia] = data.split("-").map(Number);
      const dateValue = new Date(data);

      // Verifica se os valores são válidos
      if (
        ano < 2000 ||
        ano > 2100 || // Limita entre 2000 e 2100
        mes < 1 ||
        mes > 12 || // Mês inválido
        dia < 1 ||
        dia > 31 || // Dia inválido
        isNaN(dateValue.getTime()) // Verifica se o objeto Date é válido
      ) {
          return false;
      } else {
        return true;
      }

   
  }

  return (
    <div
      className={`bg-gray-100 max-w-sm w-full flex flex-col items-center border rounded-xl shadow-lg h-fit pb-8 px-4 ${className}`}
    >
      <div className="flex flex-row w-full items-center justify-between p-2">
        <h1 className="text-2xl text-black font-bold">Filtro</h1>
        <motion.button
          onClick={refreshFunction}
          className="cursor-pointer flex h-[23px] border-2 rounded-4xl border-black p-3"
          whileHover={{ scale: 1.02 }}
        >
          <RefreshCcw className="self-center" color="black" />
        </motion.button>
      </div>
      <hr className="border-t-2 border-[#B6B6B6] w-full" />
      <div className="flex gap-4 pt-4">
        {/* Filtros de data */}
        <div>
          <label htmlFor="data-inicio" className="text-black pl-2">
            Data inicial
          </label>
          <input
            type="date"
            name="data-inicio"
            value={info.dataInicial}
            onChange={(e) =>
              setInfo((prev) => ({ ...prev, dataInicial: e.target.value }))
            }
            className="appearance-none p-2 bg-[#B6B6B6] h-[46px] text-[#F7F7F7] text-left pt-2 border rounded-[15px]"
          />
        </div>
        <div>
          <label htmlFor="data-final" className="text-black pl-2">
            Data final
          </label>
          <input
            type="date"
            name="data-final"
            value={info.dataFinal}
            onChange={(e) =>
              setInfo((prev) => ({ ...prev, dataFinal: e.target.value }))
            }
            className="appearance-none p-2 bg-[#B6B6B6] h-[46px] text-[#F7F7F7] text-left pt-2 border rounded-[15px]"
          />
        </div>
        {/* ------------------ */}
      </div>
      <div className="pt-4">
        <label htmlFor="filtrar-por-acao" className="text-black pl-2">
          Filtrar por Ação:
        </label>
        <DropDownMenu
          variant="gray"
          label="Selecione..."
          opcoes={info.categorias}
          className={"w-86"}
          onChange={(value) => setInfo((prev) => ({ ...prev, acao: value }))}
        />
      </div>
      <Botao
        texto={"Salvar"}
        className={"mt-6 w-24 p-4"}
        onClick={()=>{
          if (verificarData(info.dataInicial) == false){
            toast.error("A data inicial deve estar entre 01/01/2000 e 31/12/2100.");
            return;
          } else if (verificarData(info.dataFinal) == false){
            toast.error("A data final deve estar entre 01/01/2000 e 31/12/2100.");
            return;
          } else if (info.dataFinal < info.dataInicial) {
            toast.error("A data inicial deve ser menor ou igual à data final.");
            return;
          }

          
          aplicarFiltro();
        }}
      />
    </div>
  );
}
