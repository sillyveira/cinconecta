// Importações e configuração do ambiente
require('dotenv').config(); // Carrega as variáveis de .env
const express = require('express');
const app = express();

// Importação de rotas
const getRoutes = require('./routes/productRoutes');
const postRoutes = require('./routes/userRoutes');

// Middleware para interpretar JSON
app.use(express.json());

// Rotas
app.use('/api/get', getRoutes); // Rotas GET
app.use('/api/post', postRoutes); // Rotas POST

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`[SERVIDOR RODANDO] na porta ${PORT}`);
});

module.exports = app;
