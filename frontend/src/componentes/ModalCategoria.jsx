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

export default function ModalCategoria({ open, onRequestClose }) {
  const [modo, setModo] = useState("criar"); // 'criar', 'editar', 'remover'
  const [valor, setValor] = useState("");

  const [categorias, setCategorias] = useState([{ title: "", value: "" }]);
  const [error, setError] = useState("");

  const [infoCategoria, setInfoCategoria] = useState([
    { criarCategoria: "" },
    { _idCategoriaEditar: "", editarCategoria: "" },
    { _idCategoriaRemover: "" },
  ]);

  const { logout } = useAuth();
  const { carregarCategorias, Categorias } = useContext(DataContext);

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

  let conteudo = null;
  if (modo === "criar") {
    conteudo = (
      <>
        <div className="flex items-center justify-center">
          <input
            type={"text"}
            className="pl-4 w-60 h-10 border-2xl border-[#B6B6B6] bg-[#B6B6B6] text-white rounded-xl placeholder-white focus:outline-none"
            placeholder={"Título da nova categoria"}
            onChange={(event) => {
              setInfoCategoria((prev) => [
                { ...prev[0], criarCategoria: event.target.value }, // Atualiza apenas criarCategoria
                prev[1], // Mantém o segundo objeto inalterado
                prev[2], // Mantém o terceiro objeto inalterado
              ]);
            }}
            value={infoCategoria[0].criarCategoria}
          />

          {/* <p>{infoCategoria[0]?.criarCategoria}</p> */}
          <Botao
            className={"mx-2 my-2"}
            texto={"Adicionar"}
            onClick={async () => {
              await adicionarCategoria(
                logout,
                infoCategoria[0]?.criarCategoria,
                carregarCategorias
              );
            }}
          ></Botao>
        </div>
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
            className="pl-4 w-60 h-10 border-2xl border-[#B6B6B6] bg-[#B6B6B6] text-white rounded-xl placeholder-white focus:outline-none"
            placeholder={"Título da nova categoria"}
            onChange={(event) => {
              setInfoCategoria((prev) => [
                prev[0], // Mantém o primeiro objeto inalterado
                { ...prev[1], editarCategoria: event.target.value }, // Atualiza apenas editarCategoria
                prev[2], // Mantém o terceiro objeto inalterado
              ]);
            }}
            value={infoCategoria[1].editarCategoria}
          />
          <Botao
            className={"mx-2 my-2"}
            texto={"Editar"}
            onClick={async() => {
                await atualizarCategoria(logout, infoCategoria[1]?._idCategoriaEditar, infoCategoria[1]?.editarCategoria, carregarCategorias)
            }}
          ></Botao>
        </div>
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
                {...prev[2], _idCategoriaRemover: v}, // Mantém o terceiro objeto inalterado
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
            onClick={async() => {
                await deletarCategoria(logout, infoCategoria[2]?._idCategoriaRemover, carregarCategorias)
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
      <div className="flex gap-3 mb-4 justify-center">
        <Botao
          texto="Criar"
          onClick={() => {
            setInfoCategoria((prev) => [
              { ...prev[0], criarCategoria: "" }, // Atualiza apenas criarCategoria
              prev[1], // Mantém o segundo objeto inalterado
              prev[2], // Mantém o terceiro objeto inalterado
            ]);
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
            setModo("remover");
          }}
        />
      </div>

      <div>{conteudo}</div>
    </ModalCC>
  );
}
