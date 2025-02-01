
// Middleware to validate the date
exports.date_validity = async (req, res, next) => {
    const { validity } = req.body 

    // Checa se o campo validade foi preenchido 
    if (!validity) {
        return res.status(400).json({ 
            success: false,
            message: "All fields are required."
        });
    }
    try {
        // Converte a data em um objeto Date
        const object_date = new Date(validity)
        
        // Checa se a data fornecida é valida 
        if (isNaN(object_date)){
            return res.status(400).json({ error: 'Invalid date' })
        }

        // Se nenhum erro for detectado passa pro próximo verificador
        next()
        
    // Em caso de erros inesperados
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        })
    }
}

