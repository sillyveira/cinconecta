import { ArrowLeftCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import Footer from "../componentes/Footer";

const TermosCondicoes = () => {
  return (
    <div className="bg-gray-100 h-screen text-black pt-6 px-24 flex flex-col">
    <div className="flex justify-center">
      <Link to={"/"} ><ArrowLeftCircle className="flex-1 cursor-pointer" size={64}></ArrowLeftCircle></Link>
      <h1 className="text-center flex-20 text-4xl p-2 font-semibold mb-6">
        Termos e Condições de Uso - CinConecta
      </h1>
      </div>
    <div className="overflow-y-auto">
      <section className="mb-4">
        <h2 className="text-xl font-semibold">1. Introdução</h2>
        <p>Bem-vindo ao CinConecta! Somos uma equipe de desenvolvedores do Centro de Informática da UFPE, dedicada a fornecer um sistema de gestão de estoque para ONGs. Ao utilizar nossa plataforma, você concorda com os seguintes Termos e Condições de Uso.</p>
      </section>
      
      <section className="mb-4">
        <h2 className="text-xl font-semibold">2. Uso da Plataforma</h2>
        <ul className="list-disc pl-6">
          <li>O CinConecta é destinado exclusivamente para ONGs e seus representantes autorizados.</li>
          <li>O acesso à plataforma é realizado através da API do ConectaRecife para validação do login.</li>
        </ul>
      </section>
      
      <section className="mb-4">
        <h2 className="text-xl font-semibold">3. Responsabilidades do Usuário</h2>
        <ul className="list-disc pl-6">
          <li>O usuário é responsável pelo uso adequado da plataforma e pelo cumprimento das leis aplicáveis.</li>
          <li>É proibido qualquer uso indevido do sistema, incluindo tentativas de acesso não autorizado, manipulação de dados ou uso para finalidades ilegais.</li>
        </ul>
      </section>
      
      <section className="mb-4">
        <h2 className="text-xl font-semibold">4. Coleta e Uso de Dados</h2>
        <ul className="list-disc pl-6">
          <li>Coletamos nome, e-mail e ONG de atuação do usuário.</li>
          <li>Esses dados são utilizados exclusivamente para identificação e autenticação no sistema.</li>
          <li>Nenhuma informação será compartilhada com terceiros.</li>
        </ul>
      </section>
      
      <section className="mb-4">
        <h2 className="text-xl font-semibold">5. Segurança</h2>
        <ul className="list-disc pl-6">
          <li>O CinConecta não armazena senhas dos usuários, enviamos a solicitação de login para o ConectaRecife</li>
          <li>As informações que temos são protegidas conforme as boas práticas de segurança da informação.</li>
        </ul>
      </section>
      
      <section className="mb-4">
        <h2 className="text-xl font-semibold">6. Encerramento de Conta</h2>
        <ul className="list-disc pl-6">
          <li>O usuário pode solicitar a exclusão de sua conta enviando um e-mail para o suporte.</li>
          <li>O CinConecta se reserva o direito de suspender ou excluir contas que violem estes termos.</li>
        </ul>
      </section>
      
      <section className="mb-4">
        <h2 className="text-xl font-semibold">7. Modificações nos Termos</h2>
        <p>O CinConecta pode atualizar estes Termos e Condições conforme necessário. Os usuários serão notificados sobre alterações relevantes.</p>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold">8. Contato</h2>
        <p>Para dúvidas ou solicitações, entre em contato com:</p>
        <ul className="list-disc pl-6">
          <li><strong>Nome:</strong> Wesley Silveira</li>
          <li><strong>E-mail:</strong> wslc@cin.ufpe.br</li>
        </ul>
      </section>

      <p className="mt-6">Ao utilizar a plataforma CinConecta, você confirma que leu e concorda com estes Termos e Condições de Uso.</p>
    </div>
    <Footer></Footer>    
    </div>
  );
};

export default TermosCondicoes;
