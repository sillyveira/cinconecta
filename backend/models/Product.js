const mongoose = require('mongoose')
const User = require('./User')


// Definindo esquema do produto
const productSchema = new mongoose.Schema ({
    _id : {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        unique: true
    }, 

    id_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    }, 

    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        
    }, 

    name: {
        type: String, 
        required: true,
    }, 
   
    description: {
        type: String,
        required: true
    }, 

    quantity: {
        type: Number, 
        required: true
    }, 

    validity: {
        type: Date,
        required: true
    }

})

// Criando modelo do produto
const Product = mongoose.model('Product', productSchema)

 module.exports = Product