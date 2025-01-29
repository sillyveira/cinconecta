// Importações e configuração do ambiente
require('dotenv').config(); // Carrega as variáveis de .env
const express = require('express');
const app = express();

// Importação de rotas
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

// Middleware para interpretar JSON
app.use(express.json());

// Rotas
app.use('/produtos', productRoutes); // Rotas produtos
app.use('/usuarios', userRoutes); // Rotas usuários

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`[SERVIDOR RODANDO] na porta ${PORT}`);
});

module.exports = app;
