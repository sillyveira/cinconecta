import React from "react";
import Modal from "react-modal";

export default function ModalCC({ titulo, isOpen, onClose, children }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white rounded-lg p-5 shadow-lg max-w-md w-full z-50 backdrop-blur-sm"
      overlayClassName="fixed inset-0 bg-black/30 b backdrop-blur-sm flex justify-center items-center z-40"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{titulo}</h2>
        {/* Botão do xis */}
        <h1 className="cursor-pointer font-semibold text-2xl" onClick={onClose}>x</h1>
      </div>
      {/* Linha horizontal */}
      <hr className="mt-2" />
      {/* Aqui fica o conteúdo do modal que é passado dentro da tag do modal. Exemplo no perfil.jsx */}
      <div className="overflow-y-auto max-h-[300px]">
      {children}
      </div>
    </Modal>
  );
}