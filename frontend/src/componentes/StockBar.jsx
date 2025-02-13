import { ListFilter, CirclePlus, Search } from "lucide-react";


export default function StockBar(){

    const clicou = () =>{
        console.log("Clicou!")
        alert("Clicou mds 😱")
    }

    return (
        <div className="flex flex-row ml-[500px] gap-4">
            <button onClick={clicou} className="cursor-pointer flex flex-row justify-start w-[138px] h-[43px] rounded-[24px] border-2 border-black gap-2 p-4">
                <ListFilter className="self-center" color="black"/>
                <h1 className="self-center text-black">Filtrar</h1>
            </button>

            <div className="relative">
                <Search color="black" className=" absolute left-4 top-2"/>
                <input placeholder="Pesquisar" 
                type="search" 
                className="placeholder:text-center placeholder:text-black flex flex-row w-[648px] h-[43px] rounded-[37px] text-black border-2 border-[#D9D9D9] p-4 pl-12"/>
            </div>

            <button onClick={clicou} className="cursor-pointer flex flex-row justify-start w-[138px] h-[43px] rounded-[24px] border-2 border-black gap-2 p-4">
                <CirclePlus className="self-center" color="black"/>
                <h1 className="self-center text-black">Adicionar</h1>
            </button>
        </div>
    )
}
