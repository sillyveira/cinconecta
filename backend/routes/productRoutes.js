const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rota GET para vizualizar produtos 
router.get("/vizualizar-produto", authMiddleware, productController.view_product)

// Rota POST para criar produtos
router.post("/criar-produto", authMiddleware, productController.create_product)

// Rota PUT para atualizar produtos
router.put("/atualizar-produto/:id", authMiddleware, productController.update_product)

// Rota POST para EXCLUIR produtos
router.post("/deletar-produto", authMiddleware, productController.delete_product)

module.exports = router