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

router.post('/checar-logs', authMiddleware, async (req, res) => {
    try {
      const { userId, ongId } = req; // Certifique-se que o authMiddleware define isso no objeto req
      const dataInicio = new Date(2025, 1, 1);
      const result = await auditController.checarNovosLogs(ongId, dataInicio);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao checar logs' });
    }
  });

router.get("/membros", authMiddleware, userController.members);

module.exports = router
