import React, { useState, useContext, useEffect } from "react";
import DataContext from "../contextos/DataContext";
import DropDownMenu from "./Dropdown";
import ModalCC from "./Modal";
import Botao from "./Botao";
import { buscarEstoque } from "../servicos/DataAPI";
import { useAuth } from "../contextos/AuthContext";
function ModalFiltro({ isOpen, onClose, setItensFiltrados }) {
  const [formData, setFormData] = useState({
    categoria: "",
    validade: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { carregarCategorias, Categorias } = useContext(DataContext);
  const [categorias, setCategorias] = useState({ title: "", value: "" });

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

  const filtroQuery = (id_categoria, validade) => {
    let query = "";
    query += "?id_categoria=";
    if (id_categoria != null) {
      query += id_categoria;
    } else {
      query += "null";
    }

    query += "&";
    if (validade) {
      query += "validade=";
    }
    query += validade;

    return query
  };

  const {logout} = useAuth();
  const aplicarFiltro = async (query) => {
    const estoqueFiltrado = await buscarEstoque(logout, query);
    if (buscarEstoque.length > 0){
        setItensFiltrados(estoqueFiltrado);
    } else {
        setItensFiltrados([]);
    }
  };

  return (
    <>
      <ModalCC titulo={"Filtrar"} isOpen={isOpen} onClose={onClose}>
        <div className="flex-col flex items-center p-2 gap-1">
          <h2 className="text-lg font-semibold">Por categoria</h2>
          <DropDownMenu
            variant="gray"
            label="Categoria"
            opcoes={categorias}
            className={"w-54"}
            onChange={(value) => setFormData({ ...formData, categoria: value })}
          />
          <h2 className="text-lg font-medium">Por data de validade</h2>
          <input
            type="date"
            name="validade"
            onChange={handleChange}
            value={formData.validade}
            placeholder="Data de validade"
            className="appearance-none p-2 bg-[#B6B6B6] h-[46px] text-[#F7F7F7] text-left pt-2 border rounded-[15px] w-54"
          />

          <Botao
            texto={"Salvar"}
            className={"w-28 mt-4"}
            onClick={() => {
              const qry = filtroQuery(formData.categoria, formData.validade);
              aplicarFiltro(qry);
              setFormData({
                categoria: "",
                validade: "",
              });
              onClose();
            }}
          ></Botao>
        </div>
      </ModalCC>
    </>
  );
}

export default ModalFiltro;
