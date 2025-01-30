const mongoose = require('mongoose')
const User = require('./User')

// Define scheme of category
const categorySchema = new mongoose.Schema({
    name_category: { type: String}, 
    id_category: { type: mongoose.Schema.Types.ObjectId }
})

const category = mongoose.model('Category', categorySchema)

// Define scheme of product
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

// Create the model of user 
const Product = mongoose.model('Product', productSchema)

 module.exports = Product