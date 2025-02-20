import { div } from 'framer-motion/client';
import ModalCC from './Modal';
import Botao from './Botao';
import { useState } from 'react';


export default function ModalCategoria(open, close){

        const[valor, setValor] = useState("");
        const [savedValue, setSavedValue] = useState("");
        const [error, setError] = useState("");
        
        const handleChange = (event) =>{
            setValor(event.target.value);
            setError("");
        }
        const handleSave = () =>{
            if(!valor.trim()){
                setError("O nome não pode estar vazio.");
                return;
            }
            setSavedValue(valor)
            console.log(valor)
            setSavedValue("");
        }

    return(
        <>
        <ModalCC 
        titulo="Adicionar categoria"
        isOpen={open}
        onClose={close}
        >
            <div className='flex flex-col gap-5 items-end'>
                <input type="text"
                 value={valor} 
                 placeholder='Nome categoria' 
                 onChange={handleChange} 
                 className='w-[410px] text-center mt-[24px] rounded-[13px] h-[37px] border-2 border-gray-400'/>
                 {error && <p className='text-red-600 text-sm self-center'>{error}</p>}
                <Botao 
                className={'w-[94px] h-[41px] rounded-[12px] text-center'}
                texto={"Adicionar"}
                type="submit"
                onClick={handleSave}
                />
            </div>
        </ModalCC>
        </>
    )
}