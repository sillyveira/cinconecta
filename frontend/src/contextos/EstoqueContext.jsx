import { createContext, useState, useEffect } from "react";

const EstoqueContext = createContext();

export const EstoqueProvider = ({ children }) => {
    const [itens, setItens] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
  
    const buscarItens = async () => {
      try {
        const resposta = await fetch('http://localhost:3000/produtos/get', {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        if (!resposta.ok) {
          throw new Error(`Erro na requisição: ${resposta.status}`);
        }
        const dados = await resposta.json();
        setItens(dados.produtos);
      } catch (error) {
        setErro(error);
      } finally {
        setCarregando(false);
      }
    };
  
    useEffect(() => {
      buscarItens();
    }, []);
  
    const recarregarItens = () => {
      setCarregando(true);
      setErro(null);
      buscarItens();
    };
  
    return (
      <EstoqueContext.Provider value={{ itens, carregando, erro, recarregarItens }}>
        {children}
      </EstoqueContext.Provider>
    );
  };

export default EstoqueContext;
