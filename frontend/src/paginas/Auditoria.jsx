import React, { useContext, useEffect, useState } from "react";
import AuditCard from "../componentes/AuditCard";
import Header from "../componentes/Header";
import Paginacao from "../componentes/Paginacao";
import FiltroAuditoria from "../componentes/FiltroAuditoria";
import DataContext from "../contextos/DataContext";
import ModalCC from "../componentes/Modal";
import { buscarAuditoria } from "../servicos/DataAPI";
import { useAuth } from "../contextos/AuthContext";
function Auditoria() {
  const [dadosAuditoria, setDadosAuditoria] = useState([]);
  const [itensAtuais, setItensAtuais] = useState([]);
  const [numeroPag, setNumeroPag] = useState(1);
  const itemPorPagina = 10;
  const [pagTotais, setPagTotais] = useState(1);
  const [itensDaPagina, setItensDaPagina] = useState([]);

  const {Auditoria, setAuditoria, aplicarFiltro} = useContext(DataContext);

  const funcaoFiltroQuery = (acao, dataInicio, dataFinal) => {
    let query = "";
    query += "?acao="
    if(acao != null){
      query += acao;
    } else {
      query+="null"
    }

    query+="&"
    if(dataInicio){
      query+="dataInicial="
    }
    query+=dataInicio
 
    query+="&"
    if(dataFinal){
      query+="dataFinal="
    }
    query+=dataFinal
    
    return query;
  }

  const {logout} = useAuth();
  const setarFiltro = async(acao, dataInicio, dataFinal) => {
    const qry = funcaoFiltroQuery(acao, dataInicio, dataFinal);
    console.log("QUERY:");
    console.log(qry);
    aplicarFiltro(qry)
  }
  
  
  const [modalAberto, setModalAberto] = useState(false);
  const [infoAtual, setInfoAtual] = useState(null);
  const abrirModal = (info) => {
    setInfoAtual(info);
    setModalAberto(true);
  };
  const fecharModal = () => {
    setModalAberto(false);
    setInfoAtual(null);
  };
  const [Info, setInfo] = useState({
    dataInicial: "",
    dataFinal: "",
    acao: null,
    categorias: [
      { key: "z", value: "", title: "Tudo"},
      { key: "a", value: "log", title: "Login" },
      { key: "b", value: "reg", title: "Registro" },
      { key: "c", value: "rev", title: "Revisão" },
      { key: "d", value: "", title: "Produtos" },
      { key: "e", value: "add", title: "Adição" },
      { key: "f", value: "rem", title: "Remoção" },
      { key: "g", value: "att", title: "Atualização" },
    ],
  });

  useEffect(() => {
    if (Auditoria && Auditoria.length > 0) {
      setDadosAuditoria(Auditoria);
      console.log(Auditoria);
      setItensDaPagina(Auditoria.slice(
        (numeroPag - 1) * itemPorPagina,
        numeroPag * itemPorPagina
      ))
      setPagTotais(Math.ceil(Auditoria.length / itemPorPagina));
      setNumeroPag(1);
      console.log(itensDaPagina);
    } else {
      setDadosAuditoria([]);
      setItensDaPagina([]);
      setPagTotais(0);
      setNumeroPag(0);
    }
  }, [Auditoria]);

  useEffect(()=>{
    setItensDaPagina(Auditoria.slice(
        (numeroPag - 1) * itemPorPagina,
        numeroPag * itemPorPagina
      ))
  }, [numeroPag])
  return (
    <>
      <Header titulo={"Auditoria"}></Header>

      <div className="flex flex-row-reverse justify-center gap-4 pt-10">
        
        {/* Componente de filtro para PC */}
        <FiltroAuditoria
        className={""}
        info={Info}
        setInfo={setInfo}
        aplicarFiltro={()=>{
          setarFiltro(Info.acao, Info.dataInicial, Info.dataFinal)
          
          }}>
        </FiltroAuditoria>
        
        {/* TODO: Aqui deve ser implementado o componente de filtro para Mobile*/}

        {/* Uma abordagem para fazer essa implementação de diferentes componentes a depender do tamanho da tela é você fazer isso: */}
        {/* <div className="block md:hidden">Componente para tela móvel</div>
             <div className="hidden md:block">Componente para tela desktop</div> */}
        {/* Quando a tela for maior que o "md", o componente para desktop aparece ^. Qualquer dúvida, só me perguntar ~ Wesley. */}

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
                  
                  funcaoClique={() => abrirModal(item)}
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
      {infoAtual && (
        <ModalCC titulo="Detalhes do Produto" isOpen={modalAberto} onClose={fecharModal}>
          <p><strong>Título:</strong> {infoAtual.acao}</p>
          <p><strong>Horário:</strong> {infoAtual.horario}</p>
          <p><strong>Data:</strong> {infoAtual.data}</p>
          <p><strong>Detalhes:</strong> {infoAtual.desc.produto}</p>
        </ModalCC>
      )}
    </>
  );
}

export default Auditoria;
