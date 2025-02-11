const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rota POST para criar produtos
router.post("/criar-produto", authMiddleware, productController.create_product)

module.exports = router