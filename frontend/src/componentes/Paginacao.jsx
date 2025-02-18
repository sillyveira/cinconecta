import React from "react";
import { ChevronRight, ChevronsRight } from "lucide-react";
import { ChevronLeft, ChevronsLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function Paginacao({ paginaAtual, paginasTotais, setPagina}) {
  return (
    <>
      {/* PAGINAÇÃO */}
      <div className="flex justify-center items-center gap-10 py-2">
        {/* BOTÕES PARA ESQUERDA */}
        <div className="flex gap-2">
          <motion.button
            className="rounded-full bg-[#B6B6B6] p-2 text-2xl flex items-center text-white hover:cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={()=>setPagina(1)}
          >
            <ChevronsLeft></ChevronsLeft>
          </motion.button>

          <motion.button
            className="rounded-full bg-[#B6B6B6] p-2 text-xl flex items-center text-white hover:cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => {
              if (paginaAtual - 5 > 0) {
                setPagina((prev) => prev - 5);
              }
            }}
          >
            -5
          </motion.button>

          <motion.button
            className="rounded-full bg-[#B6B6B6] p-2 text-2xl flex items-center text-white hover:cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => {
              if (paginaAtual - 1 > 0) {
                setPagina((prev) => prev - 1);
              }
            }}
          >
            <ChevronLeft></ChevronLeft>
          </motion.button>
        </div>

        <div className="flex flex-col items-center text-black">
          <h1 className="text-black">
            {paginaAtual}/{paginasTotais}
          </h1>
          <hr />
          <h1 className="text-black">pág</h1>
        </div>

        {/* BOTÕES PARA DIREITA */}

        {/* botão: Avançar 1 página  */}
        <div className="flex gap-2">
          <motion.button
            className="rounded-full bg-[#B6B6B6] p-2 text-2xl flex items-center text-white hover:cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => {
              if (paginaAtual + 1 <= paginasTotais) {
                setPagina((prev) => prev + 1);
              }
            }}
          >
            <ChevronRight />
          </motion.button>

          {/* botão: Avançar 5 páginas  */}
          <motion.button
            className="rounded-full bg-[#B6B6B6] p-2 text-xl flex items-center text-white hover:cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => {
              if (paginaAtual + 5 <= paginasTotais) {
                setPagina((prev) => prev + 5);
              }
            }}
          >
            +5
          </motion.button>

          {/* botão: Passar todas as páginas  */}
          <motion.button
            className="rounded-full bg-[#B6B6B6] p-2 text-2xl flex items-center text-white hover:cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => {
                setPagina(paginasTotais);
            }}
          >
            <ChevronsRight />
          </motion.button>
        </div>
      </div>
    </>
  );
}
