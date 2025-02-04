import React, { useEffect, useState } from "react";
import AuditCard from "../componentes/AuditCard";
import Header from "../componentes/Header";
import Paginacao from "../componentes/Paginacao";
import FiltroAuditoria from "../componentes/FiltroAuditoria";


function Auditoria() {
  const data = [
    {
      titulo: "'Nome do produto' foi removido do estoque",
      horario: "10:00",
      data: "2025-02-01",
    },
    {
      titulo: "'Nome do produto' foi adicionado no estoque",
      horario: "11:30",
      data: "2025-02-01",
    },
    {
      titulo: "'Nome do produto' foi atualizado no estoque ",
      horario: "14:00",
      data: "2025-02-02",
    },
    {
      titulo: "'Nome do produto' foi atualizado no estoque ",
      horario: "14:00",
      data: "2025-02-02",
    },
    {
      titulo: "'Nome do produto' foi atualizado no estoque ",
      horario: "14:00",
      data: "2025-02-02",
    },
    {
      titulo: "'Nome do produto' foi atualizado no estoque ",
      horario: "14:00",
      data: "2025-02-02",
    },
    {
      titulo: "'Nome do produto' foi atualizado no estoque ",
      horario: "14:00",
      data: "2025-02-02",
    },
    {
      titulo: "'Nome do produto' foi atualizado no estoque ",
      horario: "14:00",
      data: "2025-02-02",
    },
    {
      titulo: "'Nome do produto' foi atualizado no estoque ",
      horario: "14:00",
      data: "2025-02-02",
    },
    {
      titulo: "'Nome do produto' foi atualizado no estoque ",
      horario: "14:00",
      data: "2025-02-02",
    },
    {
      titulo: "'Nome do produto' foi atualizado no estoque ",
      horario: "14:00",
      data: "2025-02-02",
    },
    {
      titulo: "'Nome do produto' foi atualizado no estoque ",
      horario: "14:00",
      data: "2025-02-02",
    },
    {
      titulo: "'Nome do produto' foi atualizado no estoque ",
      horario: "14:00",
      data: "2025-02-02",
    },
    {
      titulo: "'Nome do produto' foi atualizado no estoque ",
      horario: "14:00",
      data: "2025-02-02",
    },
  ];
  const [itensAtuais, setItensAtuais] = useState([]);
  const [numeroPag, setNumeroPag] = useState(1);
  const itemPorPagina = 10;
  const pagTotais = (data.length % itemPorPagina) + 1;

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
 
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
        dataInicial={startDate} setDataInicial={setStartDate} dataFinal={endDate} setDataFinal={setEndDate} ></FiltroAuditoria>
        {/* TODO: Aqui deve ser implementado o componente de filtro para Mobile*/}

        {/* Uma abordagem para fazer essa implementação de diferentes componentes a depender do tamanho da tela é você fazer isso: */}
        {/* <div className="block md:hidden">Componente para tela móvel</div>
             <div className="hidden md:block">Componente para tela desktop</div> */}
        {/* Quando a tela for maior que o "md", o componente para desktop aparece ^. Qualquer dúvida, só me perguntar ~ Wesley. */}
        
        {/* Componente da lista de itens */}
        <div>
          <div className="border rounded-xl flex flex-col gap-3 items-center max-h-[calc(100vh-300px)] overflow-y-auto py-5 p-4">
            {data.map((item, index) => (
              <AuditCard
                key={index}
                titulo={item.titulo}
                horario={item.horario}
                data={item.data}
                funcaoClique={() => alert(`Clicou em: ${item.titulo}`)}
              />
            ))}
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
    </>
  );
}

export default Auditoria;
