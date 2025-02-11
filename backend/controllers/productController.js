const Product = require('../models/Product')
const product = require('../models/Product')

// Controoler para criar um novo produto
exports.create_product = async (req, res, next) => {
    const { id_user, id_category, name, description, quantity, validity } = req.body
    
        // Checa se "name", "quantity", "description", and "validity" foram preenchidos
        if (!name || !quantity || !description || !validity){
            return res.status(400).json({ success: false, message: "All fields are required."
            })
        }

        try {
            // Cria o produto no Banco de dados
            await product.create({
                id_user, id_category, name, description, quantity, validity
            })
            return res.status(201).json({ success: true, message: "Product created successfully." })

        } catch(error) {
            console.error('Error creating product:', error); 
            res.status(500).json({ success: false, message: "Error creating product.", error: error.message })
        }
    }

// Controller para deletar produto 
exports.delete_product = async (req, res) =>{   
    const { id } = req.params
        try {   
            const Delete = await Product.deleteOne({ _id: id }) // Deleta o produto com base no seu id
            
            if(Delete.deletedCount === 0) {
                return res.status(404).json({ success: false, message: "Product not found." }); // Se o produto não for encontrado
                
            }
            
            return res.status(204).json({ success: true, message: "Product deleted successfully."}) // Se o produto for encontrado e deletado
        
        } catch(error) {
            res.status(500).json({ success: false, message: "Error deleting product.", error: error.message}) // Caso aconteça algum erro ao deletar o produto
        }
    }

exports.atualizar_product = async (req, res) => {
    const { id } = req.params
    const { id_category, name, description, quantity, validity} = req.body

    try{
        const product = await Product.findById(id)

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found." }); // Se o produto não for encontrado
        }

        product.id_category = id_category || product.id_category, 
        product.name = name || product.name, 
        product.description = description || product.description, 
        product.quantity = quantity || product.quantity,
        product.validity = validity || product.validity

        return res.status(204).json({ success: true, message: "Product updating successfully."}) // Se o produto for encontrado e deletado
    
    } catch(error) {
        console.error('Error updating product:', error)
        return res.status(500).json({ success: false, message: "Error updating product.", error: error.message})
    }

}

exports.vizu_product = async (req,res) => {
    const { id_user } = req.body

    try {
        
        const product = await Product.find({id_user: id_user})

        if (products.length === 0) {
            return res.status(404).json({ success: false, message: "Product not found." }); // Se o produto não for encontrado
        }


        return res.status(200).json({ success: true, product}) // Se o produto for encontrado 

    }catch(error) {
        console.error('Error v product:', error)
        return res.status(500).json({ success: false, message: "Error retrieving product.", error: error.message})
    }
}