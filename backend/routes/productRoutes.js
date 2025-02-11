<<<<<<< HEAD
const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const dateMiddleware = require('../middlewares/product_Middleware')

router.get("/", (req, res) => {
    res.send("teste")
})

// Rota POST para criar produtos
router.post("/criar_produto", dateMiddleware.date_validity, productController.create_product)

// Rota DELETE para deletar produtos
router.delete("/:id", productController.delete_product)

// Rota PUT para atualizar produto
router.put("/update_product/:id", productController.atualizar_product)

// Rota GET para visualizar produto

router.get("/vizu_product", productController.vizu_product)

=======
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rota POST para criar produtos
router.post("/criar-produto", authMiddleware, productController.create_product)
>>>>>>> 87e721bfdfc2c2580e99d3eb0ec8ff54eb5dfa71

module.exports = router