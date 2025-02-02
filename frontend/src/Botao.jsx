import "./index.css";
import {motion} from "framer-motion";

const Botao = ({ texto }) => {
  return (<div className="container">
    <motion.button className="botao-vermelho" whileHover={{ scale: 1.2 }}>{texto}</motion.button>
  </div>);
}

export default Botao;