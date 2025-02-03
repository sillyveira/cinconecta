import React from "react";
import Modal from "react-modal";

// Componente para o Modal de Filtros
export const FilterModal = ({ isOpen, onClose }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onClose} 
      className="w-80 bg-white rounded-lg p-5 shadow-lg mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="text-gray-800">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">Filtrar</h2>
          <button onClick={onClose} className="text-gray-500">✖</button>
        </div>
        <div className="mt-4">
          <select className="w-full p-2 border rounded mb-2">
            <option>Categoria</option>
          </select>
          <select className="w-full p-2 border rounded mb-2">
            <option>Validade</option>
          </select>
          <select className="w-full p-2 border rounded mb-4">
            <option>Ordenar por</option>
          </select>
          <button className="w-full bg-red-500 text-white p-2 rounded">Salvar</button>
        </div>
      </div>
    </Modal>
  );
};

// Componente para o Modal de Novo Produto
export const ProductModal = ({ isOpen, onClose }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onClose} 
      className="w-80 bg-white rounded-lg p-5 shadow-lg mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="text-gray-800">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">Novo produto</h2>
          <button onClick={onClose} className="text-gray-500">✖</button>
        </div>
        <div className="mt-4">
          <input className="w-full p-2 border rounded mb-2" placeholder="Nome" />
          <select className="w-full p-2 border rounded mb-2">
            <option>Categoria</option>
          </select>
          <select className="w-full p-2 border rounded mb-2">
            <option>Validade</option>
          </select>
          <input className="w-full p-2 border rounded mb-2" placeholder="Preço" />
          <input className="w-full p-2 border rounded mb-2" placeholder="Código de Barras" />
          <textarea className="w-full p-2 border rounded mb-4" placeholder="Descrição"></textarea>
          <button className="w-full bg-red-500 text-white p-2 rounded">Adicionar</button>
        </div>
      </div>
    </Modal>
  );
};
