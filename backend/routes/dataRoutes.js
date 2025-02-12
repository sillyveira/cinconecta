const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rota GET para a quantidade total de itens
router.get("/quantidade-total", authMiddleware, async (req, res) =>  {
    try {
        const quantidadeTotal = await dataController.retornarQuantidadeTotalItens(req.ongId)
        res.status(200).json({
            message: 'Análise feita com sucesso.',
            quantidade: quantidadeTotal
        })

    } catch (err) {
        res.status(200).json({
            message: 'Erro no retorno dos itens',
            error: err.message
        })
    }
})

// Rota GET para o valor do estoque (apenas os valores registrados)
router.get("/valor-estoque", authMiddleware, async (req, res) => {
    try {
        const valorEstoque = await dataController.valorEstimadoEstoque(req.ongId, '2024-01-01')
        res.status(200).json({
            message: 'Análise feita com sucesso.',
            valor: valorEstoque
        })

    } catch (err) {
        res.status(200).json({
            message: 'Erro no valor do estoque',
            error: err.message
        })
    }
})

// Rota GET para retornar produtos próximos a validade (3 meses)
router.get("/proximos-validade", authMiddleware, async (req, res) => {
    try {
        const produtosProximos = await dataController.produtosProximosValidade(req.ongId);
        res.status(200).json({
            message: 'Análise feita com sucesso.',
            produtos: produtosProximos
        });
    } catch (err) {
        res.status(500).json({
            message: 'Erro no retorno dos itens',
            error: err.message
        });
    }
})
module.exports = router