import React from "react";
import Header from "../componentes/Header";
import Textfield from "../componentes/Textfield";
import Botao from "../componentes/Botao";
const Login = () => {
  return (
    <>
      <div className="flex flex-col justify-between w-full h-screen overflow-hidden bg-gray-100">
        <main className="p-10 flex flex-col h-screen justify-center items-center flex-grow [@media(max-height:600px)]:flex-row">  
        <div className="flex flex-row justify-around items-center min-h-full min-w-full bg-gray-100 bd">
          <div className=" max-w-xl ">
            <img src="./src/imagens/img-login.png" alt="Imagem vetorial com dois personagens simulando o uso da plataforma de forma criativa." />
          </div>
          <div className="flex flex-col space-y-10 justify-around items-center w-[250px] bg-gray-100 border-4 border-[#B6B6B6] shadow-[0_4px_10px_rgba(0,0,0,0.25)] p-12 pl-40 pr-40 rounded-[40px] ml-5 mr-10">
            <form>
              <h2 className="text-center text-[22px] p-4 flex flex-col justify-center text-black font-bold mb-1.5">ACESSE SUA CONTA</h2>
              <div className="p-1.5">
                <Textfield
                titulo={"Email"}
                tipo={"text"}
                ></Textfield>
              </div>
              <div className="p-1.5">
                <Textfield
                titulo={"Senha"}
                tipo={"password"}
                ></Textfield>
              </div>
              <div className="p-1.5">
                <Botao className={"w-full"} texto="Entrar" onClick={()=>{}}></Botao>
              </div>
              {/* wesley: Por enquanto essa parte está desativada, é referente à esqueci minha senha e lembre-se de mim. */}
              {/* <div className="ml-2">
                <label className="flex items-center">
                  <input className="mr-2" type="checkbox"/>
                  <h6 className="text-black">Lembre-se de mim</h6>
                </label>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-gray-500 mr-2"></span>
                  <a className="text-black" href="#">Esqueci a senha</a>
                </div>
              </div> */}
            </form>
          </div>
        </div>
        </main>
      </div>
    </>
  );
};

export default Login;
