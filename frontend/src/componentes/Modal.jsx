//componente modalimport React from "react";
import Modal from "react-modal";

function ProductModal({ closeModal }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-50">
      <div className="w-[500px] h-[500px] bg-white rounded-lg shadow-lg p-6 flex flex-col">
        <div className="flex justify-end">
          <button className="text-2xl bg-transparent border-none cursor-pointer" onClick={() => closeModal(false)}>X</button>
        </div>
        <div className="text-center mt-2">
          <h1 className="text-xl font-bold">Título Modal</h1>
        </div>
        <div className="flex-1 flex items-center justify-center text-2xl text-center">
          <p>Conteúdo do Modal</p>
        </div>
        <div className="flex justify-center items-center space-x-4 mt-4">
          <button
            className="w-36 h-12 bg-red-600 text-white rounded-lg text-lg cursor-pointer"
            onClick={() => closeModal(false)}>Cancelar
          </button>
          <button className="w-36 h-12 bg-blue-500 text-white rounded-lg text-lg cursor-pointer">Confirmar</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;