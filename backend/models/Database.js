// Carregar variáveis de ambiente do arquivo .env
require('dotenv').config()

const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGO_URI 

// Estabelecendo conexão com o banco de dados
mongoose.connect(MONGO_URI, {
    useUnifiedTopology: true,
})
    .then(() => console.log("[SUCESSO] Conexão estabelecida com o banco"))
    .catch((err) => console.error("[ERRO] A conexão falhou: ", err))


module.exports = mongoose
