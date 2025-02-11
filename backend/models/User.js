const mongoose = require('mongoose')

// Definindo esquema do usuário 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// Criando modelo do usuário
const User = mongoose.model('User', userSchema)

module.exports = User