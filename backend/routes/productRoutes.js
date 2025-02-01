const express = require('express');
const router = express.Router();

// Exemplo de rota
router.get('/', (req, res) => {
  res.send('Rota de produtos funcionando!');
});

module.exports = router;