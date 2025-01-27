const mongoose = require('mongoose')

// Define Schema of user
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// Create the model of user 
const User = mongoose.model('User', userSchema)

module.exports = User