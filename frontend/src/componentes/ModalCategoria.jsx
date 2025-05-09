import { useContext, useEffect, useState } from "react";
import ModalCC from "./Modal";
import Botao from "./Botao";
import Textfield from "./Textfield";
import DropDownMenu from "./Dropdown";
import DataContext from "../contextos/DataContext";
import {
  adicionarCategoria,
  atualizarCategoria,
  deletarCategoria,
} from "../servicos/DataAPI";
import { useAuth } from "../contextos/AuthContext";
import toast from "react-hot-toast";

export default function ModalCategoria({ open, onRequestClose }) {
  const [modo, setModo] = useState("criar"); // 'criar', 'editar', 'remover'

  const [categorias, setCategorias] = useState([{ title: "", value: "" }]);


  const [infoCategoria, setInfoCategoria] = useState([
    { criarCategoria: "" },
    { _idCategoriaEditar: "", editarCategoria: "" },
    { _idCategoriaRemover: "" },
  ]);

  const { logout } = useAuth();
  const { carregarCategorias, Categorias } = useContext(DataContext);

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

  const [erros, setErros] = useState({
    titulo: "",
    categoria: "",
  });

  const isFormValid = () => {
    return erros.titulo == "" && erros.categoria == "";
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Validação da criação de categoria

    if (name == "criar-categoria" && value.length <= 25) {
      setInfoCategoria((prev) => [
        { ...prev[0], criarCategoria: value }, // Atualiza apenas criarCategoria
        prev[1], // Mantém o segundo objeto inalterado
        prev[2], // Mantém o terceiro objeto inalterado
      ]);
      setErros((prev) => ({ ...prev, titulo: "" }));
    } else if (name == "criar-categoria") {
      setErros((prev) => ({
        ...prev,
        titulo: "A categoria excede 25 caracteres.",
      }));
    }

    if (name == "editar-categoria" && value.length <= 25) {
      setInfoCategoria((prev) => [
        prev[0], // Mantém o primeiro objeto inalterado
        { ...prev[1], editarCategoria: value }, // Atualiza apenas editarCategoria
        prev[2], // Mantém o terceiro objeto inalterado
      ]);
      setErros((prev) => ({ ...prev, titulo: "" }));
    } else if (name == "editar-categoria") {
      setErros((prev) => ({
        ...prev,
        titulo: "A categoria excede 25 caracteres.",
      }));
    }
  };
  let conteudo = null;
  if (modo === "criar") {
    conteudo = (
      <>
        <div className="flex items-center justify-center">
          <input
            type={"text"}
            name="criar-categoria"
            className="pl-4 w-60 h-10 border-2xl border-[#B6B6B6] bg-[#B6B6B6] text-white rounded-xl placeholder-white focus:outline-none"
            placeholder={"Título da nova categoria"}
            onChange={handleChange}
            value={infoCategoria[0].criarCategoria}
          />

          {/* <p>{infoCategoria[0]?.criarCategoria}</p> */}
          <Botao
            className={"mx-2 my-2"}
            texto={"Adicionar"}
            disabled={!isFormValid()}
            onClick={async () => {

              if (infoCategoria[0].criarCategoria == "") {
                toast.error("Selecione um novo título para sua categoria!");
                return;
              }

              await adicionarCategoria(
                logout,
                infoCategoria[0]?.criarCategoria,
                carregarCategorias
              );
              onRequestClose();
            }}
          ></Botao>
        </div>
        <p className="text-red-500 text-sm min-h-[20px] text-center">
          {erros.titulo}
        </p>
      </>
    );
  } else if (modo === "editar") {
    conteudo = (
      <>
        <div className="flex justify-center">
          <DropDownMenu
            opcoes={categorias}
            onChange={(v) =>
              setInfoCategoria((prev) => [
                prev[0], // Mantém o primeiro objeto inalterado
                { ...prev[1], _idCategoriaEditar: v }, // Atualiza apenas editarCategoria
                prev[2], // Mantém o terceiro objeto inalterado
              ])
            }
            className="w-88"
            variant="gray"
            label="Categorias"
          />
        </div>
        <div className="flex items-center justify-center">
          <input
            type={"text"}
            name="editar-categoria"
            className="pl-4 w-60 h-10 border-2xl border-[#B6B6B6] bg-[#B6B6B6] text-white rounded-xl placeholder-white focus:outline-none"
            placeholder={"Título da nova categoria"}
            onChange={handleChange}
            value={infoCategoria[1].editarCategoria}
          />
          <Botao
            className={"mx-2 my-2"}
            texto={"Editar"}
            disabled={!isFormValid()}
            onClick={async () => {
              if (infoCategoria[1]._idCategoriaEditar == "") {
                toast.error("Selecione uma categoria para ser editada!");
                return;
              }

              if (infoCategoria[1].editarCategoria == "") {
                toast.error("Selecione um novo título para sua categoria!");
                return;
              }
              await atualizarCategoria(
                logout,
                infoCategoria[1]?._idCategoriaEditar,
                infoCategoria[1]?.editarCategoria,
                carregarCategorias
              );
              onRequestClose();
            }}
          ></Botao>
        </div>
        <p className="text-red-500 text-sm min-h-[20px] text-center">
          {erros.titulo}
        </p>
      </>
    );
  } else if (modo === "remover") {
    conteudo = (
      <>
        <div className="flex justify-center">
          <DropDownMenu
            opcoes={categorias}
            onChange={(v) =>
              setInfoCategoria((prev) => [
                prev[0], // Mantém o primeiro objeto inalterado
                prev[1], // Atualiza apenas editarCategoria
                { ...prev[2], _idCategoriaRemover: v }, // Mantém o terceiro objeto inalterado
              ])
            }
            className="w-88"
            variant="gray"
            label="Categorias"
          />
        </div>
        <div className="flex items-center justify-center">
          <Botao
            className={"mx-2 my-2 w-34"}
            texto={"Remover"}
            onClick={async () => {
              console.log(infoCategoria[2]._idCategoriaRemover);
              if (infoCategoria[2]._idCategoriaRemover == "") {
                toast.error("Selecione uma categoria para ser removida!");
                return;
              }

              await deletarCategoria(
                logout,
                infoCategoria[2]?._idCategoriaRemover,
                carregarCategorias
              );
            }}
          ></Botao>
        </div>
      </>
    );
  }
  return (
    <ModalCC
      titulo="Gerenciar Categorias"
      isOpen={open}
      onClose={onRequestClose}
    >
      <div className="flex gap-3 mb-4 mt-4 justify-center">
        <Botao
          texto="Criar"
          onClick={() => {
            setInfoCategoria((prev) => [
              { ...prev[0], criarCategoria: "" },
              prev[1],
              prev[2],
            ]);
            setErros({ titulo: "", categoria: "" })
            setModo("criar");
          }}
        />
        <Botao
          texto="Editar"
          onClick={() => {
            setInfoCategoria((prev) => [
              prev[0], // Mantém o primeiro objeto inalterado
              { ...prev[1], editarCategoria: "", _idCategoriaEditar: "" }, // Atualiza apenas editarCategoria
              prev[2], // Mantém o terceiro objeto inalterado
            ]);
            setErros({ titulo: "", categoria: "" })
            setModo("editar");
          }}
        />
        <Botao
          texto="Remover"
          onClick={() => {
            setInfoCategoria((prev) => [
              prev[0], // Mantém o primeiro objeto inalterado
              prev[1], // Atualiza apenas editarCategoria
              { ...prev[2], _idCategoriaRemover: "" }, // Mantém o terceiro objeto inalterado
            ]);
            setErros({ titulo: "", categoria: "" })
            setModo("remover");
          }}
        />
      </div>

      <div>{conteudo}</div>
    </ModalCC>
  );
}
