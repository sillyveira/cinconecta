require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGO_URI;

async function conectarMongoDB() {
  try {
    await mongoose.connect(MONGODB_URI, {});
    console.log('[SUCESSO] Conexão estabelecida com o banco');
  } catch (error) {
    if (error.name === 'MongooseServerSelectionError') {
      console.error('[ERRO] Falha na conexão com MongoDB:', error);
      console.log('Tentando reconectar em 5 segundos...');
      setTimeout(conectarMongoDB, 5000); 
    } else {
      console.error('[ERRO] Erro inesperado:', error);
      process.exit(1);
    }
  }
}

conectarMongoDB();

module.exports = mongoose;