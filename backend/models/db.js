// Carregar variáveis de ambiente do arquivo .env
require('dotenv').config()

const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGO_URI //"meubanco" deverá ser substituído pelo nome do banco

// Estabelecendo conexão com o banco de dados
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("[SUCESS] Connection established"))
    .catch((err) => console.error("[ERROR] Connection failed: ", err))


module.exports = mongoose