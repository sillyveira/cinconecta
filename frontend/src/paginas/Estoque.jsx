import React, { useState, useContext, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Edit, Info, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../componentes/Header";
import ModalFiltro from "../componentes/ModalFiltro";
import ModalNovoProduto from "../componentes/ModalNovoProduto";
import DataContext from "../contextos/DataContext";
// Definição das colunas
const dataHoje = new Date();
const columns = [
  {
    name: "ID",
    selector: (row) => row._id,
    sortable: true,
    maxWidth: "80px",
    style: {
      textAlign: "center",
    },
  },
  {
    name: "Nome",
    selector: (row) => row.nome,
    sortable: true,
    style: {
      overflow: "hidden",
      textAlign: "center",
    },
    minWidth: "150px",
    maxWidth: "300px",
    sortFunction: (rowA, rowB) => {
      return rowA.nome.localeCompare(rowB.nome, "pt-BR", {
        sensitivity: "base",
      });
    },
  },
  {
    name: "Categoria",
    selector: (row) => row.categoria,
    sortable: true,
    minWidth: "140px",
    style: {
      textAlign: "center",
      overflow: "hidden",
    },
  },
  {
    name: "Qtd",
    selector: (row) => row.quantidade,
    sortable: true,
    maxWidth: "80px",
    style: {
      textAlign: "center",
    },
  },
  {
    name: "Validade",
    selector: (row) => row.validade,
    sortable: true,
    minWidth: "180px",
    style: {
      textAlign: "center",
    },
    cell: (row) => {
      const getColor = (validadeStr) => {
        const [dia, mes, ano] = validadeStr.split("/").map(Number);
        const dataValidade = new Date(ano, mes - 1, dia);

        const diferencaMeses =
          (dataValidade - dataHoje) / (1000 * 60 * 60 * 24 * 30);

        if (diferencaMeses <= 1) return "text-red-500"; // Vermelho
        if (diferencaMeses <= 3) return "text-yellow-500"; // Amarelo
        return "hidden"; // invisível
      };

      return (
        <div className="flex items-center">
          <span className="sm:text-[12px]">{row.validade}</span>
          <Info className={`md:size-4 md:ml-1 ${getColor(row.validade)}`} />
        </div>
      );
    },
    sortFunction: (rowA, rowB) => {
      const parseDate = (dateStr) => {
        if (!dateStr || dateStr.trim() === "") return null;
        const [day, month, year] = dateStr.split("/").map(Number);
        return new Date(year, month - 1, day);
      };

      const dateA = parseDate(rowA.validade);
      const dateB = parseDate(rowB.validade);

      // Comparação de datas para ordem decrescente
      if (dateA > dateB) return -1; // A é mais recente, vem antes (ordem decrescente)
      if (dateA < dateB) return 1; // B é mais recente, vem antes (ordem decrescente)
      return 0; // Datas iguais
    },
  },
  {
    name: "Ações", // Coluna de botões
    cell: (row) => (
      <div className="flex flex-row gap-2">
        <Edit onClick={() => alert(`Ação clicada para ${row.nome}`)}></Edit>
        <Info></Info>
      </div>
    ),
    style: {
      textAlign: "center",
    },
    ignoreRowClick: true, // Ignora o clique na linha inteira
    allowOverflow: true,
    minWidth: "200px", // Ajuste a largura da coluna de botões conforme necessário
  },
];

const customStyles = {
  pagination: {
    style: {
      position: "fixed",
      justifyContent: "center",
      backgroundColor: "white",
      zIndex: 10,
      bottom: 0,
    },
  },
  selectedRow: {
    style: {
      backgroundColor: "#ADD8E6",
    },
  },

  headCells: {
    style: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "#333",
      backgroundColor: "#FFFFFFFF",
      whiteSpace: "normal",
    },
  },

  rows: {
    selectedHighlightStyle: {
      // use nth-of-type(n) to override other nth selectors
      style: {
        color: "#91E2FFFF",
        backgroundColor: "#91E2FFFF",
        borderBottomColor: "#91E2FFFF",
      },
    },
    highlightOnHoverStyle: {
      borderBottomColor: "#91E2FFFF",
      outlineStyle: "solid",
      outlineWidth: "1px",
      outlineColor: "#91E2FFFF",
    },
  },

  cells: {
    style: {
      backgroundColor: "#FFFFFFFF",
    },
  },
};

function Estoque() {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [openModalFiltro, setOpenModalFiltro] = useState(false);
  const toggleModalFiltro = () => setOpenModalFiltro((prev) => !prev);

  const [openModalNovoProduto, setOpenModalNovoProduto] = useState(false);
  const toggleModalNovoProduto = () => setOpenModalNovoProduto((prev) => !prev);
  const { Estoque, carregando, erro, recarregarEstoque, buscarEstoque } =
    useContext(DataContext);

  // const handleSort = (column, sortDirection) => {
  //   const sortedData = data.sort((a, b) => {
  //     if (sortDirection === "asc") {
  //       return a[column.selector] > b[column.selector] ? 1 : -1;
  //     } else {
  //       return a[column.selector] < b[column.selector] ? 1 : -1;
  //     }
  //   });

  //   setData(sortedData);
  // };

  return (
    <>
      <Header titulo={"Estoque"} />

      <div className="flex justify-center mr-20 space-x-2 mt-6">
        {/* Botão Filtrar com motion */}
        <motion.button
          className="bg-white text-black border-2 border-black rounded-lg px-4 py-2 hover:bg-black hover:text-white transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleModalFiltro}
        >
          Filtrar
        </motion.button>

        <div>
          {/* Campo de Pesquisa */}
          <input
            type="text"
            placeholder="Pesquisar..."
            className="border-2 border-black rounded-l-lg px-4 py-2 focus:outline-none text-black focus:ring-2 focus:ring-gray-500"
          />

          {/* Botão Pesquisar */}
          <button className="bg-black text-white border-2 border-black rounded-r-lg px-4 py-2 hover:bg-gray-800 transition-all">
            Pesquisar
          </button>
        </div>

        {/* Botão Novo com motion */}
        <motion.button
          className="bg-white text-black border-2 border-black rounded-lg px-4 py-2 hover:bg-black hover:text-white transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleModalNovoProduto}
        >
          Novo
        </motion.button>
        <button
          onClick={recarregarEstoque}
          type="button"
          className="w-12 bg-white border-2 border-gray-400 text-black rounded-lg active:scale-95 transition flex justify-center items-center"
        >
          <RefreshCcw></RefreshCcw>
        </button>
      </div>

      <div className="flex justify-center  items-center w-screen">
        {/* DataTable centralizado */}
        <div className="overflow-x-auto w-screen max-h-[calc(100vh-200px)]">
          {/* mx-auto para centralizar a tabela */}

          {carregando ? (
            <p className="text-center text-black justify-center">Carregando estoque...</p>
          ) : Estoque && Estoque.length > 0 ? (
            <DataTable
              columns={columns}
              customStyles={customStyles}
              data={Estoque}
              highlightOnHover
              fixedHeader
              fixedHeaderScrollHeight="calc(100vh - 190px)"
              selectableRows
              pagination
              paginationPerPage={10}
              selectableRowsHighlight
              onSelectedRowsChange={({ selectedRows }) =>
                setSelectedRows(selectedRows)
              }
              paginationComponentOptions={{
                rowsPerPageText: "Linhas por página",
                rangeSeparatorText: "de",
                selectAllRowsItem: true,
                selectAllRowsItemText: "Todos",
              }}
            />
          ) : (
            <p className="text-center text-black">Nenhum item encontrado.</p>
          )}
        </div>
      </div>
      <ModalFiltro
        isOpen={openModalFiltro}
        onClose={toggleModalFiltro}
      ></ModalFiltro>
      <ModalNovoProduto
        isOpen={openModalNovoProduto}
        onClose={toggleModalNovoProduto}
      ></ModalNovoProduto>
    </>
  );
}

export default Estoque;
