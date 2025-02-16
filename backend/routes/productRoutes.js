const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rota GET para visualizar produtos 
router.get("/", authMiddleware, productController.view_product)

// Rota POST para criar produtos
router.post("/criar-produto", authMiddleware, productController.create_product)

// Rota PUT para atualizar produtos
router.put("/atualizar-produto/:id", authMiddleware, productController.update_product)

// Rota POST para EXCLUIR produtos. Motivo: passar uma lista de IDS no body
router.post("/deletar-produto", authMiddleware, productController.delete_product)

module.exports = router