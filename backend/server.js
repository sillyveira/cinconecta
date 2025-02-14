// Importações e configuração do ambiente
require('dotenv').config(); // Carrega as variáveis de .env
require('./models/Database'); // Inicializa o servidor 
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {rateLimit} = require('express-rate-limit');
// Importação de rotas
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const dataRoutes = require('./routes/dataRoutes');
const auditRoutes = require('./routes/auditRoutes');

// Importação do scheduler (timer programado para realizar ações automáticas)
const scheduler = require('./services/timerService');
scheduler.iniciarScheduler(10);

// Middleware para interpretar JSON
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser()); //Para receber os cookies de token
app.use(rateLimit({ //Limitar requests a 1 por 0.2 para evitar requests duplos.
	windowMs: 200, // 0.2s
	limit: 1, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 

}))

// Rotas
app.use('/produtos', productRoutes); // Rotas produtos
app.use('/analise-dados', dataRoutes); // Rotas dados
app.use('/usuarios', userRoutes); // Rotas usuários
app.use('/auditoria', auditRoutes); // Rotas auditoria

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`[SERVIDOR RODANDO] na porta ${PORT}`);
});

module.exports = app;
