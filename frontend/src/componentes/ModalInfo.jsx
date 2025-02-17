import { motion } from "framer-motion";
import React from "react";

const ModalInfo = ({ isOpen, onClose, produto }) => {
  if (!isOpen || !produto) return null;

  return (
    <ModalCC titulo={"Detalhes do produto"} isOpen={isOpen} onClose={onClose}>
      {/* Conteúdo */}
      <div className="break-words">
        <p>
          <strong>ID:</strong> {produto._id}
        </p>
        <p>
          <strong>Nome:</strong> {produto.nome}
        </p>
        <p>
          <strong>Categoria:</strong> {produto.categoria}
        </p>
        <p>
          <strong>Quantidade:</strong> {produto.quantidade}
        </p>
        <p>
          <strong>Preço:</strong>{" "}
          {produto.valor ? `R$ ${produto.valor.toFixed(2)}` : "N/A"}
        </p>
        <p>
          <strong>Validade:</strong> {produto.validade}
        </p>
        <p>
          <strong>Código:</strong> {produto.codbarras || "N/A"}
        </p>
        <p>
          <strong>Descrição:</strong> {produto.descricao || "N/A"}
        </p>
      </div>
    </ModalCC>
  );
};

export default ModalInfo;
