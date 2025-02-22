import { createContext, useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";
import { analiseDados, buscarAuditoria, buscarCategorias, buscarEstoque } from "../servicos/DataAPI";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [Estoque, setEstoque] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const [Dados, setDados] = useState([]);
  const [carregandoDados, setCarregandoDados] = useState(false);

  const [Auditoria, setAuditoria] = useState([]);
  const [carregandoAuditoria, setCarregandoAuditoria] = useState(false);

  const [Categorias, setCategorias] = useState([]);
  const [carregandoCategorias, setCarregandoCategorias] = useState(false);
  

  const [erro, setErro] = useState(null);
  const { isAuthenticated, logout } = useAuth();

  const [filtroAtivo, setFiltroAtivo] = useState(false); // Nova flag para monitorar se o filtro está ativo

  const estoqueCarregado = useRef(false);
  useEffect(() => {
    if (!isAuthenticated) {
      setEstoque([]);
      setDados([]);
      setAuditoria([]);
      setCategorias([]);

      setFiltroAtivo(false);
      
      setCarregando(false);
      setCarregandoAuditoria(false);
      setCarregandoDados(false);
      setCarregandoCategorias(false);
    }
  }, [isAuthenticated]);

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

  const carregarDados = async () => {
    try {
      setCarregandoDados(true);
      const dados = await analiseDados(logout);
      setDados(dados);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregandoDados(false);
    }
  };

  const carregarAuditoria = async () => {
    try {
      setCarregandoAuditoria(true);
      const dados = await buscarAuditoria(logout);
      setAuditoria(dados);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregandoAuditoria(false);
    }
  };

  const carregarCategorias = async() => {
    try {
      console.log("As categorias serão carregadas.")
      setCarregandoCategorias(true);
      const dados = await buscarCategorias(logout);
      setCategorias(dados);
    } catch (error) {
      setErro(error.message)
    } finally {
      setCarregandoCategorias(false);
    }
  }

  useEffect(() => {
    if (!isAuthenticated) return;

    // Carregar Estoque se estiver vazio
    if (!estoqueCarregado.current && Estoque.length === 0 && !carregando) {
      carregarEstoque();
      estoqueCarregado.current = true
    }

    // Carregar Dados se estiver vazio
    if (Dados.length === 0 && !carregandoDados) {
      carregarDados();
    }

    // Carregar Auditoria se estiver vazio
    if (Auditoria.length === 0 && !carregandoAuditoria && !filtroAtivo) {
      carregarAuditoria();
      console.log("A função carregarAuditoria foi chamada.");
      console.log(filtroAtivo);
    }
  }, [isAuthenticated, Estoque, Dados, Auditoria, carregando, carregandoDados, carregandoAuditoria]);

  // Função de filtro com flag
  const aplicarFiltro = async (filtro) => {
    setFiltroAtivo(true); // Ativa o filtro

    try {
      setCarregandoAuditoria(true); // Ou outro estado se for outro tipo de dado
      const dadosFiltrados = await buscarAuditoria(logout, filtro); // Aqui você passa o filtro para o backend
      console.log(dadosFiltrados);
      if (dadosFiltrados.length === 0) {
        setAuditoria([]); // Se o filtro não retornar nada, limpa o estado
      } else {
        setAuditoria(dadosFiltrados); // Atualiza o estado com os dados filtrados
      }
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregandoAuditoria(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        Estoque,
        carregando,
        erro,
        carregarEstoque,
        Dados,
        Auditoria,
        setAuditoria,
        aplicarFiltro, // Expondo a função de filtro
        carregarCategorias,
        Categorias
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
