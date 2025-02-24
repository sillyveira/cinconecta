import React from "react";
import { ArrowLeftCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../componentes/Footer";

function PoliticaPrivacidade() {
  return (
    <div className="bg-gray-100 h-screen text-black pt-6 px-24 flex flex-col">
      
      <div className="flex justify-center">
      <Link to={"/"} ><ArrowLeftCircle className="flex-1 cursor-pointer" size={64}></ArrowLeftCircle></Link>
      <h1 className="text-center flex-20 text-4xl p-2 font-semibold mb-6">
        Política de Privacidade - CinConecta
      </h1>
      </div>

      
      <div className="overflow-y-auto h-full">
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold">1. Introdução</h2>
            <p>
              Bem-vindo ao CinConecta! Somos uma equipe de desenvolvedores do
              Centro de Informática da UFPE, comprometidos em oferecer um
              sistema de estoque facilitado para ONGs. Valorizamos a privacidade
              e segurança dos dados dos nossos usuários. Este documento explica
              como coletamos, usamos e protegemos suas informações.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">2. Dados Coletados</h2>
            <p>Coletamos os seguintes dados dos usuários:</p>
            <ul className="list-disc pl-6">
              <li>Nome</li>
              <li>E-mail</li>
              <li>ONG na qual o usuário atua</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">3. Forma de Coleta</h2>
            <p>Os dados são coletados das seguintes maneiras:</p>
            <ul className="list-disc pl-6">
              <li>
                Nome e ONG: Obtidos via API do ConectaRecife no momento do
                login.
              </li>
              <li>
                E-mail: Fornecido pelo usuário através do nosso formulário de
                login.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">4. Finalidade da Coleta</h2>
            <p>Utilizamos esses dados para:</p>
            <ul className="list-disc pl-6">
              <li>Identificar os usuários na plataforma;</li>
              <li>Funcionamento do sistema.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">
              5. Compartilhamento de Dados
            </h2>
            <p>Não compartilhamos os dados dos usuários com terceiros.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">
              6. Segurança e Armazenamento
            </h2>
            <p>
              Não armazenamos senhas, o login é realizado via API do
              ConectaRecife.
            </p>
            <p>
              Como não há dados sensíveis no sistema, não utilizamos
              criptografia.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">7. Direitos dos Usuários</h2>
            <p>
              Os usuários podem solicitar a remoção de suas contas do sistema.
              Para isso, basta entrar em contato conforme indicado abaixo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">8. Contato</h2>
            <p>
              Para dúvidas ou solicitações relacionadas à privacidade dos dados,
              entre em contato com o líder técnico do CinConecta:
            </p>
            <ul className="list-none pl-6">
              <li>
                <strong>Nome:</strong> Wesley Silveira
              </li>
              <li>
                <strong>E-mail:</strong> wslc@cin.ufpe.br
              </li>
            </ul>
          </section>

          <section>
            <p>
              Esta Política de Privacidade pode ser atualizada conforme
              necessário. Qualquer alteração será comunicada através dos nossos
              canais oficiais.
            </p>
          </section>
        </div>
      </div>
      <Footer></Footer> 
    </div>
  );
}

export default PoliticaPrivacidade;
