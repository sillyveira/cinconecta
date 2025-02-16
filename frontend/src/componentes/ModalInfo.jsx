import { motion } from "framer-motion";
import React from "react";

const ModalInfo = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-transparent z-50">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="bg-white p-6 rounded-lg shadow-lg w-[30rem] text-black border border-gray-300 overflow-hidden"
      >
        {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Detalhes do Produto</h2>
        <button className="text-xl font-bold cursor-pointer" onClick={onClose} aria-label="Fechar modal">
          ×
        </button>
      </div>
      <hr className="my-3" />

        {/* Conteúdo */}
        <div className="break-words">
          <p><strong>ID:</strong> {product.id}</p>
          <p><strong>Nome:</strong> {product.name}</p>
          <p><strong>Categoria:</strong> {product.category}</p>
          <p><strong>Quantidade:</strong> {product.quantity}</p>
          <p><strong>Preço:</strong> {product.preco ? `R$ ${product.preco.toFixed(2)}` : "N/A"}</p>
          <p><strong>Validade:</strong> {product.validade}</p>
          <p><strong>Código:</strong> {product.codigo || "N/A"}</p>
         <p><strong>Descrição:</strong> {product.descricao || "N/A"}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ModalInfo;