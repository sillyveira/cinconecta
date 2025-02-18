const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({

    nome_categoria: {
        type: String,
        required: true
    },
    id_ong: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'Ong'
    }
})

module.exports = mongoose.model('Categoria', categorySchema, 'categorias')