const mongoose = require('mongoose')
const { trusted } = require('./Database')

// Schema do usuário
const userSchema = new mongoose.Schema({
    id_ong: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Ong'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    nome: {
        type: String,
        required: true,
    },
    data_ingresso: {
        type: Date, 
        required: true,
        default: new Date()
    },
    ultimo_login: {
        type: Date,
        required: false,
        default: new Date()
    }

})


const User = mongoose.model('User', userSchema, 'usuarios');

module.exports = User;