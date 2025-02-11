const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    
    id_categoria:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    nome_categoria: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Categoria', categorySchema)