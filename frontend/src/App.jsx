import {Route, Routes} from "react-router-dom"
import Inicio from "./paginas/Inicio.jsx";
import AnaliseGeral from "./paginas/AnaliseGeral.jsx";
import { Sidebar } from "./componentes/Sidebar.jsx";
import Estoque from "./paginas/Estoque.jsx";
import Perfil from "./paginas/Perfil.jsx";
import { motion } from "framer-motion";
import DropDownMenu from "./componentes/dropdownmenu.jsx";
import { useState } from "react";

const teste = [
  {valore: "hello kitty", title: "hello kitty"},
  {valore: "carro de mão", title: "carro de mão"},
  {valore: "cramulhão", title: "cramulhão"}
];

function App() {

  const [selectedValue, setSelectedValue] = useState("");

  const handleDropdownChange = (value) => {
    setSelectedValue(value);
    console.log("Valor selecionado:", value);
  };

  return (
  <>
  
  <div className="flex h-screen bg-gray-100 text-gray-200 overflow-hidden">
  
    <div className="z-10 w-full ml-20">
    <DropDownMenu variant="gray" opcoes={teste} label="Categorias*" onChange={handleDropdownChange} />
    <p className="text-black">Valor selecionado:{selectedValue}</p> {/*Testezinho vey */}
    <Routes>
    <Route path={'/'} element={<Inicio />} />
    <Route path={'/perfil'} element={<Perfil />} />
    <Route path={'/analise-geral'} element={<AnaliseGeral />} />
    <Route path={'/estoque'} element={<Estoque />} />
    </Routes>
    </div>
    <Sidebar />
    
  </div>
  
  </>);
}

export default App;
