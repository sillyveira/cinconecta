import React, { useState } from "react";
import AuditCard from "../componentes/AuditCard";
import Botao from "../componentes/Botao";
import ModalCC from "../componentes/Modal";
function Perfil() {
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => setOpenModal((prev) => !prev);
  return (
    <>
      <Botao texto={"Abrir modal"} onClick={toggleModal}></Botao>

      <ModalCC titulo={"Teste"} isOpen={openModal} onClose={toggleModal}>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800">
            🎉 testezinho do modal 🎉
          </h3>
          <p className="text-gray-600 mt-2">
            é só incluir o conteúdo do modal dentro da tag, isso é possível com
            a prop chamada "children"
          </p>
        </div>
      </ModalCC>
    </>
  );
}

export default Perfil;