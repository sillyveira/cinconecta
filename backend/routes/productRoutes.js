const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rota POST para criar produtos
router.post("/criar-produto", authMiddleware, productController.create_product);
router.get("/get", authMiddleware, productController.get_product);
module.exports = router