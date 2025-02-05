const express = require('express');
const router = express.Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', (req, res) => {
    res.send("Rota de usuários funcionando!")
})

router.post('/login', userController.login);

router.post('/logout', authMiddleware, userController.logout);

module.exports = router
