// Controller para a análise de dados levando em conta os registros de auditoria e tabela de produtos.
const auditController = require('./auditController');
const productController = require('./productController');

const mongoose = require('mongoose');

const Product = require('../models/Product');
const Audit = require('../models/Audit');
const Ong = require('../models/Ong');


const retornarQuantidadeTotalItens = async(ongId) => {
    try{
        // Função do mongo para retornar o número de itens
        const contagemItens = await Product.countDocuments({
            id_ong: ongId
        });

        return contagemItens;
    
    } catch (err) {
        return -1;
    }
}

const valorEstimadoEstoque = async (ongId, dataInicio) => {
    try {
        // Essa função irá filtrar pela data e depois agrupar os registros, ao agrupar, somará o campo de valor.
        const resultado = await Product.aggregate([
            {
              $match: {
                id_ong: ongId
              }
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$valor" }
              }
            }
          ]);

          console.log(resultado[0]?.total);
        return resultado[0]?.total; 

    } catch (err) { // Em caso de erro
        console.log("[Erro]: ", err.message)
        return -1;
    }
}

const produtosProximosValidade = async(ongId) => {
    try{
        const tresMesesAtras = new Date();
        tresMesesAtras.setMonth(tresMesesAtras.getMonth() - 3);

        const produtosProximos = Product.find({
            id_ong: ongId,
            validade: {
                $gte: tresMesesAtras
            }
        });

        console.log(tresMesesAtras)
        return produtosProximos;
    } catch (err) {
        console.log("[Erro no cálculo da validade] ", err.message);
        return {};
    }
}

module.exports = {retornarQuantidadeTotalItens, valorEstimadoEstoque, produtosProximosValidade};
