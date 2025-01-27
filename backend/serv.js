const express = require('express') 
const app = express()
const router = require('../')


require('dotenv').config();  // Carrega as variáveis de .env


// Server on
app.listen(27017, () => {
    console.log("[SERVIDOR RODANDO]")
})

module.exports = express