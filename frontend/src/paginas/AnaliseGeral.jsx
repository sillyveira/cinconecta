import React from "react";
import Header from "../componentes/Header";
import StatCard from "../componentes/StatCard";
import { motion } from "framer-motion";
import { CalendarX, CircleDollarSign, Clipboard } from "lucide-react";
import EntradaSaida from "../componentes/EntradaSaida";
import ModalCC from "../componentes/Modal";
import ValorEstoque from "../componentes/ValorEstoque";
import ProdutoCategoria from "../componentes/ProdutoCategoria";
import { useState } from "react";
export default function AnaliseGeral() {
  
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => setOpenModal((prev) => !prev);
  
  return (
    <>
      <Header titulo="Análise Geral" />
      <div className="w-full h-full flex justify-center overflow-auto relative z-10">
        <motion.div className="fixed grid grid-cols-3 gap-x-2 gap-y-2 pt-6">
          <StatCard
            titulo={"Quantidade total de itens"}
            valor={"124"}
            icone={Clipboard}
            expandirFunction={toggleModal}
          />
          <StatCard
            titulo={"Valor estimado do estoque"}
            valor={"R$ 785,00"}
            icone={CircleDollarSign}
            expandirFunction={toggleModal}
          />
          <StatCard
            titulo={"Produtos próximos à validade"}
            valor={"4"}
            icone={CalendarX}
            expandirFunction={toggleModal}
          />

          <div className="col-span-3">
            <EntradaSaida />
          </div>

          <div className="col-span-2">
            <ValorEstoque />
          </div>

          <div className="col-span-1">
            <ProdutoCategoria/>
            {/* <Chart type="pie" data={data} options={options} className="w-full md:w-30rem" /> */}
          </div>
        </motion.div>
      </div>
      <ModalCC titulo={"Modal em desenvolvimento"} isOpen={openModal} onClose={toggleModal}>
        <div className="mt-10 mb-10">Aqui ficará o conteúdo do "modal de expansão" da análise geral</div>
      </ModalCC>
    </>
  );
}
