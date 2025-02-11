const mongoose = require('mongoose')
const { trusted } = require('./Database')

<<<<<<< HEAD
// Definindo esquema do usuário 
=======
// Schema do usuário
>>>>>>> 87e721bfdfc2c2580e99d3eb0ec8ff54eb5dfa71
const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        unique: trusted
    },
    data_ingresso: {
        type: Date, 
        required: true,
        default: Date.now
    },
    ultimo_login: {
        type: Date,
        required: false
    }

    //TODO: inserir ultimo_login no código
})

<<<<<<< HEAD
// Criando modelo do usuário
const User = mongoose.model('User', userSchema)
=======
>>>>>>> 87e721bfdfc2c2580e99d3eb0ec8ff54eb5dfa71

const User = mongoose.model('User', userSchema, 'usuarios');

module.exports = User;