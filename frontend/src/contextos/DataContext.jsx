import { createContext, useState, useEffect } from "react";
import {useAuth} from "./AuthContext"
const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [Estoque, setEstoque] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [carregandoGrafico, setCarregandoGrafico] = useState(false);
    const [Grafico, setGrafico] = useState([]);
    const [erro, setErro] = useState(null);
    const {isAuthenticated, logout} = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            setEstoque([]);
            setGrafico([]);
        }
    }, [isAuthenticated]);

    

    const buscarEstoque = async () => {
      try {
        setCarregando(true);
        const resposta = await fetch('http://localhost:3000/produtos/', {
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
        if (dados.message == "Token não está presente na solicitação." || dados.message == "O token é inválido ou está expirado."){
          logout("Expirado");
        }
        setEstoque(dados.produtos);
      } catch (error) {
        setErro(error);
      } finally {
        setCarregando(false);
      }
    };

    const graficoEntradaSaida = async () => {
      try {
          setCarregandoGrafico(true);
          const resposta = await fetch('http://localhost:3000/analise-dados/grafico-entrada-saida', {
              method: 'GET',
              credentials: 'include',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          if (!resposta.ok) {
              const errorData = await resposta.json(); // Tenta obter detalhes do erro do servidor
              throw new Error(`Erro na requisição: ${resposta.status} - ${errorData.message || resposta.statusText}`);
          }
          const dados = await resposta.json();
          if (dados.message == "Token não está presente na solicitação." || dados.message == "O token é inválido ou está expirado."){
              logout("Expirado");
          }
          setGrafico(dados.grafico);
          console.log("Dados do gráfico recebidos:", dados.grafico); // Verifique os dados recebidos
      } catch (error) {
          console.error("Erro ao buscar dados do gráfico:", error); // Exibe o erro no console
          setErro(error.message); // Define a mensagem de erro para ser exibida ao usuário
      } finally {
          setCarregandoGrafico(false);
      }
  };
  
    const recarregarEstoque = () => {
      setCarregando(true);
      setErro(null);
      buscarEstoque();
    };

    useEffect(() => {
      if (Estoque && Estoque.length === 0 && !carregando) {
        buscarEstoque();
      }
      if (Grafico && Grafico.length === 0 && !carregandoGrafico) {
        graficoEntradaSaida();
      }
    }, [isAuthenticated]);
  
    return (
      <DataContext.Provider value={{ Estoque, carregando, erro, recarregarEstoque, buscarEstoque, Grafico }}>
        {children}
      </DataContext.Provider>
    );
  };

export default DataContext;
