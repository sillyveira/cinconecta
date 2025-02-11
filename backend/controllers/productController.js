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
