import {motion} from "framer-motion";

const Botao = ({ texto, onClick, className }) => {
  return (<div >
    <motion.button
      className={`bg-cor-primaria text-white px-4 py-2 rounded-[13px] cursor-pointer hover:bg-red-700 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{scale: 0.95}}
      onClick={onClick}
      >
      {texto}
    </motion.button>
  </div>);
}

export default Botao;
