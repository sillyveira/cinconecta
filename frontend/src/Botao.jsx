import "./index.css";
import {motion} from "framer-motion";

const Botao = ({ texto }) => {
  return (<div className="container">
    <motion.button
      className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-700"
      whileHover={{ scale: 1.1 }}
      whileTap={{scale: 0.9}}
      >
      {texto}
    </motion.button>
  </div>);
}

export default Botao;
