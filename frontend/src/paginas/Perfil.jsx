import React, { useState } from "react";
import Botao from "../componentes/Botao";
import ModalNovoProduto from "../componentes/ModalNovoProduto"; // Corrigido para importar o modal certo

function Perfil() {
  const [openModal, setOpenModal] = useState(true);

  const toggleModal = () => setOpenModal((prev) => !prev);

  return (
    <>
      <Botao texto={"Abrir modal"} onClick={toggleModal} />
      <ModalNovoProduto isOpen={openModal} onClose={toggleModal} />
    </>
  );
}

export default Perfil;