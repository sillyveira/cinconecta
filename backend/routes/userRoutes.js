const express = require('express');
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', (req, res) => {
    res.send("Rota de usuários funcionando!")
})

router.post('/login', userController.login);

module.exports = router
