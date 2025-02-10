import { ListFilter, CirclePlus, Search } from "lucide-react";
import {InputAdornment, TextField} from '@mui/material'

//AVISO IMPORTANTE: A barra de pesquisa deste componente foi feita a partir do textfield da biblioteca material/mui, para renderizar este
//componente, instale antes esta biblioteca (Emotion Engine)

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

            <TextField 
            className="w-[648px]"
            placeholder="Pesquisar"
            color="black"
            slotProps={{
                input:{
                    startAdornment:(
                        <InputAdornment position="start" className="">
                            <Search color="black"/>
                        </InputAdornment>
                    )
                }
            }}
            sx={{
                '& .MuiOutlinedInput-root': {
                paddingTop: '4px',
                borderRadius:'37px',
                height:'43px',
                },
                '& .MuiInputBase-input::placeholder': {
                    color: 'black',
                    opacity: 1,
                    left: '50%',
                    transform:'translateX(-50%)',
                    textAlign: 'center',
                }
            }}
            />

            <button onClick={clicou} className="cursor-pointer flex flex-row justify-start w-[138px] h-[43px] rounded-[24px] border-2 border-black gap-2 p-4">
                <CirclePlus className="self-center" color="black"/>
                <h1 className="self-center text-black">Adicionar</h1>
            </button>
        </div>
    )
}
