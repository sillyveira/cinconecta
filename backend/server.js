// Importações e configuração do ambiente
require('dotenv').config(); // Carrega as variáveis de .env
require('./models/Database'); // Inicializa o servidor 
const express = require('express');
const app = express();

// Importação de rotas
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

// Importação do scheduler (timer programado para realizar ações automáticas)
const scheduler = require('./services/timerService');
scheduler.iniciarScheduler(10);

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
