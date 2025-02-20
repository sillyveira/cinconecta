import { ListFilter, CirclePlus, Search, RefreshCcw, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export default function StockBar({onClickFiltrar, onChangePesquisar, onClickAdicionar, onClickPesquisar, onClickRefresh, onClickRemover, ids = [] }){

    

    return (
        <div className="flex flex-row gap-4 mr-25 mt-2 pl-5 sm:pl-0">
            <motion.button
            onClick={onClickFiltrar}
            className="cursor-pointer flex flex-row justify-start sm:w-[138px] h-[43px] rounded-[24px] border-2 border-black gap-2 p-4"
            whileHover={{scale: 1.02}}
            >
                <ListFilter className="self-center" color="black"/>
                <h1 className="self-center text-black hidden sm:block pl-2.5">Filtrar</h1>
            </motion.button>

            <div className="relative">
                <Search
                color="black"
                className="absolute right-4 top-2 hover:scale-105 hover:cursor-pointer active:scale-95"
                onClick={onClickPesquisar}
                />
                <input placeholder="Pesquisar" 
                onChange={onChangePesquisar}
                
                type="text" 
                className="placeholder:text-center placeholder:text-black flex flex-row xs:w-[448px] md:w-[648px] w-[148px] sm:w-[248px] h-[43px] rounded-[37px] text-black border-2 border-[#D9D9D9] p-4 pl-4 pr-10"/>
            </div>

            <motion.button
            onClick={onClickAdicionar}
            className="cursor-pointer flex flex-row justify-start sm:w-[138px] h-[43px] rounded-[24px] border-2 border-black gap-2 p-4"
            whileHover={{scale: 1.02}}
            >
                <CirclePlus className="self-center" color="black"/>
                <h1 className="self-center text-black hidden sm:block">Adicionar</h1>
            </motion.button>

            <motion.button
            onClick={onClickRefresh}
            className="cursor-pointer flex flex-row justify-start h-[43px] rounded-[24px] border-2 border-black gap-2 p-4"
            whileHover={{scale: 1.02}}
            >
            <RefreshCcw className="self-center" color="black"/>  
            </motion.button>

            {/* Botão de remover */}
            <motion.button
                onClick={onClickRemover}
                disabled={ids.length === 0} // Desativa o botão se a lista estiver vazia
                className={`flex flex-row justify-start sm:w-[120px] h-[43px] rounded-[24px] border-2 gap-2 p-4 transition-all
                    ${ids.length === 0 
                        ? "border-gray-400 text-gray-400 cursor-not-allowed" 
                        : "border-red-500 text-red-500 cursor-pointer hover:bg-red-100"
                    }`}
                whileHover={ids.length > 0 ? { scale: 1.02 } : {}}
            >
                <Trash2 className="self-center" color={ids.length === 0 ? "gray" : "red"} />
                <h1 className="self-center hidden sm:block">Apagar</h1>
            </motion.button>
        </div>
    )
}
