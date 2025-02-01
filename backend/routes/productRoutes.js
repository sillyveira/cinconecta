const router = express.Router()
const productController = require('../controllers/productController')
const dateMiddleware = require('../middlewares/product_Middleware')

// Rota POST para criar produtos
router.post("/post_create_product", dateMiddleware.date_validity, productController.create_product)

// Rota POST para deletar produtos
router.post("/post_delete_product", productController.delete_product)

module.exports = router