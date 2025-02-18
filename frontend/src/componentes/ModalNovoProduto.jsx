import React, { useContext, useState } from "react";
import Modal from "react-modal";
import DropDownMenu from "./Dropdown";
import Botao from "./Botao";
import { adicionarProduto } from "../servicos/DataAPI";
import { useAuth } from "../contextos/AuthContext";
import DataContext from "../contextos/DataContext";

Modal.setAppElement("#root");

export default function ModalNovoProduto({ isOpen, onClose }) {
  const { carregarEstoque } = useContext(DataContext);
  const { logout } = useAuth();

  const adicionar = (formData) => {
    adicionarProduto(logout, formData, carregarEstoque);
  };

  const [formData, setFormData] = useState({
    nome: "",
    id_categoria: "",
    quantidade: "",
    valor: "",
    validade: "",
    codbarras: "",
    descricao: "",
  });

  const [erros, setErros] = useState({
    nome: "",
    valor: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "nome") {
      if (value.length > 40) {
        setErros((prev) => ({
          ...prev,
          nome: "O nome pode ter no máximo 40 caracteres.",
        }));
      } else {
        setErros((prev) => ({ ...prev, nome: "" }));
      }
    }

    if (name === "valor") {
      let formattedValue = value.replace(",", "."); // Substitui vírgulas por pontos
      if (!/^\d*\.?\d*$/.test(formattedValue)) {
        setErros((prev) => ({ ...prev, valor: "Preço inválido." }));
      } else {
        setErros((prev) => ({ ...prev, valor: "" }));
      }
      setFormData({ ...formData, [name]: formattedValue });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const isFormValid = () => {
    return (
      formData.nome.length > 0 &&
      formData.nome.length <= 40 &&
      formData.quantidade &&
      !erros.valor
    );
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
        <button
          className="text-xl font-bold cursor-pointer"
          onClick={onClose}
          aria-label="Fechar modal"
        >
          ×
        </button>
      </div>
      <hr className="my-3" />

      {/* Formulário */}
      <div className="grid grid-cols-3 gap-3">
        <div>
          <input
            type="text"
            name="nome"
            placeholder="Nome*"
            value={formData.nome}
            onChange={handleChange}
            className="p-3 bg-[#B6B6B6] text-white rounded-xl w-full max-h-[50px]"
            required
          />
          <p className="text-red-500 text-sm min-h-[20px]">{erros.nome}</p>
        </div>

        <DropDownMenu
          variant="gray"
          label="Categoria"
          opcoes={[
            { value: "eletronico", title: "Eletrônico" },
            { value: "vestuario", title: "Vestuário" },
          ]}
          className="p-3 bg-[#B6B6B6] text-white rounded-xl max-h-[50px]"
          onChange={(value) =>
            setFormData({ ...formData, id_categoria: value })
          }
        />

        <div>
          <input
            type="number"
            name="quantidade"
            placeholder="Quantidade*"
            value={formData.quantidade}
            onChange={handleChange}
            className="p-3 bg-[#B6B6B6] text-white rounded-xl w-full max-h-[50px]"
            required
          />
          <p className="text-red-500 text-sm min-h-[20px]"></p>
        </div>

        <div>
          <input
            type="text"
            name="valor"
            placeholder="Preço"
            value={formData.valor}
            onChange={handleChange}
            className="p-3 bg-[#B6B6B6] text-white rounded-xl w-full max-h-[50px]"
          />
          <p className="text-red-500 text-sm min-h-[20px]">{erros.valor}</p>
        </div>

        <input
          type={formData.validade ? "date" : "text"}
          name="validade"
          placeholder="Validade"
          value={formData.validade}
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) =>
            e.target.value === "" ? (e.target.type = "text") : null
          }
          onChange={handleChange}
          className="p-3 bg-[#B6B6B6] text-white rounded-xl w-full max-h-[50px]"
        />

        <input
          type="text"
          name="codbarras"
          placeholder="Código"
          value={formData.codbarras}
          onChange={handleChange}
          className="p-3 bg-[#B6B6B6] text-white rounded-xl w-full max-h-[50px]"
        />
      </div>

      <textarea
        name="descricao"
        placeholder="Descrição"
        value={formData.descricao}
        onChange={handleChange}
        className="w-full mt-3 p-3 bg-[#B6B6B6] text-white rounded-xl h-24 max-h-[100px]"
      ></textarea>

      {/* Botão */}
      <div className="flex justify-end w-full mt-4">
        <div className="flex">
          <Botao
            texto="Adicionar"
            disabled={!isFormValid()}
            className="text-white px-6 py-3 rounded-xl"
            onClick={() => {
              adicionar(formData);
              onClose();
            }}
          />
        </div>
      </div>
    </Modal>
  );
}
