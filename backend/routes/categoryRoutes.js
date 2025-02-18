const express = require('express')
const router = express.Router()
const controller = require('../controllers/categoryController')
const auth = require('../middlewares/authMiddleware')

router.post('/criar-categoria', auth, controller.createCategories)

router.get('/', auth, controller.getCategories)

router.put('/atualizar-categoria/:id_categoria', auth, controller.updateCategories)

router.delete('/deletar-categoria/:id_categoria', auth, controller.deleteCategories)

module.exports = router