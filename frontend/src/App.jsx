import { Route, Routes, Navigate } from "react-router-dom";
import Inicio from "./paginas/Inicio.jsx";
import AnaliseGeral from "./paginas/AnaliseGeral.jsx";
import { Sidebar } from "./componentes/Sidebar.jsx";
import Estoque from "./paginas/Estoque.jsx";
import Perfil from "./paginas/Perfil.jsx";
import Auditoria from "./paginas/Auditoria.jsx";
import Login from "./paginas/Login.jsx";
import PoliticaPrivacidade from "./paginas/PoliticaPrivacidade.jsx";
import { AuthProvider, useAuth } from "./contextos/AuthContext.jsx";
import { DataProvider } from "./contextos/DataContext.jsx";
import TermosCondicoes from "./paginas/TermosCondicoes.jsx";
function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex h-screen bg-white text-gray-200 overflow-hidden">
      <div className={`z-10 w-full ${isAuthenticated && 'ml-20'}`}>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Inicio /> : <Navigate to="/login" />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
          <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade/>} />
          <Route path="/termos-condicoes-uso" element={<TermosCondicoes/>} ></Route>
          <Route path="/perfil" element={isAuthenticated ? <Perfil /> : <Navigate to="/login" />} />
          <Route path="/analise-geral" element={isAuthenticated ? <AnaliseGeral /> : <Navigate to="/login" />} />
          <Route path="/estoque" element={isAuthenticated ? <Estoque /> : <Navigate to="/login" />} />
          <Route path="/auditoria" element={isAuthenticated ? <Auditoria /> : <Navigate to="/login" />} />
        </Routes>
      </div>
      {isAuthenticated && <Sidebar />}
    </div>

  );
}

function App() {
  return (

    <AuthProvider>
      <DataProvider>
        <AppRoutes />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
