import { ListFilter, CirclePlus, Search } from "lucide-react";
import {InputAdornment, TextField} from '@mui/material'

//TODO: Resolver problemas com a sobreposição da label e ativar o click dos botões
//AVISO IMPORTANTE: A barra de pesquisa deste componente foi feita a partir do textfield da biblioteca material/mui, para renderizar este
//componente, instale antes esta biblioteca (Emotion Engine)

export default function StockBar(onClick){

    return (
        <div className="flex flex-row ml-[500px] gap-4">
            <button className="flex flex-row justify-start w-[138px] h-[43px] rounded-[24px] border-2 border-black gap-2 p-4">
                <ListFilter className="self-center" color="black"/>
                <h1 className="self-center text-black">Filtrar</h1>
            </button>

            <TextField 
            className="w-[648px]"
            label="Pesquisar"
            color="black"
            slotProps={{
                input:{
                    startAdornment:(
                        <InputAdornment position="start" className="">
                            <Search color="black"/>
                        </InputAdornment>
                    )
                },
                inputLabel:{
                    sx:{
                        left: '50%',
                        transform:'translateX(-50%)',
                        textAlign: 'center',
                        paddingTop:'12px',
                        color:'black',
                    }
                }
            }
        }
        sx={{
            '& .MuiOutlinedInput-root': {
              paddingTop: '8px',
              borderRadius:'37px',
              height:'43px',
            },
          }}
            />

            <button className="flex flex-row justify-start w-[138px] h-[43px] rounded-[24px] border-2 border-black gap-2 p-4">
                <CirclePlus className="self-center" color="black"/>
                <h1 className="self-center text-black">Adicionar</h1>
            </button>
        </div>
    )
}
