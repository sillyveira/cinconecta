import React, { useContext, useEffect, useState } from "react";
import AuditCard from "../componentes/AuditCard";
import Header from "../componentes/Header";
import Paginacao from "../componentes/Paginacao";
import FiltroAuditoria from "../componentes/FiltroAuditoria";
import DataContext from "../contextos/DataContext";
import ModalCC from "../componentes/Modal";
import { useAuth } from "../contextos/AuthContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

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
    query += "?acao=";
    if (acao != null) {
      query += acao;
    } else {
      query += "null";
    }

    query += "&";
    if (dataInicio) {
      query += "dataInicial=";
    }
    query += dataInicio;

    query += "&";
    if (dataFinal) {
      query += "dataFinal=";
    }
    query += dataFinal;

    return query;
  };

  const { logout } = useAuth();
  const setarFiltro = async (acao, dataInicio, dataFinal) => {
    const qry = funcaoFiltroQuery(acao, dataInicio, dataFinal);
    aplicarFiltro(qry);
  };

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
      //{ key: "d", value: "", title: "Produtos" },
      { key: "e", value: "add", title: "Adição" },
      { key: "f", value: "rem", title: "Remoção" },
      { key: "g", value: "att", title: "Atualização" },
    ],
  });

  useEffect(() => {
    if (Auditoria && Auditoria.length > 0) {
      setDadosAuditoria(Auditoria);
      console.log(Auditoria);
      setItensDaPagina(
        Auditoria.slice(
          (numeroPag - 1) * itemPorPagina,
          numeroPag * itemPorPagina
        )
      );
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
    setItensDaPagina(
      Auditoria.slice(
        (numeroPag - 1) * itemPorPagina,
        numeroPag * itemPorPagina
      )
    );
  }, [numeroPag]);

  const formatarData = (data) => {
    if (!data) return "Data desconhecida";
    const dataObj = new Date(data);
    return isNaN(dataObj)
      ? "Data desconhecida"
      : dataObj.toLocaleDateString("pt-BR");
  };

  function criarDescricao(acao, item) {
    let descricao = null;

    switch (acao) {
      case "reg":
        descricao = (
          <div>
            <p>
              <strong>Informações do registro:</strong>
            </p>
            <p>
              <strong>Usuário:</strong>{" "}
              {item?.nome_usuario || "Usuário desconhecido"}
            </p>
            <p>
              <strong>Data:</strong> {item?.data || "Data desconhecida"}
            </p>
            <p>
              <strong>Horário:</strong>{" "}
              {item?.horario || "Horário desconhecido"}
            </p>
          </div>
        );
        break;

      case "log":
        descricao = (
          <div>
            <p>
              <strong>Informações do login:</strong>
            </p>
            <p>
              <strong>Usuário:</strong>{" "}
              {item?.nome_usuario || "Usuário desconhecido"}
            </p>
            <p>
              <strong>Data:</strong> {item?.data || "Data desconhecida"}
            </p>
            <p>
              <strong>Horário:</strong>{" "}
              {item?.horario || "Horário desconhecido"}
            </p>
          </div>
        );
        break;

      case "rev":
        descricao = (
          <div>
            <p>
              <strong>Informações do log de revisão:</strong>
            </p>
            <p>
              <strong>Data da revisão:</strong>{" "}
              {item?.data || "Data desconhecida"}
            </p>
            <p>
              <strong>Entrada de produtos:</strong>{" "}
              {item?.desc?.entrada || "Sem entradas"}
            </p>
            <p>
              <strong>Saída de produtos:</strong>{" "}
              {item?.desc?.saida || "Sem saídas"}
            </p>
            <p>
              <strong>Valor arrecadado:</strong> R${" "}
              {item?.desc?.valor || "0,00"}
            </p>
          </div>
        );
        break;

      case "add":
        descricao = (
          <div>
            <p>
              <strong>Informações do produto adicionado:</strong>
            </p>
            <p>
              <strong>ID:</strong>{" "}
              {item?.desc?.novoProduto?._id || "ID desconhecido"}
            </p>
            <p>
              <strong>Nome:</strong>{" "}
              {item?.desc?.novoProduto?.nome || "Nome desconhecido"}
            </p>
            <p>
              <strong>Categoria:</strong>{" "}
              {item?.desc?.novoProduto?.nome_categoria ||
                "Categoria desconhecida"}
            </p>
            <p>
              <strong>Quantidade:</strong>{" "}
              {item?.desc?.novoProduto?.quantidade || "Quantidade desconhecida"}
            </p>
            <p>
              <strong>Preço:</strong>{" "}
              {item?.desc?.novoProduto?.valor || "Preço desconhecido"}
            </p>
            <p>
              <strong>Validade:</strong>{" "}
              {formatarData(item?.desc?.novoProduto?.validade)}
            </p>
            <p>
              <strong>Código de barras:</strong>{" "}
              {item?.desc?.novoProduto?.codbarras ||
                "Código de barras desconhecido"}
            </p>
            <p>
              <strong>Descrição:</strong>{" "}
              {item?.desc?.novoProduto?.descricao || "Descrição desconhecida"}
            </p>
            <hr />
            <p>
              <strong>Ação por:</strong> {item?.nome_usuario}
            </p>
          </div>
        );
        break;

      case "rem":
        descricao = (
          <div>
            <p>
              <strong>Informações dos produtos removidos:</strong>
            </p>
            {item?.desc?.produtos?.map((produto, index) => (
              <div key={index}>
                <p>
                  <strong>ID:</strong> {produto?._id || "ID desconhecido"}
                </p>
                <p>
                  <strong>Nome:</strong> {produto?.nome || "Nome desconhecido"}
                </p>
                <p>
                  <strong>Categoria:</strong>{" "}
                  {produto?.nome_categoria || "Categoria desconhecida"}
                </p>
                <p>
                  <strong>Quantidade:</strong>{" "}
                  {produto?.quantidade || "Quantidade desconhecida"}
                </p>
                <p>
                  <strong>Preço:</strong>{" "}
                  {produto?.valor || "Preço desconhecido"}
                </p>
                <p>
                  <strong>Validade:</strong> {formatarData(produto?.validade)}
                </p>
                <p>
                  <strong>Código de barras:</strong>{" "}
                  {produto?.codbarras || "Código de barras desconhecido"}
                </p>
                <p>
                  <strong>Descrição:</strong>{" "}
                  {produto?.descricao || "Descrição desconhecida"}
                </p>
                <hr />
              </div>
            ))}
            <p>
              <strong>Ação por:</strong> {item?.nome_usuario}
            </p>
          </div>
        );
        break;

      case "att":
        descricao = (
          <div>
            <p>
              <strong>Informações do produto atualizado:</strong>
            </p>
            <p>
              <strong>ID:</strong>{" "}
              {item?.desc?.produto?._id || "ID desconhecido"}
            </p>
            <p>
              <strong>Nome:</strong>{" "}
              {item?.desc?.produto?.nome || "Nome desconhecido"}
            </p>
            <p>
              <strong>Categoria:</strong>{" "}
              {item?.desc?.produto?.nome_categoria || "Categoria desconhecida"}
            </p>
            <p>
              <strong>Quantidade:</strong>{" "}
              {item?.desc?.produto?.quantidade || "Quantidade desconhecida"}
            </p>
            <p>
              <strong>Preço:</strong>{" "}
              {item?.desc?.produto?.valor || "Preço desconhecido"}
            </p>
            <p>
              <strong>Validade:</strong>{" "}
              {formatarData(item?.desc?.produto?.validade)}
            </p>
            <p>
              <strong>Código de barras:</strong>{" "}
              {item?.desc?.produto?.codbarras ||
                "Código de barras desconhecido"}
            </p>
            <p>
              <strong>Descrição:</strong>{" "}
              {item?.desc?.produto?.descricao || "Descrição desconhecida"}
            </p>

            {/* Se houver alterações, mapear todas as chaves e valores */}
            {item?.desc?.alteracoes && (
              <div>
                <hr />
                <p>
                  <strong>Alterações:</strong>
                </p>
                {Object.entries(item.desc.alteracoes).map(([chave, valor]) => (
                  <p key={chave}>
                    <strong>
                      {chave.charAt(0).toUpperCase() + chave.slice(1)}:
                    </strong>{" "}
                    {chave === "validade"
                      ? new Date(valor).toLocaleDateString("pt-BR")
                      : valor}
                  </p>
                ))}
              </div>
            )}

            <hr />
            <p>
              <strong>Ação por:</strong> {item?.nome_usuario}
            </p>
          </div>
        );
        break;

      default:
        descricao = (
          <p>
            <strong>Ação desconhecida.</strong>
          </p>
        );
        break;
    }

    return descricao;
  }

  return (
    <>
      <Header titulo={"Auditoria"}></Header>

      <motion.div
        initial={{ x: -70 }}
        animate={{ x: 0 }}
        className="flex flex-row-reverse justify-center gap-4 pt-10"
      >
        {/* Componente de filtro para PC */}
        <FiltroAuditoria
          className={""}
          info={Info}
          setInfo={setInfo}
          aplicarFiltro={() => {
            setarFiltro(Info.acao, Info.dataInicial, Info.dataFinal);
            toast.success("O filtro foi aplicado com sucesso");
          }}
          refreshFunction={() => {
            aplicarFiltro("");
            toast.success("A auditoria foi atualizada com sucesso.");
          }}
        />

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
      </motion.div>

      {/* Modal de Informações */}
      {infoAtual && (
        <ModalCC
          titulo="Detalhes do Log"
          isOpen={modalAberto}
          onClose={fecharModal}
        >
          <p>{criarDescricao(infoAtual.acao, infoAtual)}</p>
        </ModalCC>
      )}
    </>
  );
}

export default Auditoria;
