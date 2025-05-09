import React from "react";
import Modal from "react-modal";

export default function ModalConfirmacao({ 
  isOpen, 
  onClose, 
  onConfirm, 
  quantidadeItens 
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onClose(quantidadeItens)}
      className="bg-white rounded-lg p-5 shadow-lg max-w-md w-full z-50 backdrop-blur-sm"
      overlayClassName="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-40"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Confirmar remoção</h2>
        <button 
          className="cursor-pointer font-semibold text-2xl" 
          onClick={() => onClose(quantidadeItens)}
        >
          ×
        </button>
      </div>

      {/* Linha separadora */}
      <hr className="mt-2" />

      {/* Mensagem de confirmação */}
      <p className="text-gray-700 text-center mt-3">
        Tem certeza que deseja apagar todos os <strong>{quantidadeItens}</strong> itens selecionados?
        Essa ação é irreversível, mas você pode checar a informação dos itens apagados no campo de auditoria.
      </p>

      {/* Botões de ação */}
      <div className="flex justify-center gap-4 mt-5">
        <button 
          onClick={onConfirm} 
          className="cursor-pointer px-5 py-2 border-2 border-black rounded-lg bg-red-500 hover:bg-red-400 transition text-white"
        >
          Sim
        </button>
        <button 
          onClick={() => onClose(quantidadeItens)} 
          className="cursor-pointer px-5 py-2 border-2 border-black rounded-lg hover:bg-gray-200 transition"
        >
          Não
        </button>
      </div>
    </Modal>
  );
}
