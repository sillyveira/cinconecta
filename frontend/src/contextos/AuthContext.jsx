import { createContext, useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { getMembers } from "../servicos/AuthAPI";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const [username, setUsername] = useState(localStorage.getItem("username"));
  
  const [ongName, setOngName] = useState(localStorage.getItem("ongname"));
  const [email, setEmail] = useState(localStorage.getItem("email"));

  const [ongMembers, setOngMembers] = useState([]);
  const navigate = useNavigate();

  // uso do useEffect para monitorar a mudança do localStorage. Caso mude, a variável de autenticação também muda.
  // dessa forma podemos alterar o estado da aplicação.
  useEffect(() => {
    const monitorarStorage = () => {
      setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true"); // Se não for estritamente igual a verdadeiro, retorna falso.
      setUsername(localStorage.getItem("username"));
      setEmail(localStorage.getItem("email"));
      setOngName(localStorage.getItem("ongname"));
    };

    window.addEventListener("storage", monitorarStorage); // Para monitorar a mudança do localStorage

    return () => {
      window.removeEventListener("storage", monitorarStorage);
    };
  }, []);

  useEffect(() => {
    getOngMembers();
  }, [isAuthenticated])

  const login = (nomeUsuario, nomeOng, emailUsuario) => {
    
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
    localStorage.setItem("username", nomeUsuario);
    localStorage.setItem("email", emailUsuario);
    localStorage.setItem("ongname", nomeOng);
    setOngName(nomeOng);
    setEmail(emailUsuario)
    setUsername(nomeUsuario);
    navigate("/");
    toast.success(`O usuário ${nomeUsuario} foi logado com sucesso.`);
  };

  const logout = (logoutMessage) => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    setOngName("");
    setOngMembers([]);
    setEmail("");
    localStorage.removeItem("username");
    localStorage.removeItem("ongname")
    localStorage.removeItem("email");
    setUsername("");
    navigate("/login");
    toast.dismiss();
    if (logoutMessage == "Expirado") {
      toast.error("A sua sessão expirou, logue novamente.");
    } else if (logoutMessage == "Logout") {
      toast.success("Você deslogou com sucesso!")
    } else if (logoutMessage == "Timeout") {
      toast.error("Não foi possível se conectar ao servidor.")
    }
  };

  const getOngMembers = async() => {
    const membros = await getMembers();
    setOngMembers(membros);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout, ongMembers, ongName, email }}>
      <Toaster />
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
