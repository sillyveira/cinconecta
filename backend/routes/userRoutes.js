const express = require('express');
const router = express.Router()

router.get('/', (req, res) => {
    res.send("Rota de usuários funcionando!")
    
})

module.exports = router
