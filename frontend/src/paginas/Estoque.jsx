import React from "react";
import DataTable from "react-data-table-component";
import { Edit, Info } from "lucide-react";
import {motion} from "framer-motion";
import Header from "../componentes/Header";
// Definição das colunas
const columns = [
  {
    name: "ID",
    selector: (row) => row.id,
    sortable: true,
    maxWidth: "80px",
    style: {
      textAlign: "center",
    },
  },
  {
    name: "Nome",
    selector: (row) => row.name,
    sortable: true,
    style: {
      overflow: "hidden",
      textAlign: "center",
    },
    minWidth: "150px",
    maxWidth: "300px",
  },
  {
    name: "Categoria",
    selector: (row) => row.category,
    sortable: true,
    minWidth: "140px",
    style: {
      textAlign: "center",
      overflow: "hidden",
    },
  },
  {
    name: "Qtd",
    selector: (row) => row.quantity,
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
        const dataHoje = new Date();

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
        const [day, month, year] = dateStr.split("/").map(Number);
        return new Date(year, month - 1, day);
      };

      return parseDate(rowA.validade) - parseDate(rowB.validade);
    },
  },
  {
    name: "Ações", // Coluna de botões
    cell: (row) => (
      <div className="flex flex-row gap-2">
        <Edit onClick={() => alert(`Ação clicada para ${row.name}`)}></Edit>
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
      bottom: 0
    }
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
			outlineStyle: 'solid',
			outlineWidth: '1px',
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
  const [data, setData] = React.useState([
    {
      id: 1,
      name: "Produto AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      category: "Limpeza",
      quantity: 30,
      price: "$10.00",
      validade: "15/06/2026",
    },
    {
      id: 2,
      name: "Produto B",
      category: "Eletrodomésticos",
      quantity: 20,
      price: "$15.00",
      validade: "10/11/2027",
    },
    {
      id: 3,
      name: "Produto C",
      category: "Alimentos",
      quantity: 50,
      price: "$8.00",
      validade: "",
    },
    {
      id: 4,
      name: "Produto D",
      category: "Higiene Pessoal",
      quantity: 45,
      price: "$12.00",
      validade: "05/10/2026",
    },
    {
      id: 5,
      name: "Produto E",
      category: "Limpeza",
      quantity: 35,
      price: "$20.00",
      validade: "28/07/2025",
    },
    {
      id: 6,
      name: "Produto F",
      category: "Eletrodomésticos",
      quantity: 25,
      price: "$5.00",
      validade: "14/09/2027",
    },
    {
      id: 7,
      name: "Produto G",
      category: "Alimentos",
      quantity: 50,
      price: "$18.00",
      validade: "19/12/2025",
    },
    {
      id: 8,
      name: "Produto H",
      category: "Higiene Pessoal",
      quantity: 40,
      price: "$25.00",
      validade: "23/04/2026",
    },
    {
      id: 9,
      name: "Produto I",
      category: "Limpeza",
      quantity: 30,
      price: "$15.00",
      validade: "17/08/2027",
    },
    {
      id: 10,
      name: "Produto J",
      category: "Perfumaria",
      quantity: 20,
      price: "$10.00",
      validade: "04/11/2026",
    },
    {
      id: 11,
      name: "Produto K",
      category: "Perfumaria",
      quantity: 60,
      price: "$30.00",
      validade: "18/06/2025",
    },
    {
      id: 12,
      name: "Produto L",
      category: "Material de Construção",
      quantity: 55,
      price: "$40.00",
      validade: "13/05/2026",
    },
    {
      id: 13,
      name: "Produto M",
      category: "Alimentos",
      quantity: 35,
      price: "$25.00",
      validade: "12/12/2027",
    },
    {
      id: 14,
      name: "Produto N",
      category: "Higiene Pessoal",
      quantity: 20,
      price: "$12.00",
      validade: "09/04/2025",
    },
    {
      id: 15,
      name: "Produto O",
      category: "Limpeza",
      quantity: 30,
      price: "$15.00",
      validade: "30/01/2028",
    },
    {
      id: 16,
      name: "Produto P",
      category: "Perfumaria",
      quantity: 50,
      price: "$20.00",
      validade: "25/07/2025",
    },
    {
      id: 17,
      name: "Produto Q",
      category: "Material de Construção",
      quantity: 40,
      price: "$18.00",
      validade: "21/09/2026",
    },
    {
      id: 18,
      name: "Produto R",
      category: "Perfumaria",
      quantity: 45,
      price: "$12.00",
      validade: "14/03/2027",
    },
    {
      id: 19,
      name: "Produto S",
      category: "Eletrodomésticos",
      quantity: 30,
      price: "$10.00",
      validade: "06/08/2026",
    },
    {
      id: 20,
      name: "Produto T",
      category: "Material de Construção",
      quantity: 25,
      price: "$5.00",
      validade: "22/12/2027",
    },
    {
      id: 21,
      name: "Produto U",
      category: "Alimentos",
      quantity: 40,
      price: "$25.00",
      validade: "07/04/2025",
    },
    {
      id: 22,
      name: "Produto V",
      category: "Higiene Pessoal",
      quantity: 60,
      price: "$30.00",
      validade: "29/11/2026",
    },
    {
      id: 23,
      name: "Produto W",
      category: "Limpeza",
      quantity: 55,
      price: "$40.00",
      validade: "18/10/2027",
    },
    {
      id: 24,
      name: "Produto X",
      category: "Perfumaria",
      quantity: 35,
      price: "$15.00",
      validade: "02/09/2025",
    },
    {
      id: 25,
      name: "Produto Y",
      category: "Material de Construção",
      quantity: 45,
      price: "$20.00",
      validade: "20/01/2028",
    },
    {
      id: 26,
      name: "Produto Z",
      category: "Alimentos",
      quantity: 50,
      price: "$8.00",
      validade: "10/05/2025",
    },
    {
      id: 27,
      name: "Produto AA",
      category: "Eletrodomésticos",
      quantity: 30,
      price: "$10.00",
      validade: "15/11/2027",
    },
    {
      id: 28,
      name: "Produto BB",
      category: "Higiene Pessoal",
      quantity: 25,
      price: "$5.00",
      validade: "17/02/2025",
    },
    {
      id: 29,
      name: "Produto CC",
      category: "Perfumaria",
      quantity: 50,
      price: "$18.00",
      validade: "09/07/2026",
    },
    {
      id: 30,
      name: "Produto DD",
      category: "Material de Construção",
      quantity: 20,
      price: "$12.00",
      validade: "08/06/2028",
    },
  ]);

  const handleSort = (column, sortDirection) => {
    const sortedData = data.sort((a, b) => {
      if (sortDirection === "asc") {
        return a[column.selector] > b[column.selector] ? 1 : -1;
      } else {
        return a[column.selector] < b[column.selector] ? 1 : -1;
      }
    });

    setData(sortedData);
  };

  return (
    <>

      
<Header titulo={"Estoque"}/>
      <div className="flex justify-center mr-20 space-x-2 mt-6">
          
        {/* Botão Filtrar com motion */}
        <motion.button
          className="bg-white text-black border-2 border-black rounded-lg px-4 py-2 hover:bg-black hover:text-white transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
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
        >
          Novo
        </motion.button>
      </div>

      <div className="flex justify-center  items-center w-screen">
        {/* DataTable centralizado */}
        <div className="overflow-x-auto w-screen max-h-[calc(100vh-200px)]">
           
          {/* mx-auto para centralizar a tabela */}
          <DataTable
            columns={columns}
            customStyles={customStyles}
            data={data}
            highlightOnHover
            onSort={handleSort}
            fixedHeader
            fixedHeaderScrollHeight="calc(100vh - 190px)"
            selectableRows
            pagination 
            paginationPerPage={10}
            selectableRowsHighlight
            onSelectedRowsChange={({ selectedRows }) =>
              setSelectedRows(selectedRows)
            }
            selected
            paginationComponentOptions={{
              rowsPerPageText: "Linhas por página",
              rangeSeparatorText: "de",
              selectAllRowsItem: true,
              selectAllRowsItemText: "Todos",
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Estoque;
