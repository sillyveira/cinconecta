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

router.get("/produto-por-categoria", authMiddleware, async (req, res) => {
    try {
        const produtoPorCategoria = await dataController.ProdutosPorCategoria(req.ongId);
        res.status(200).json({
            message: 'Análise feita com sucesso.',
            produtos: produtoPorCategoria
        });
    } catch (err) {
        res.status(500).json({
            message: 'Erro no retorno dos itens',
            error: err.message
        });
    }
})

router.get("/grafico-entrada-saida", authMiddleware, async(req, res) => {
    try{
        const entradaSaida = await dataController.graficoEntradaSaida(req.ongId);
        return res.status(200).json({
            message: 'Análise feita com sucesso.',
            grafico: entradaSaida
        })
    } catch (err) {
        res.status(500).json({
            message: 'Erro no retorno do gráfico.',
            error: err.message
        })
    }
})

router.get("/grafico-valor", authMiddleware, async(req, res) => {
    try{
        const valor = await dataController.graficoValor(req.ongId);
        return res.status(200).json({
            message: 'Análise feita com sucesso.',
            grafico: valor
        })
    } catch (err) {
        res.status(500).json({
            message: 'Erro no retorno do gráfico.',
            error: err.message
        })
    }
})

router.get("/dados", authMiddleware, async (req, res) => {
    try{
        const entradaSaida = await dataController.graficoEntradaSaida(req.ongId);
        const resultadoGraficoValor = await dataController.graficoValor(req.ongId);
        const produtosProximos = await dataController.produtosProximosValidade(req.ongId);
        const valorEstoque = await dataController.valorEstimadoEstoque(req.ongId, '2024-01-01')
        const quantidadeTotal = await dataController.retornarQuantidadeTotalItens(req.ongId)
        const produtoPorCategoria = await dataController.ProdutosPorCategoria(req.ongId);

        return res.status(200).json({
            message: 'Análise feita com sucesso.',
            graficovalor: resultadoGraficoValor,
            grafico: entradaSaida,
            produtosproximos: produtosProximos,
            valorestoque: valorEstoque,
            quantidadetotal: quantidadeTotal,
            produtoporcategoria: produtoPorCategoria
        })
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            message: 'Erro no retorno dos dados.',
            error: err.message
        })
    }
})
module.exports = router