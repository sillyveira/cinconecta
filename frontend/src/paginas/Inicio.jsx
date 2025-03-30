import React from "react";
import Header from "../componentes/Header";
import { useAuth } from "../contextos/AuthContext";
import InitLogo from '../imagens/inicio.png';
const Inicio = () => {
  const {username} = useAuth();
  return (
    <>
      <div className="flex flex-col justify-between w-full h-screen overflow-hidden relative z-10">
        
        <Header titulo="Início" />
        <main className="p-10 flex flex-col h-screen justify-center items-center flex-grow [@media(max-height:600px)]:flex-row">  
          <img src={InitLogo} alt="Imagem vetorial com dois personagens simulando o uso da plataforma de forma criativa." className="sm:w-96 [@media(max-height:600px)]:w-56"/>
          <div>
          <p className="text-black text-center font-extrabold pt-8 text-base [@media(max-height:600px)]:text-xs">BEM VINDO(A), {username}!</p>
          <p className="text-black font-medium text-sm [@media(max-height:600px)]:text-xs sm:text-base text-center max-w-md lg:max-w-2xl">Nossa missão é facilitar o controle de estoque e a gestão de doações para organizações sociais em Pernambuco, permitindo que você dedique mais tempo às ações transformadoras que realizam.</p>
          </div>
        </main>
      </div>
    </>
  );
};

export default Inicio;
