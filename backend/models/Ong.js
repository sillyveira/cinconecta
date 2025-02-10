const mongoose = require('mongoose');

const ongSchema = new mongoose.Schema({
    id_gov: {
        type: Number,
        required: true,
        unique: true
    },
    nome: {
        type: String,
        required: true
    },
    ultima_auditoria: {
        type: Date,
        required: true,
        default: new Date()
    }
})

module.exports = mongoose.model('Ong', ongSchema, 'ongs');