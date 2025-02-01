const Product = require('../models/Product')
const product = require('../models/Product')

// Controoler para criar um novo produto
exports.create_product = async (req, res, next) => {
    const { id, id_user, id_category, name, description, quantity, validity } = req.body
    
        // Checa se "name", "quantity", "description", and "validity" foram preenchidos
        if (!name || !quantity || !description || validity){
            return res.status(400).json({ 
                success: false,
                message: "All fields are required."
            })
        }

        try {
            // Cria o produto no Banco de dados
            await product.create({
                id, id_user, id_category, name, description, quantity, validity
            })
            return res.status(201).json({ success: true, message: "Product created successfully." })

        } catch(error) {
            console.error('Error creating product:', error); 
            res.status(500).json({ success: false, message: "Error creating product.", error: error.message })
        }
    }

// Controller para deletar produto 
exports.delete_product = async (req, res) =>{   
    const nome = req.body.name

       
        try {   
            const cont_deletados = await Product.deleteOne({ name: nome }) // Deleta o produto com base no nome (provisóriamente)
            
            if(cont_deletados === 0) {
                return res.status(404).json({ success: false, message: "Product not found." }); // Se o produto não for encontrado
            }
            
            return res.status(204).json({ success: true, message: "Product deleted successfully."}) // Se o produto for encontrado e deletado
        
        } catch(error) {
            res.status(500).json({ success: false, message: "Error deleting product.", error: error.message}) // Caso aconteça algum erro ao deletar o produto
        }
    }