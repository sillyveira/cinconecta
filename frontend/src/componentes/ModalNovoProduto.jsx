import React, { useContext, useState, useEffect } from "react";
import Modal from "react-modal";
import DropDownMenu from "./Dropdown";
import Botao from "./Botao";
import { adicionarProduto } from "../servicos/DataAPI";
import { useAuth } from "../contextos/AuthContext";
import DataContext from "../contextos/DataContext";
import ModalCategoria from "./ModalCategoria";
import { Edit, Settings } from "lucide-react";

Modal.setAppElement("#root");

export default function ModalNovoProduto({ isOpen, onClose }) {
  
  const { logout } = useAuth();

  const { carregarEstoque, carregarCategorias, Categorias } = useContext(DataContext);
  const [categorias, setCategorias] = useState({title:"", value:""});

  function mapearParaLista(array) {
    if (array) {
      return array.map((item) => ({
        title: item.nome_categoria,
        value: item._id,
      }));
    }
  }

  useEffect(() => {
    carregarCategorias();
    setCategorias(mapearParaLista(Categorias));
  }, []);

  useEffect(() => {
    setCategorias(mapearParaLista(Categorias));
  }, [Categorias]);

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
    descricao: "",
    validade: "",
    codbarras: "",
    quantidade: ""
  });

  const [openModalCategoria, setModalCategoria] = useState(false);

  const resetForm = () => {
    setFormData({
      nome: "",
      id_categoria: "",
      quantidade: "",
      valor: "",
      validade: "",
      codbarras: "",
      descricao: "",
    });
  }
  const handleClose = () => {
    resetForm();
    onClose();
  }
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "nome") {
      setErros((prev) => ({
        ...prev,
        nome:
          value.length > 40 ? "O nome pode ter no máximo 40 caracteres." : "",
      }));
    }

    if (name === "valor") {
      let formattedValue = value.replace(",", ".");
      setErros((prev) => ({
        ...prev,
        valor: !/^\d*\.?\d*$/.test(formattedValue) ? "Preço inválido." : "",
      }));
      setFormData({ ...formData, [name]: formattedValue });
      return;
    }

    if (name === "descricao") {
      setErros((prev) => ({
        ...prev,
        descricao:
          value.length > 200
            ? "A descrição pode ter no máximo 200 caracteres."
            : "",
      }));
    }

    if (name === "codbarras") {
      setErros((prev) => ({
        ...prev,
        codbarras:
          value.length > 20
            ? "O código de barras pode ter no máximo 20 caracteres."
            : "",
      }));
    }

    if (name === "quantidade") {
      if (!/^\d+$/.test(value)) {
        setErros((prev) => ({
          ...prev,
          quantidade: "A quantidade deve ser um número inteiro.",
        }));
      } else if (parseInt(value) > 100000) {
        setErros((prev) => ({
          ...prev,
          quantidade: "A quantidade não deve ultrapassar 100.000",
        }));
      } else {
        console.log(value);
        setErros((prev) => ({
          ...prev,
          quantidade: "",
        }));
      }
    }

    if (name === "validade") {
      // Se o campo estiver vazio, definir como undefined e limpar o erro
      if (value.trim() === "") {
        setFormData((prev) => ({ ...prev, validade: undefined }));
        setErros((prev) => ({ ...prev, validade: "" }));
        return;
      }
      const [ano, mes, dia] = value.split("-").map(Number);
      const dateValue = new Date(value);

      // Verifica se os valores são válidos
      if (
        ano < 2000 ||
        ano > 2100 || // Limita entre 2000 e 2100
        mes < 1 ||
        mes > 12 || // Mês inválido
        dia < 1 ||
        dia > 31 || // Dia inválido
        isNaN(dateValue.getTime()) // Verifica se o objeto Date é válido
      ) {
        setErros((prev) => ({
          ...prev,
          validade: "Data inválida. Escolha entre 01/01/2000 e 31/12/2100.",
        }));
      } else {
        setErros((prev) => ({ ...prev, validade: "" }));
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const isFormValid = () => {
    return (
      formData?.nome?.length > 0 &&
      formData?.nome?.length <= 40 &&
      formData?.quantidade &&
      formData?.descricao?.length <= 200 &&
      formData?.codbarras?.length <= 20 &&
      formData?.quantidade <= 100000 &&
      !erros.valor &&
      !erros.quantidade &&
      !erros.validade
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="bg-white rounded-2xl p-6 shadow-lg max-w-lg w-full z-50"
      overlayClassName="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-40"
    >
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Novo produto</h2>
        <button
          className="text-xl font-bold cursor-pointer"
          onClick={handleClose}
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
          <p className="text-red-500 text-sm min-h-[20px]">{erros.quantidade}</p>
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

        <div>
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
        <p className="text-red-500 text-sm min-h-[20px]">{erros.validade}</p>
        </div>

        <div>
        <input
          type="text"
          name="codbarras"
          placeholder="Código"
          value={formData.codbarras}
          onChange={handleChange}
          className="p-3 bg-[#B6B6B6] text-white rounded-xl w-full max-h-[50px]"
        />
        <p className="text-red-500 text-sm min-h-[20px]">{erros.codbarras}</p>
        </div>
      </div>

      <div>
      <textarea
        name="descricao"
        placeholder="Descrição"
        value={formData.descricao}
        onChange={handleChange}
        className="w-full mt-3 p-3 bg-[#B6B6B6] text-white rounded-xl h-24 max-h-[100px]"
      ></textarea>
      <p className="text-red-500 text-sm min-h-[20px]">{erros.descricao}</p>
      </div>

      {/* Botão */}
      <div className="flex justify-end w-full mt-4">
        <div className="flex">
          <Botao
            texto="Adicionar"
            disabled={!isFormValid()}
            className="text-white px-6 py-3 rounded-xl"
            onClick={() => {
              adicionar(formData);
              handleClose();
            }}
          />
        </div>
      </div>
      
      <ModalCategoria open={openModalCategoria} onRequestClose={()=>setModalCategoria(false)}></ModalCategoria>
      </Modal>
  );
}
