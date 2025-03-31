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
const categoryRoutes = require('./routes/categoryRoutes');

// Importação do scheduler (timer programado para realizar ações automáticas)
const scheduler = require('./services/timerService');
scheduler.iniciarScheduler(60);

// Middleware para interpretar JSON
app.use(express.json());
const allowedOrigins = [
	'http://localhost',
	'http://localhost:5173',
	'http://localhost:3000',
	'http://localhost/cinconecta',
	'https://cinconecta-client', 
	'http://cinboraimpactar.cin.ufpe.br',
	'http://vm-cinboraimpactar.cin.ufpe.br',
	'https://cinboraimpactar.cin.ufpe.br',
	'https://vm-cinboraimpactar.cin.ufpe.br'
  ]
  
  app.use(cors({
	origin: function (origin, callback) {
	  if (!origin || allowedOrigins.includes(origin)) {
		callback(null, true)
	  } else {
		console.log('Blocked by CORS:', origin)
		callback(new Error('Not allowed by CORS'))
	  }
	},
	credentials: true
  }))
app.use(cookieParser()); //Para receber os cookies de token
app.set('trust proxy', 5);
app.use(rateLimit({ //Limitar requests a 300 por minuto 
	windowMs: 60000, // 0.01s
	limit: 300, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false,
  trustProxy: 5,
}))

// Rotas
app.use('/produtos', productRoutes); // Rotas produtos
app.use('/analise-dados', dataRoutes); // Rotas dados
app.use('/usuarios', userRoutes); // Rotas usuários
app.use('/auditoria', auditRoutes); // Rotas auditoria
app.use('/categorias', categoryRoutes); //Rotas categorias

// Inicia o servidor
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`[SERVIDOR RODANDO] na porta ${PORT}`);
});

module.exports = {app, server};
