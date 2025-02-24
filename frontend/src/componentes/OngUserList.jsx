import { motion } from "framer-motion";
import { Info } from "lucide-react";
import React from "react";

export default function OngUserList({nomeUsuario, emailUsuario, dataUsuario}) {
  return (
    <div className="text-black items-center justify-between flex gap-2  bg-gray-200 min-w-[500px]  px-4 py-2 rounded-lg">
      {/* DIV DO HORÁRIO/DATA */}
      <div className="place-items-center">
        <h1> <strong>Último login</strong></h1>
        <h1>{new Date(dataUsuario).toLocaleDateString("pt-BR")}</h1>
      </div>

      <div className="border-1 h-8 mx-2 border-[#B6B6B6]" />

      {/*DIV DO TITULO */}
      <h1 className=" min-w-[148px] max-w-[148px] text-center overflow-ellipsis">
        {nomeUsuario}
      </h1>

      <div className="border-1 h-8 mx-2 border-[#B6B6B6]" />

      <div className="flex flex-col items-center justify-center min-w-[200px] max-w-[200px]">
        <h1><strong>Email</strong></h1>
        <h1>{emailUsuario}</h1>
      </div>


    </div>
  );
}
