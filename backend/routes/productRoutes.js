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


module.exports = router