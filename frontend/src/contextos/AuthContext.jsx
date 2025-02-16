import { createContext, useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const [username, setUsername] = useState(localStorage.getItem("username"));

  const navigate = useNavigate();

  // uso do useEffect para monitorar a mudança do localStorage. Caso mude, a variável de autenticação também muda.
  // dessa forma podemos alterar o estado da aplicação.
  useEffect(() => {
    const monitorarStorage = () => {
      setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true"); // Se não for estritamente igual a verdadeiro, retorna falso.
      setUsername(localStorage.getItem("username"));
    };

    window.addEventListener("storage", monitorarStorage); // Para monitorar a mudança do localStorage

    return () => {
      window.removeEventListener("storage", monitorarStorage);
    };
  }, []);

  const login = (nomeUsuario) => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
    localStorage.setItem("username", nomeUsuario);
    setUsername(nomeUsuario);
    navigate("/");
    toast.success(`O usuário ${nomeUsuario} foi logado com sucesso.`);
  };

  const logout = (logoutMessage) => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    localStorage.removeItem("username");
    setUsername("");
    navigate("/login");
    if (logoutMessage == "Expirado") {
      toast.error("A sua sessão expirou, logue novamente.");
    } else if (logoutMessage == "Logout") {
      toast.success("Você deslogou com sucesso!")
    } 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      <Toaster />
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
