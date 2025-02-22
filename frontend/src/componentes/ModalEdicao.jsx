import React, { useContext, useEffect, useState } from "react";
import ModalCategoria from "./ModalCategoria";
import Modal from "react-modal";
import DropDownMenu from "./Dropdown";
import Botao from "./Botao";
import {adicionarProduto, editarProduto } from "../servicos/DataAPI";
import { useAuth } from "../contextos/AuthContext";
import DataContext from "../contextos/DataContext";
import { Edit } from "lucide-react";

Modal.setAppElement("#root");

export default function ModalEdicao({ isOpen, onClose, produto }) {
  const { logout } = useAuth();

  const { carregarEstoque, carregarCategorias, Categorias } = useContext(DataContext);
  const [categorias, setCategorias] = useState({title:"", value:""});

  function mapearParaLista(array) {
    return array.map((item) => ({
      title: item.nome_categoria,
      value: item._id,
    }));
  }

  useEffect(() => {
    carregarCategorias();
    setCategorias(mapearParaLista(Categorias));
  }, []);

  useEffect(() => {
    setCategorias(mapearParaLista(Categorias));
  }, [Categorias]);

  const [openModalCategoria, setModalCategoria] = useState(false);

  const editar = (formData) => {
    editarProduto(logout, formData, carregarEstoque);
  };

  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData({
        nome: produto.nome,
        id_categoria: produto.id_categoria,
        quantidade: produto.quantidade,
        valor: produto.valor,
        validade: produto.validade,
        codbarras: produto.codbarras,
        descricao: produto.descricao,
        _id : produto._id,
      })
  }, [produto]);

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

  
  if (!isOpen || !produto) return null;
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white rounded-2xl p-6 shadow-lg max-w-lg w-full z-50"
      overlayClassName="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-40"
    >
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Editar Produto</h2>
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

        <div className="">
        <DropDownMenu
          variant="gray"
          label="Categoria"
          opcoes={categorias}
          className="bg-[#B6B6B6] text-white rounded-xl max-h-[50px] w-full p-3"
          onChange={(value) =>
            setFormData({ ...formData, id_categoria: value })
          }
        />
        <Edit
        className="cursor-pointer relative bottom-[2.15rem] left-29 hover:bg-white hover:rounded-lg hover:p-1 transition-colors"
        onClick={()=>setModalCategoria(true)}
        />
        </div>

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
            texto="Salvar"
            className="text-white px-6 py-3 rounded-xl"
            onClick={() => {
              editar(formData)
              onClose();
            }}
          />
        </div>
      </div>
      <ModalCategoria open={openModalCategoria} onRequestClose={()=>setModalCategoria(false)}></ModalCategoria>
    </Modal>
  );
}
