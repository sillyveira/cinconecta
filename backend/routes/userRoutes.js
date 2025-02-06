const express = require('express');
const router = express.Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')
const auditController = require('../controllers/auditController')


router.get('/', (req, res) => {
    res.send("Rota de usuários funcionando!")
})

router.post('/login', userController.login);

router.post('/logout', authMiddleware, userController.logout);

router.post('/checar-logs', authMiddleware, (req, res) => auditController.checarNovosLogs(req.userId))
module.exports = router
