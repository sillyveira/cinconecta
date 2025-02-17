import { motion } from "framer-motion";
import React from "react";
import ModalCC from "./Modal";

const ModalInfo = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  return (
    <ModalCC titulo={"Detalhes do produto"} isOpen={isOpen} onClose={onClose}>
      {/* Conteúdo */}
      <div className="break-words pt-4">
        <p>
          <strong>ID:</strong> {product.id}
        </p>
        <p>
          <strong>Nome:</strong> {product.name}
        </p>
        <p>
          <strong>Categoria:</strong> {product.category}
        </p>
        <p>
          <strong>Quantidade:</strong> {product.quantity}
        </p>
        <p>
          <strong>Preço:</strong>{" "}
          {product.preco ? `R$ ${product.preco.toFixed(2)}` : "N/A"}
        </p>
        <p>
          <strong>Validade:</strong> {product.validade}
        </p>
        <p>
          <strong>Código:</strong> {product.codigo || "N/A"}
        </p>
        <p>
          <strong>Descrição:</strong> {product.descricao || "N/A"}
        </p>
      </div>
    </ModalCC>
  );
};

export default ModalInfo;
