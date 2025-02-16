import {
  ArrowLeft,
  BarChart,
  Eye,
  Home,
  LucideArchive,
  Menu,
  User,
  LogOut
} from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../contextos/AuthContext";
const SIDEBAR_ITEMS = [
  {
    name: "Início",
    icon: Home,
    color: "#E2FCB3FF",
    href: "/",
  },
  {
    name: "Perfil",
    icon: User,
    color: "#FCB3B3FF",
    href: "/perfil",
  },
  {
    name: "Análise Geral",
    icon: BarChart,
    color: "#B5B3FCFF",
    href: "/analise-geral",
  },
  {
    name: "Estoque",
    icon: LucideArchive,
    color: "#FCFAB3FF",
    href: "/estoque",
  },
  {
    name: "Auditoria",
    icon: Eye,
    color: "#B3FCEBFF",
    href: "/auditoria",
  },
];

export const Sidebar = () => {
  const [SidebarAberta, setSidebarAberta] = useState(true);
  const navigate = useNavigate();
  const {logout} = useAuth();
  const funcaoLogout = async() => {
    try {
      const response = await fetch('http://localhost:3000/usuarios/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // alert(`O usuário foi deslogado.`);
        logout("Logout");
        
      } else {
        // Lide com erros de login (exiba uma mensagem de erro, etc.)
        console.error('Erro ao fazer logout');
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }
  return (
    <motion.div
      className={`fixed z-20 transition-all duration-0 ease-in-out flex-shrink-0 h-full ${
        SidebarAberta ? "w-64" : "w-20"
      }`}
      animate={{ width: SidebarAberta ? 256 : 80 }}
    >
      <div className="h-full bg-white bg-opacity-100 backdrop-blur-md p-4 flex-col border-r-2 border-gray-400 flex"> 
        <div className="flex w-full justify-end pr-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSidebarAberta(!SidebarAberta)}
            className="ml-3 rounded-full flex hover:bg-red-600 group hover:shadow-[0_0_0px_5px_rgba(220,38,38,1)]"
          >
            <Menu
              className={`text-black group-hover:text-white ${
                SidebarAberta ? "hidden" : ""
              }`}
            />
            <ArrowLeft
              className={`text-black group-hover:text-white ${
                SidebarAberta ? "" : "hidden"
              }`}
            />
          </motion.button>
        </div>
        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item, index) => {
            return (
              <Link key={item.href} to={item.href}>
                <motion.div
                  onClick={() => setSidebarAberta(false)}
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center p-4 text-sm font-medium rounded-2xl bg-gray-400 transition-colors mb-2 pr-9"
                >
                  <item.icon
                    size={20}
                    style={{ color: item.color, minWidth: "20px" }}
                  />
                  <p
                    className={`text-white whitespace-nowrap overflow-hidden pl-2 delay-100  ${
                      SidebarAberta ? "max-w-full opacity-100" : "max-w-0 opacity-0"
                    }`}
                  >
                    {item.name}
                  </p>
                </motion.div>
              </Link>
            );
          })}
        </nav>
        <div className="flex"> 
          <motion.div 
            onClick={
              () => {setSidebarAberta(false);
              funcaoLogout()}
            }
            whileHover={{ scale: 1.1 }}
            className="flex w-full items-center p-4 text-sm font-medium rounded-2xl bg-gray-400 transition-colors mb-2 pr-9"
          >
            <LogOut
              size={20}
              style={{ color: "#000000", minWidth: "20px" }}
            />
            <p
              className={`text-white whitespace-nowrap overflow-hidden pl-2 delay-100  ${
                SidebarAberta ? "max-w-full opacity-100" : "max-w-0 opacity-0"
              }`}
            >
              Sair
            </p>
          </motion.div>
        </div> 
      </div>
    </motion.div>
  );
};