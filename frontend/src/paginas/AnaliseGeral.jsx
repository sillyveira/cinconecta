import React, { useContext } from "react";
import Header from "../componentes/Header";
import StatCard from "../componentes/StatCard";
import { motion } from "framer-motion";
import { CalendarX, CircleDollarSign, Clipboard } from "lucide-react";
import EntradaSaida from "../componentes/EntradaSaida";
import ModalCC from "../componentes/Modal";
import ValorEstoque from "../componentes/ValorEstoque";
import ProdutoCategoria from "../componentes/ProdutoCategoria";
import { useState } from "react";
import DataContext from "../contextos/DataContext";
import ValidityCard from "../componentes/ValidityCard";
import ModalInfo from "../componentes/ModalInfo";

export default function AnaliseGeral() {
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => setOpenModal((prev) => !prev);

  const [openModalInfo, setOpenModalInfo] = useState(false);
  const toggleModalInfo = () => setOpenModalInfo((prev) => !prev);

  const [produtoAtual, setProdutoAtual] = useState({
    // valores padrão para não haver erro
    nome: "",
    id_categoria: "",
    quantidade: "",
    valor: "",
    validade: "",
    codbarras: "",
    descricao: "",
    _id: "",
  });

  const { Dados } = useContext(DataContext);
  return (
    <>
      <Header titulo="Análise Geral" />
      <div className="w-full h-full flex justify-center overflow-auto relative z-10">
        <motion.div className="fixed grid grid-cols-3 gap-x-2 gap-y-2 pt-6">
          <StatCard
            titulo={"Quantidade total de itens"}
            valor={
              !Dados || Dados.length === 0 ? "Sem dados" : Dados.quantidadetotal
            }
            icone={Clipboard}
            expandirFunction={() => {}}
          />
          <StatCard
            titulo={"Valor estimado do estoque"}
            valor={`${
              !Dados || Dados.length === 0 || Dados.valorestoque == undefined
                ? "Sem dados"
                : `R$ ${Dados.valorestoque}`
            }`}
            icone={CircleDollarSign}
            expandirFunction={() => {}}
          />
          <StatCard
            titulo={"Produtos próximos à validade"}
            valor={
              !Dados || Dados.length === 0
                ? "Sem dados"
                : Dados.produtosproximos.length
            }
            icone={CalendarX}
            expandirFunction={toggleModal}
            isExpandable={true}
          />

          <div className="col-span-3">
            <EntradaSaida />
          </div>

          <div className="col-span-2">
            <ValorEstoque />
          </div>

          <div className="col-span-1">
            <ProdutoCategoria />
            {/* <Chart type="pie" data={data} options={options} className="w-full md:w-30rem" /> */}
          </div>
        </motion.div>
      </div>

      {/* Modal de produtos próximos à validade */}
      <ModalCC
        titulo={"Produtos próximos à validade"}
        isOpen={openModal}
        onClose={toggleModal}
      >
        <div className="overflow-y-auto px-1 py-2 max-h-[290px] flex flex-col gap-2 pb-2">
          {Dados.produtosproximos ? (
            Dados.produtosproximos.map((item, index) => (
              <ValidityCard produto={item} key={index} onClick={()=>{
                setProdutoAtual(item);
                toggleModalInfo();
              }} />
            ))
          ) : (
            <p>Nada demais</p>
          )}
        </div>
      </ModalCC>

      {/* Modal de Info */}
      <ModalInfo
        isOpen={openModalInfo}
        onClose={toggleModalInfo}
        produto={produtoAtual}
      />
    </>
  );
}
