const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const auditController = require('../controllers/auditController');
const mongoose = require('mongoose')

router.get('/receber-logs', authMiddleware, async (req, res) =>{
    const tresDiasAtras = new Date()
    tresDiasAtras.setDate(tresDiasAtras.getDate() - 3)
    const acao = req.query.acao || false;
    const dataInicial = req.query.dataInicial || tresDiasAtras;
    const dataFinal = req.query.dataFinal || new Date();
    const nomeUsuario = req.query.nomeUsuario || false; 
    const idong = req.ongId; // Recebido pelo middleware de autenticação

    // Os parâmetros padrões são: todos os logs de três dias atrás.

    try {
        const logs = await auditController.getLogs(idong, acao, dataInicial, dataFinal, nomeUsuario);

        return res.status(200).json({
            message: 'Os logs foram recebidos com sucesso',
            logs: logs
        })
    } catch (err) {
        return res.status(401).json({
            message: 'Não foi possível receber os logs.',
            error: err.message
        })
    }
    

})

module.exports = router
