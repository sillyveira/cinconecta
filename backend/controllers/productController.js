const Product = require('../models/Product')
const mongoose = require('mongoose')

// Controoler para criar um novo produto
exports.create_product = async (req, res) => {
    const {id_usuario, id_categoria, nome, descricao, quantidade, validade, preco, codbarras } = req.body
    
        // Checa se "name", "quantidade", "descricao", and "validade" foram preenchidos
        if (!nome || !quantidade || !id_usuario){
            return res.status(400).json({ 
                success: false,
                message: "Todos os campos são necessários."
            })
        }

        if (!mongoose.Types.ObjectId.isValid(id_usuario)) {
            return res.status(400).json({
                success: false,
                message: "ID de usuário inválido."
            });
        }
    
        try {
            // Cria o produto no Banco de dados
            await Product.create({
                id_usuario: new mongoose.Types.ObjectId(id_usuario), // Converte para ObjectId
                id_categoria: id_categoria ? new mongoose.Types.ObjectId(id_categoria) : null, // Se id_categoria for fornecido, converte para ObjectId
                nome: nome,
                descricao: descricao || null,
                quantidade: quantidade,
                validade: validade || null,
                preco: preco || null,
                codbarras: codbarras || null
            });
    
            return res.status(201).json({ success: true, message: "Produto criado com sucesso." });
    
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            res.status(500).json({ success: false, message: "Erro ao criar produto.", error: error.message });
        }
    }

// Controller para deletar produto 
 exports.delete_product = async (req, res) =>{   
     const { id_usuario } = req.params
       
         try {   
             const cont_deletados = await Product.deleteOne({ id_usuario: id_usuario }) // Deleta o produto com base no nome (provisóriamente)
            
             if(cont_deletados.deletedCount === 0) {
                 return res.status(404).json({ success: false, message: "Product not found." }); // Se o produto não for encontrado
             }
            
             return res.status(204).json({ success: true, message: "Product deleted successfully."}) // Se o produto for encontrado e deletado
        
         } catch(error) {
             res.status(500).json({ success: false, message: "Error deleting product.", error: error.message}) // Caso aconteça algum erro ao deletar o produto
         }
     }

exports.atualizar_produto = async (req, res) => {
    const {nome, descricao, quantidade, preco} = req.body

    



}