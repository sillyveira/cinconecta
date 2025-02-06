const mongoose = require('mongoose')
const { trusted } = require('./Database')

// Schema do usuário
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


const User = mongoose.model('User', userSchema, 'usuarios');

module.exports = User;