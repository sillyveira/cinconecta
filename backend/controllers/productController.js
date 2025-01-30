const product = require('../models/Product')

// Controller to create a new product
exports.create_product = async (req, res, next) => {
    const { id, id_user, id_category, name, description, quantity, validity } = req.body
    
    // Check if the "name", "quantity", "description", and "validity" fields are provided
    if (!name || !quantity || !description || validity){
        return res.status(400).json({ 
            success: false,
            message: "All fields are required."
        })
    }

    try {
        // Create the product in the database
        await product.create({
            id, id_user, id_category, name, description, quantity, validity
        })
        return res.status(201).json({ success: true, message: "Product created successfully." })

    } catch(error) {
        console.error('Error creating product:', error); 
        res.status(500).json({ success: false, message: "Error creating product.", error: error.message })
    }
}

