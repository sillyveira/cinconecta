const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    
    id_categoria:{
        type: mongoose.SchemaTypes.ObjectId, //TODO: id duplo no banco de dados (não sei se é o padrão)
        required: true,
        unique: true
    },
    nome_categoria: {
        type: String,
        required: true
    },
    id_ong: {
        type: mongoose.SchemaTypes.ObjectId,
        required: false,
        ref: 'Ong'
    }
})

module.exports = mongoose.model('Categoria', categorySchema)