const express = require('express')
const router = express.Router()
const controller = require('../controllers/categoryController')

router.post('/criar-categoria', controller.createCategories)

router.get('/', controller.getCategories)

router.put('/atualizar-categoria/:id_categoria', controller.updateCategories)

router.delete('/deletar-categoria/:id_categoria', controller.deleteCategories)

module.exports = router