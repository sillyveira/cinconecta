import { motion } from "framer-motion";

const Botao = ({ texto, onClick, className, disabled }) => {
  return (
    <div>
      <motion.button
        className={`px-4 py-2 rounded-[13px] text-white cursor-pointer transition-colors
          ${disabled 
            ? "bg-gray-400 cursor-not-allowed"  // Estilo quando desativado
            : "bg-cor-primaria hover:bg-red-700"} 
          ${className}`}
        whileHover={disabled ? {} : { scale: 1.05 }}
        whileTap={disabled ? {} : { scale: 0.95 }}
        onClick={onClick}
        disabled={disabled}
      >
        {texto}
      </motion.button>
    </div>
  );
};

export default Botao;
