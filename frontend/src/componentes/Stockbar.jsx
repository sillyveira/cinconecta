import { ListFilter, CirclePlus, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function StockBar({onClickFiltrar, onChangePesquisar, onClickAdicionar}){

    const clicou = () =>{
        console.log("Clicou!")
        alert("Clicou mds 😱")
    }

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
                <Search color="black" className=" absolute left-4 top-2"/>
                <input placeholder="Pesquisar" 
                onChange={onChangePesquisar}
                type="search" 
                className="placeholder:text-center placeholder:text-black flex flex-row md:w-[648px] w-[148px] sm:w-[248px] h-[43px] rounded-[37px] text-black border-2 border-[#D9D9D9] p-4 pl-12"/>
            </div>

            <motion.button
            onClick={onClickAdicionar}
            className="cursor-pointer flex flex-row justify-start sm:w-[138px] h-[43px] rounded-[24px] border-2 border-black gap-2 p-4"
            whileHover={{scale: 1.02}}
            >
                <CirclePlus className="self-center" color="black"/>
                <h1 className="self-center text-black hidden sm:block">Adicionar</h1>
            </motion.button>
        </div>
    )
}
