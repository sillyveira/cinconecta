const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')


// Rota POST para criar produtos
router.post("/criar-produto", productController.create_product)

// Rota POST para deletar produtos
// router.post("/Post_delete_product", productController.delete_product)

module.exports = router