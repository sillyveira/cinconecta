import React, { useState } from 'react'
import DropDownMenu from './Dropdown';
import ModalCC from './Modal'
import Botao from './Botao';
function ModalFiltro({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        categoria: "",
        validade: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


return (
<>
<ModalCC
    titulo={"Filtrar"}
    isOpen={isOpen}
    onClose={onClose}
>
    
    <div className='flex-col flex items-center p-2 gap-1'>
    <h2 className="text-lg font-semibold">Por categoria</h2>
        <DropDownMenu
            variant="gray"
            label="Categoria"
            opcoes={[
                { key: "a", value: "eletronico", title: "Eletrônico" },
                { key: "b", value: "vestuario", title: "Vestuário" },
            ]}
            className={"w-54"}
            onChange={(value) => setFormData({ ...formData, categoria: value })}
        />
            <h2 className="text-lg font-medium">Por data de validade</h2>
        <input
            type="date"
            name="validade"
            onChange={handleChange}
            value={formData.validade}
            placeholder='Data de validade'
            className=
            'appearance-none p-2 bg-[#B6B6B6] h-[46px] text-[#F7F7F7] text-left pt-2 border rounded-[15px] w-54' />
            
        <Botao
        texto={"Salvar"}
        className={"w-28 mt-4"}
        onClick={onClose}
        >

        </Botao>
    </div>
</ModalCC>

</>
)
}

export default ModalFiltro