import React, { useEffect, useState } from "react";
import AuditCard from "../componentes/AuditCard";
import Header from "../componentes/Header";
import Paginacao from "../componentes/Paginacao";
import FiltroAuditoria from "../componentes/FiltroAuditoria";
/*import ModalCC from "../componentes/Modal";*/

function Auditoria() {
  const data = [
    {
      titulo: "'Nome do produto' foi removido do estoque",
      horario: "10:00",
      data: "2025-02-01",
      detalhes: "Detalhes sobre a remoção do produto..."
    },
    {
      titulo: "'Nome do produto' foi adicionado no estoque",
      horario: "11:30",
      data: "2025-02-01",
      detalhes: "Detalhes sobre a adição do produto..."
    },
    {
      titulo: "'Nome do produto' foi atualizado no estoque ",
      horario: "14:00",
      data: "2025-02-02",
      detalhes: "Detalhes sobre a atualização do produto..."
    },
    {
      titulo: "'Nome do produto' foi atualizado no estoque ",
      horario: "14:00",
      data: "2025-02-02",
      detalhes: "Detalhes sobre a atualização do produto..."
    },
    {
      titulo: "'Nome do produto' foi atualizado no estoque ",
      horario: "14:00",
      data: "2025-02-02",
      detalhes: "Detalhes sobre a atualização do produto..."
    },
    {
      titulo: "'Nome do produto' foi atualizado no estoque ",
      horario: "14:00",
      data: "2025-02-02",
      detalhes: "Detalhes sobre a atualização do produto..."
    },
    {
      titulo: "'Nome do produto' foi atualizado no estoque ",
      horario: "14:00",
      data: "2025-02-02",
      detalhes: "Detalhes sobre a atualização do produto..."
    },
    {
      titulo: "'Nome do produto' foi atualizado no estoque ",
      horario: "14:00",
      data: "2025-02-02",
      detalhes: "Detalhes sobre a atualização do produto..."
    },
    {
      titulo: "'Nome do produto' foi atualizado no estoque ",
      horario: "14:00",
      data: "2025-02-02",
      detalhes: "Detalhes sobre a atualização do produto..."
    },
    {
      titulo: "'Nome do produto' foi atualizado no estoque ",
      horario: "14:00",
      data: "2025-02-02",
      detalhes: "Detalhes sobre a atualização do produto..."
    },
    {
      titulo: "'Nome do produto' foi atualizado no estoque ",
      horario: "14:00",
      data: "2025-02-02",
      detalhes: "Detalhes sobre a atualização do produto..."
    },
    {
      titulo: "'Nome do produto' foi atualizado no estoque ",
      horario: "14:00",
      data: "2025-02-02",
      detalhes: "Detalhes sobre a atualização do produto..."
    },
    {
      titulo: "'Nome do produto' foi atualizado no estoque ",
      horario: "14:00",
      data: "2025-02-02",
      detalhes: "Detalhes sobre a atualização do produto..."
    },
    {
      titulo: "'Nome do produto' foi atualizado no estoque ",
      horario: "14:00",
      data: "2025-02-02",
      detalhes: "Detalhes sobre a atualização do produto..."
    },
  ];
  const [itensAtuais, setItensAtuais] = useState([]);
  const [numeroPag, setNumeroPag] = useState(1);
  const itemPorPagina = 10;
  const pagTotais = Math.ceil(data.length / itemPorPagina);
  const itensDaPagina = data.slice(
    (numeroPag - 1) * itemPorPagina,
    numeroPag * itemPorPagina
  );

  {/*
  const [modalAberto, setModalAberto] = useState(false);
  const [infoAtual, setInfoAtual] = useState(null);
  const abrirModal = (info) => {
    setInfoAtual(info);
    setModalAberto(true);
  };
  const fecharModal = () => {
    setModalAberto(false);
    setInfoAtual(null);
  };*/}
  const [Info, setInfo] = useState({
    dataInicial: "",
    dataFinal: "",
    categoria: null,
    categorias: [
      { key: "a", value: "Login", title: "Login" },
      { key: "b", value: "Registro", title: "Registro" },
      { key: "c", value: "Revisão", title: "Revisão" },
      { key: "d", value: "Produtos", title: "Produtos" },
      { key: "e", value: "Adição", title: "Adição" },
      { key: "f", value: "Remoção", title: "Remoção" },
      { key: "g", value: "Atualização", title: "Atualização" },
    ],
  });

  // Para buscar dados quando tivermos acesso à API.
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("https://jsonplaceholder.typicode.com/comments");
  //     const jsonData = await response.json();
  //     setItensAtuais(jsonData);
  //   } catch (error) {
  //     console.error(`Erro ao buscar dados: ${error}`)
  //   }
  // }

  return (
    <>
      <Header titulo={"Auditoria"}></Header>

      <div className="flex justify-center gap-4 pt-10">
        {/* Componente de filtro para PC */}
        <FiltroAuditoria
          className={""}
          info={Info}
          setInfo={setInfo}
        ></FiltroAuditoria>
        {/* TODO: Aqui deve ser implementado o componente de filtro para Mobile*/}

        {/* Uma abordagem para fazer essa implementação de diferentes componentes a depender do tamanho da tela é você fazer isso: */}
        {/* <div className="block md:hidden">Componente para tela móvel</div>
             <div className="hidden md:block">Componente para tela desktop</div> */}
        {/* Quando a tela for maior que o "md", o componente para desktop aparece ^. Qualquer dúvida, só me perguntar ~ Wesley. */}

        {/* Componente da lista de itens */}
        <div>
          <div className="border rounded-xl flex flex-col gap-3 items-center max-h-[calc(100vh-300px)] overflow-y-auto py-5 p-4">
            {itensDaPagina.length === 0 ? (
              <p className="text-black">Não há itens para exibir.</p>
            ) : (
              itensDaPagina.map((item, index) => (
                <AuditCard
                  key={index}
                  titulo={item.titulo}
                  horario={item.horario}
                  data={item.data}
                  funcaoClique={() => alert(`Clicou em: ${item.titulo}`)}
                />
              ))
            )}
          </div>
          {/* -------------- */}

          {/* Componente de paginação */}
          <Paginacao
            paginaAtual={numeroPag}
            paginasTotais={pagTotais}
            setPagina={setNumeroPag}
          />
          {/* ----------------- */}
        </div>
      </div>
      
      {/* Modal de Informações */}
      {/*infoAtual && (
        <ModalCC titulo="Detalhes do Produto" isOpen={modalAberto} onClose={fecharModal}>
          <p><strong>Título:</strong> {infoAtual.titulo}</p>
          <p><strong>Horário:</strong> {infoAtual.horario}</p>
          <p><strong>Data:</strong> {infoAtual.data}</p>
          <p><strong>Detalhes:</strong> {infoAtual.detalhes}</p>
        </ModalCC>
      )*/}
    </>
  );
}

export default Auditoria;

// Código para integrar a auditoria com o backend
// function Auditoria() {
//   const [logs, setlogs] = useState([]);
//   useEffect(() => {
//     async function receberLogs() {
//       try {
//         const response = await fetch(
//           "http://localhost:3000/auditoria/receber-logs",
//           {
//             method: "GET",
//             credentials: "include",
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (response.ok) {
//           const info = await response.json();
//           setlogs(info.logs);
//           console.log(info);
//         } else {
//           // Lide com erros de login (exiba uma mensagem de erro, etc.)
//           console.error("Erro ao fazer a requisição.");
//           return [];
//         }
//       } catch (error) {
//         console.error("Erro ao fazer a req:", error);
//       }
//     }
//     const receberL = receberLogs();
//   }, []);

//         <FiltroAuditoria
//           className={""}
//           info={Info}
//           setInfo={setInfo}
//         ></FiltroAuditoria>

//             {logs?.length > 0 && // Verifica se logs existe e tem pelo menos um elemento
//               logs.map((item, index) => (
//                 <AuditCard
//                   key={index}
//                   titulo={item.nome_usuario}
//                   horario={item.data}
//                   data={item.acao}
//                   funcaoClique={() => alert(`Clicou em: ${item.nome_usuario}`)}
//                 />

//           {/* -------------- */}

//           {/* Componente de paginação */}
//           {logs?.length > 0 && (
//                         <Paginacao
//                             paginaAtual={numeroPag}
//                             paginasTotais={pagTotais}
//                             setPagina={setNumeroPag}
//                         />
//                     )}
//           {/* ----------------- */}
