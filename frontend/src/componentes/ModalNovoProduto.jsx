import React, { useState } from "react";
import Modal from "react-modal";
import DropDownMenu from "./Dropdown";
import Botao from "./Botao";

Modal.setAppElement("#root");

export default function ModalNovoProduto({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    nome: "",
    categoria: "",
    quantidade: "",
    preco: "",
    validade: "",
    codigo: "",
    descricao: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white rounded-2xl p-6 shadow-lg max-w-lg w-full z-50"
      overlayClassName="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-40"
    >
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Novo produto</h2>
        <button className="text-xl font-bold cursor-pointer" onClick={onClose} aria-label="Fechar modal">
          ×
        </button>
      </div>
      <hr className="my-3" />

      {/* Formulário */}
      <div className="grid grid-cols-3 gap-3">
        <input
          type="text"
          name="nome"
          placeholder="Nome*"
          value={formData.nome}
          onChange={handleChange}
          className="p-3 bg-[#B6B6B6] text-white rounded-xl"  
          required
        />
        <DropDownMenu
          variant="gray"
          label="Categoria"
          opcoes={[
            { value: "eletronico", title: "Eletrônico" },
            { value: "vestuario", title: "Vestuário" },
          ]}
          className="p-3 bg-[#B6B6B6] text-white rounded-xl" 
          onChange={(value) => setFormData({ ...formData, categoria: value })}
        />
        <input
          type="number"
          name="quantidade"
          placeholder="Quantidade*"
          value={formData.quantidade}
          onChange={handleChange}
          className="p-3 bg-[#B6B6B6] text-white rounded-xl" 
          required
        />
        <input
          type="text"
          name="preco"
          placeholder="Preço"
          value={formData.preco}
          onChange={handleChange}
          className="p-3 bg-[#B6B6B6] text-white rounded-xl" 
        />
        <input
          type={formData.validade ? "date" : "text"} // Alterna entre text e date
          name="validade"
          placeholder="Validade"
          value={formData.validade}
          onFocus={(e) => (e.target.type = "date")} // Altera para date ao focar
          onBlur={(e) => (e.target.value === "" ? (e.target.type = "text") : null)} // Volta para text se estiver vazio
          onChange={handleChange}
          className="p-3 bg-[#B6B6B6] text-white rounded-xl"
        />
        <input
          type="text"
          name="codigo"
          placeholder="Código"
          value={formData.codigo}
          onChange={handleChange}
          className="p-3 bg-[#B6B6B6] text-white rounded-xl" 
        />
      </div>

      <textarea
        name="descricao"
        placeholder="Descrição"
        value={formData.descricao}
        onChange={handleChange}
        className="w-full mt-3 p-3 bg-[#B6B6B6] text-white rounded-xl h-24"
      ></textarea>
      
      {/* Botão */}
      <div className="flex justify-end w-full mt-4">
        <div className="flex">
            <Botao texto="Adicionar" disabled={!formData.nome || !formData.quantidade} className="bg-red-600 text-white px-6 py-3 rounded-xl" />
        </div>
    </div>

    </Modal>
  );
}