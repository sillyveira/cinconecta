  import React from "react";
import { motion } from "framer-motion";
import { Clipboard } from "lucide-react";
function StatCard({titulo, valor, expandirFunction}) {
  return (
    <motion.div
      className="text-black bg-gray-800 shadow-2xl bg-opacity-100 border backdrop-blur-md rounded-md w-64 h-24"
      whileHover={{ y: -2, boxShadow: "0 10px 50px -12px rgba(0,0,0,0.5" }}
    >
      <div>
        {/* Coluna do texto [Quantidade total] + Ícone */}
        <div className="pt-3 pl-3 flex flex-row items-center gap-1">
          <p className="text-white font-medium text-sm">{titulo}</p>
        </div>
        {/* Número */}
        <p className="text-white font-medium text-3xl pl-3">{valor}</p>
      </div>

      <p className="text-blue-400 ml-auto cursor-pointer underline mr-1 w-16 group" onClick={expandirFunction} >Expandir</p>

    </motion.div>
  );
}

export default StatCard;
