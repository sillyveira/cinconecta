import { createContext, useState, useEffect } from "react";
import {useAuth} from "./AuthContext"
import { buscarEstoque, graficoEntradaSaida } from "../servicos/DataAPI";
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
    }, [isAuthenticated]); // useEffect para reiniciar o estoque quando o usuário se desloga e loga novamente.
  
    const carregarEstoque = async () => {
      try {
        setCarregando(true);
        const produtos = await buscarEstoque(logout);
        setEstoque(produtos);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    };
  
    const carregarGrafico = async () => {
      try {
        setCarregandoGrafico(true);
        const grafico = await graficoEntradaSaida(logout);
        setGrafico(grafico);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregandoGrafico(false);
      }
    };  

    useEffect(() => {
      if (!isAuthenticated) return; // Não atualiza os dados se não estiver autenticado
  
      if (Estoque && Estoque.length === 0 && !carregando) {
        carregarEstoque();
      }
      if (Grafico && Grafico.length === 0 && !carregandoGrafico) {
        carregarGrafico();
      }
    }, [isAuthenticated, Estoque, Grafico, carregando, carregandoGrafico]); // Evita chamadas repetidas
    
  
    return (
      <DataContext.Provider value={{ Estoque, carregando, erro, carregarEstoque, Grafico }}>
        {children}
      </DataContext.Provider>
    );
  };

export default DataContext;
