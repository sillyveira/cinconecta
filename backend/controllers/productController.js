const Product = require('../models/Product');
const mongoose = require('mongoose');
const auditController = require('../controllers/auditController');

// Controoler para criar um novo produto
exports.create_product = async (req, res) => {
    const {id_categoria, nome, descricao, quantidade, validade, valor, codbarras } = req.body
    const id_usuario = req.userId

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
            const novoProduto = new Product({
                id_usuario: new mongoose.Types.ObjectId(id_usuario), // Converte para ObjectId tentar depois: mongoose.Types.ObjectId.createFromHexString(userId)
                id_categoria: id_categoria ? new mongoose.Types.ObjectId(id_categoria) : null, // Se id_categoria for fornecido, converte para ObjectId
                nome: nome,
                descricao: descricao || null,
                quantidade: quantidade,
                validade: validade || null,
                valor: valor || null,
                codbarras: codbarras || null
            })
            await novoProduto.save();
            
            try { //Tentativa de salvar o log de auditoria
                const descricaoLog = {
                    novoProduto: novoProduto.toObject(),
                    quantidade: novoProduto.quantidade,
                    valor: novoProduto.valor || ""
                }

                await auditController.criarLog('add', id_usuario, descricaoLog);
                console.log("O log do usuário [criar-produto] foi salvo.")
            } catch (err) {
                console.log("Não foi possível salvar o log do usuário.")
            }
            
            return res.status(201).json({ success: true, message: "Produto criado com sucesso." });
    
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            res.status(500).json({ success: false, message: "Erro ao criar produto.", error: error.message });
        }
    }

exports.update_product = async (req, res) => {
    const { id } = req.params; // Extrai o ID do produto da URL
    const { id_categoria, nome, descricao, quantidade, validade, valor, codbarras } = req.body
    const id_usuario = req.userId 
    
    // Validação de campos obrigatórios
    if (!nome || !id_usuario || !quantidade) {
        return res.status(400).json({
            success: false, 
            message: "Todos os campos são necessários." 
        });
    }
    
    // Validação do ID do produto
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false, 
            message: "ID do produto inválido." 
        });
    }
    
    // Validação do ID do usuário
    if (!mongoose.Types.ObjectId.isValid(id_usuario)) {
        return res.status(400).json({
            success: false,
            message: "ID do usuário inválido." 
        });
    }
    
    // Validação do ID da categoria (se fornecido)
    if (id_categoria && !mongoose.Types.ObjectId.isValid(id_categoria)) {
        return res.status(400).json({
            success: false, 
            message: "ID da categoria inválido." 
        });
    }
    
    try {
        // Cria um objeto com os dados a serem atualizados
        const atualizando_dados = {
            nome, 
            descricao: descricao || null, // Define descricao como null se não for fornecida
            quantidade, 
            validade: validade || null, // Define validade como null se não for fornecida
            valor: valor || null, // Define valor como null se não for fornecida
            codbarras: codbarras || null // Define codbarras como null se não for fornecida
        };
    
        // Se id_categoria for fornecido, adiciona ao objeto de atualização
        if (id_categoria) {
            atualizando_dados.id_categoria = new mongoose.Types.ObjectId(id_categoria); // Converte o ID da categoria para ObjectId
        }
    
        // Atualiza o produto no banco de dados
        const atualizar_produto = await Product.findByIdAndUpdate(
            id, // ID do produto a ser atualizado
            atualizando_dados, // Dados a serem atualizados
            { new: true } // Retorna o documento atualizado
        );
    
        // Verifica se o produto foi encontrado e atualizado
        if (!atualizar_produto) {
            return res.status(404).json({
                success: false,
                message: "Produto não encontrado." 
            });
        }
    
        // Retorna sucesso e os dados do produto atualizado
        return res.status(200).json({
            success: true,
            message: "Produto atualizado com sucesso.",
            produto: atualizar_produto // Retorna o produto atualizado
        });
    } catch (error) {
        // Captura e trata erros inesperados
        console.error("Erro ao atualizar produto.", error); 
        res.status(500).json({
            success: false,
            message: "Erro ao atualizar produto.", 
            error: error.message 
        });
    }
}   