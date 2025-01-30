
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