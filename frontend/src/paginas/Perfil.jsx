import React, { useState, useEffect } from "react";
import AuditCard from "../componentes/AuditCard";
import Botao from "../componentes/Botao";
import ModalCC from "../componentes/Modal";
import Header from "../componentes/Header";
import OngUserList from "../componentes/OngUserList";
import { useAuth } from "../contextos/AuthContext";
import { motion } from "framer-motion";

function Perfil() {
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => setOpenModal((prev) => !prev);
  const { username, ongName, email, ongMembers, logout } = useAuth();
  const [membrosOng, setarMembrosOng] = useState([]);
  
  useEffect(() => {
  if (ongMembers && ongMembers.length > 0) {
    setarMembrosOng(ongMembers);
  }
  }, [ongMembers])
  
  useEffect(() => {
    console.log("Estado atualizado de membrosOng:", membrosOng);
  }, [membrosOng]);

  return (
    <>
      <Header titulo={"Perfil"}></Header>

      <div className="flex flex-row items-center justify-center py-25">
        {/* Div do Perfil */}
        <motion.div
        initial={{opacity: 0, scale: 0}}
        animate={{opacity:1, scale:1}}
        className="bg-gray-50 shadow-lg rounded-2xl border flex flex-col max-w-120 py-10 items-center justify-center">
          {/* Imagem + nome & email */}
          <div className="flex flex-row items-center justify-center py-4 px-4">
            <img
              className="rounded-full w-24"
              src="./src/imagens/user.jpg"
              alt=""
            />
            <div className="flex flex-col text-black px-4">
              <h4>{username}</h4>
              <p className="overflow-clip max-w-60 text-xs">{email}</p>
            </div>
          </div>
          {/* Linha horizontal */}
          <hr className="text-[#B6B6B6] w-54" />
          {/* Botões */}
          <div className="flex flex-col items-center w-full py-4 gap-y-4">
            <Botao
              texto={"Configurações"}
              onClick={() => {}}
              className={"w-54"}
            ></Botao>

            <Botao texto={"Sair"} onClick={() => {logout("Logout"); }} className={"w-54"}></Botao>
          </div>
        </motion.div>

        {/* Div de informações da ong */}
        <motion.div
        initial={{y:170}}
        animate={{y:0}}
        className="bg-gray-50 flex flex-col rounded-sm border shadow-lg justify-center items-center mx-2">
          <div className="min-w-140 flex flex-col items-center gap-y-2">
            <h2 className="text-black text-xl pt-2">{ongName}</h2>

            <hr className="w-54 text-[#B6B6B6]" />
            <div className="overflow-y-auto px-2 max-h-[290px] flex flex-col gap-4 pb-2">
              {membrosOng ? (
                membrosOng.map((item, index) => (
                  <OngUserList 
                    key={item._id} 
                    nomeUsuario={item.nome} 
                    emailUsuario={item.email} 
                    dataUsuario={item.ultimo_login} 
                  />
                ))
                
              ) : (
                <p>Nada demais</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default Perfil;
