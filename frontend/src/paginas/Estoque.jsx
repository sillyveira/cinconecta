import React, { useState, useContext, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Edit, Info, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../componentes/Header";
import ModalFiltro from "../componentes/ModalFiltro";
import ModalInfo from "../componentes/ModalInfo";
import ModalNovoProduto from "../componentes/ModalNovoProduto";
import ModalEdicao from "../componentes/ModalEdicao";
import DataContext from "../contextos/DataContext";
import StockBar from "../componentes/Stockbar";
// Definição das colunas
const dataHoje = new Date();

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
      selector: (row) => row.nome_categoria,
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
          <Edit 
            onClick={() => {
            setEdicao(row) 
            setOpenModalEdicao((prev) => !prev)
          }}
          ></Edit>
          <Info
            className="cursor-pointer"
            onClick={() => toggleModalInfo(row)}
          ></Info>
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

  const [Pesquisa, setPesquisa] = useState("");
  const [edicaoProduto, setEdicao] = useState({});

  const [selectedRows, setSelectedRows] = React.useState([]);
  const [openModalFiltro, setOpenModalFiltro] = useState(false);
  const toggleModalFiltro = () => setOpenModalFiltro((prev) => !prev);

  const [openModalEdicao, setOpenModalEdicao] = useState(false);
  const toggleModalEdicao = () => setOpenModalEdicao((prev) => !prev);

  const [openModalNovoProduto, setOpenModalNovoProduto] = useState(false);
  const toggleModalNovoProduto = () => setOpenModalNovoProduto((prev) => !prev);

  const dataContext = useContext(DataContext);
  const { Estoque = [], carregando, erro, carregarEstoque } = dataContext;
  const [estoqueFiltrado, setEstoqueFiltrado] = useState([]);
  useEffect(() => {
    if (Estoque && Estoque.length > 0) {
      setEstoqueFiltrado(Estoque);
    }
  }, [Estoque]);
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggleModalInfo = (product = null) => {
    setSelectedProduct(product);
    setOpenModalInfo((prev) => !prev);
  };

  const funcaoPesquisar = (nomeBusca) => {
    const resultados = [];
    for (const produto of Estoque) {
      if (nomeBusca.toLowerCase().includes(produto.nome.toLowerCase())) {
        resultados.push(produto);
      }
    }
    return resultados;
  };

  return (
    <>
      <Header titulo={"Estoque"} />

      <div className="flex justify-center">
        <StockBar
          onChangePesquisar={(e) => setPesquisa(e.target.value)}
          onClickAdicionar={toggleModalNovoProduto}
          onClickFiltrar={toggleModalFiltro}
          onClickPesquisar={() => {
            if (Pesquisa != "") {
              setEstoqueFiltrado(funcaoPesquisar(Pesquisa));
            } else {
              setEstoqueFiltrado(Estoque);
            }
          }}
          onClickRefresh={() => {
            carregarEstoque();
          }}
        />
      </div>

      <div className="flex justify-center  items-center w-screen">
        {/* DataTable centralizado */}
        <div className="overflow-x-auto w-screen max-h-[calc(100vh-200px)]">
          {/* mx-auto para centralizar a tabela */}

          {carregando ? (
            <p className="text-center text-black justify-center">
              Carregando estoque...
            </p>
          ) : estoqueFiltrado && estoqueFiltrado.length > 0 ? (
            <DataTable
              columns={columns}
              customStyles={customStyles}
              data={estoqueFiltrado}
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
      <ModalInfo
        isOpen={openModalInfo}
        onClose={() => {setOpenModalInfo((prev) => !prev)}}
        produto={selectedProduct}
      />
      <ModalEdicao
        isOpen={openModalEdicao}
        onClose={() => {setOpenModalEdicao((prev) => !prev)}}
        produto={edicaoProduto}
      ></ModalEdicao>
    </>
  );
}

export default Estoque;
