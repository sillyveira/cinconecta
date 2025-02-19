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

  const { Auditoria, setAuditoria, aplicarFiltro } = useContext(DataContext);

  const funcaoFiltroQuery = (acao, dataInicio, dataFinal) => {
    let query = "";
    query += "?acao="
    if (acao != null) {
      query += acao;
    } else {
      query += "null"
    }

    query += "&"
    if (dataInicio) {
      query += "dataInicial="
    }
    query += dataInicio

    query += "&"
    if (dataFinal) {
      query += "dataFinal="
    }
    query += dataFinal

    return query;
  }

  const { logout } = useAuth();
  const setarFiltro = async (acao, dataInicio, dataFinal) => {
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
      { key: "z", value: "", title: "Tudo" },
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

  useEffect(() => {
    setItensDaPagina(Auditoria.slice(
      (numeroPag - 1) * itemPorPagina,
      numeroPag * itemPorPagina
    ))
  }, [numeroPag])

  function criarDescricao(acao, item) {
    let descricao = null;

    switch (acao) {
      case 'reg':
        descricao = (
          <div>
            <p><strong>Informações do registro:</strong></p>
            <p><strong>Usuário:</strong> {item?.nome_usuario || "Usuário desconhecido"}</p>
            <p><strong>Data:</strong> {item?.data || "Data desconhecida"}</p>
            <p><strong>Horário:</strong> {item?.horario || "Horário desconhecido"}</p>
          </div>
        );
        break;

      case 'log':
        descricao = (
          <div>
            <p><strong>Informações do login:</strong></p>
            <p><strong>Usuário:</strong> {item?.nome_usuario || "Usuário desconhecido"}</p>
            <p><strong>Data:</strong> {item?.data || "Data desconhecida"}</p>
            <p><strong>Horário:</strong> {item?.horario || "Horário desconhecido"}</p>
          </div>
        );
        break;

      case 'add':
        descricao = (
          <div>

            <p><strong>Informações do produto adicionado:</strong></p>

            <p><strong>ID:</strong> {item?.desc?.novoProduto?._id || "ID desconhecido"}</p>
            <p><strong>Nome:</strong> {item?.desc?.novoProduto?.nome || "Nome desconhecido"}</p>
            <p><strong>Categoria:</strong> {item?.desc?.novoProduto?.categoria || "Categoria desconhecida"}</p>
            <p><strong>Quantidade:</strong> {item?.desc?.novoProduto?.quantidade || "Quantidade desconhecida"}</p>
            <p><strong>Preço:</strong> {item?.desc?.novoProduto?.valor || "Preço desconhecido"}</p>
            <p><strong>Validade:</strong> {item?.desc?.novoProduto?.validade || "Validade desconhecida"}</p>
            <p><strong>Código de barras:</strong> {item?.desc?.novoProduto?.codbarras || "Código de barras desconhecido"}</p>
            <p><strong>Descrição:</strong> {item?.desc?.novoProduto?.descricao || "Descrição desconhecida"}</p>
          </div>
        );
        break;

      case 'rem':
        if (item?.desc?.produtos?.length > 1) {
          descricao = (
            <div>
              <p><strong>Informações do produto removido:</strong></p>
              <p><strong>ID:</strong> {item?.desc?.produtos[0]?._id || "ID desconhecido"}</p>
              <p><strong>Nome:</strong> {item?.desc?.produtos[0]?.nome || "Nome desconhecido"}</p>
              <p><strong>Categoria:</strong> {item?.desc?.produtos[0]?.categoria || "Categoria desconhecida"}</p>
              <p><strong>Quantidade:</strong> {item?.desc?.produtos[0]?.quantidade || "Quantidade desconhecida"}</p>
              <p><strong>Preço:</strong> {item?.desc?.produtos[0]?.valor || "Preço desconhecido"}</p>
              <p><strong>Validade:</strong> {item?.desc?.produtos[0]?.validade || "Validade desconhecida"}</p>
              <p><strong>Código de barras:</strong> {item?.desc?.produtos[0]?.codbarras || "Código de barras desconhecido"}</p>
              <p><strong>Descrição:</strong> {item?.desc?.produtos[0]?.descricao || "Descrição desconhecida"}</p>
            </div>
          );
        } else {
          descricao = <p><strong>Múltiplos produtos foram removidos.</strong></p>;
        }
        break;

      case 'att':
        descricao = (
          <div>
            <p><strong>Informações do produto atualizado:</strong></p>
            <p><strong>ID:</strong> {item?.desc?.atualizar_produto?._id || "ID desconhecido"}</p>
            <p><strong>Nome:</strong> {item?.desc?.atualizar_produto?.nome || "Nome desconhecido"}</p>
            <p><strong>Categoria:</strong> {item?.desc?.atualizar_produto?.categoria || "Categoria desconhecida"}</p>
            <p><strong>Quantidade:</strong> {item?.desc?.atualizar_produto?.quantidade || "Quantidade desconhecida"}</p>
            <p><strong>Preço:</strong> {item?.desc?.atualizar_produto?.valor || "Preço desconhecido"}</p>
            <p><strong>Validade:</strong> {item?.desc?.atualizar_produto?.validade || "Validade desconhecida"}</p>
            <p><strong>Código de barras:</strong> {item?.desc?.atualizar_produto?.codbarras || "Código de barras desconhecido"}</p>
            <p><strong>Descrição:</strong> {item?.desc?.atualizar_produto?.descricao || "Descrição desconhecida"}</p>
          </div>
        );
        break;

      default:
        descricao = <p><strong>Ação desconhecida.</strong></p>;
        break;
    }

    return descricao;
  }


  return (
    <>
      <Header titulo={"Auditoria"}></Header>

      <div className="flex flex-row-reverse justify-center gap-4 pt-10">

        {/* Componente de filtro para PC */}
        <FiltroAuditoria
          className={""}
          info={Info}
          setInfo={setInfo}
          aplicarFiltro={() => {
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
        <ModalCC titulo="Detalhes do Log" isOpen={modalAberto} onClose={fecharModal}>
          <p>{criarDescricao(infoAtual.acao, infoAtual)}</p>
        </ModalCC>
      )}
    </>
  );
}

export default Auditoria;
