const mongoose = require('mongoose')



// Definindo esquema do produto
const productSchema = new mongoose.Schema ({

    id_categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: false,
    }, 

    id_usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        
    }, 

    nome: {
        type: String, 
        required: true,
    }, 
   
    descricao: {
        type: String,
        required: false
    }, 

    quantidade: {
        type: Number, 
        required: true
    }, 

    validade: {
        type: Date,
        required: false
    },

    valor: {
        type: Number,
        required: false
    },

    codbarras: {
        type: String,
        required: false
    }

})

// Criando modelo do produto
const Product = mongoose.model('Product', productSchema, 'produtos')

 module.exports = Product