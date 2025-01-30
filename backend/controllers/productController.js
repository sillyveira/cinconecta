const product = require('../models/Product')

// Middleware to validate the date
exports.date_validity = async (req, res, next) => {
    const { validity } = req.body 

    // Check if the "validity" field was provided
    if (!validity) {
        return res.status(400).json({ 
            success: false,
            message: "All fields are required."
        });
    }
    try {
        // Attempt to convert the provided value into a date
        const object_date = new Date(validity)
        
        // Check if the value can be converted to a valid date
        if (isNaN(object_date)){
            return res.status(400).json({ error: 'Invalid date' })
        }

        // If no errors are detected, proceed to the next middleware
        next()
        
    // Catch any unexpected errors
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
}

// Controller to create a new product
exports.create_product = async (req, res, next) => {
    const { id, id_user, id_category, name, description, quantity, validity } = req.body
    
    // Check if the "name", "quantity", "description", and "validity" fields are provided
    if (!name || !quantity || !description){
        return res.status(400).json({ 
            success: false,
            message: "All fields are required."
        })
    }

    try {
        // Create the product in the database
        await product.create({
            id, id_user, id_category, name, description, quantity
        })
        return res.status(201).json({ success: true, message: "Product created successfully." })

    } catch(error) {
        console.error('Error creating product:', error); 
        res.status(500).json({ success: false, message: "Error creating product.", error: error.message })
    }
}

let verifi = 9