const User = require('../models/User')
const bcrypt = require('bcrypt')
const saltRounds = 10

exports.createUser = (req, res) => {
    const {name, email, password} = req.body // Capture the values in name, email and password
    
    // Validate required fields
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required."});
    }
    
    bcrypt.hash(password, saltRounds, function(err, hashedPassword){
        if (err){
            console.error('Error hashing password:', err);
            return res.status(500).json({ success: false, message: "Error processing the request." });
        }
        
        // Create user in the database
        User.create({
            name, 
            email, 
            password: hashedPassword
        }).then(() => {
            res.status(201).json({ success: true, message: "User created successfully." });
        
        }).catch((error) => {
            console.error('Error creating user:', error);
            res.status(500).json({ 
                success: false, 
                message: "Error creating user.",
                error: error.message 
            });
        })
    }) 
}