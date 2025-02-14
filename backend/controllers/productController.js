const Product = require('../models/Product');
const mongoose = require('mongoose');
const auditController = require('../controllers/auditController');

// Controoler para criar um novo produto

exports.get_product = async (req, res) => {
    try {
        const id_ong = req.ongId;
        const find = await Product.find({ id_ong: id_ong });

        // Mapeia os resultados para preencher campos ausentes
        const produtosComValoresPadrao = find.map(produto => {
            return {
                _id: produto._id, // Mantém o _id do MongoDB
                id_categoria: produto.id_categoria || "", // "" se não existir
                id_ong: produto.id_ong, // Não altera o id_ong
                nome: produto.nome || "",
                descricao: produto.descricao || "",
                quantidade: produto.quantidade || 0, // 0 se não existir
                validade: produto.validade || "", // "" se não existir
                valor: produto.valor || 0, // 0 se não existir
                codbarras: produto.codbarras || ""
            };
        });

        res.status(200).json({
            message: "Funcionou.",
            produtos: produtosComValoresPadrao // Retorna o array modificado
        });

    } catch (err) {
        console.error(err); // Use console.error para erros
        res.status(500).json({
            message: err.message,
            produtos: [] // Em caso de erro, retorna um array vazio para evitar problemas no frontend
        });
    }
};
exports.create_product = async (req, res) => {
    const {id_categoria, nome, descricao, quantidade, validade, valor, codbarras } = req.body;
    const id_usuario = req.userId;
    const id_ong = req.ongId;
    const nome_usuario = req.nomeUsuario;

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
                id_ong: id_ong,
                id_categoria: id_categoria ? id_categoria : null, // Se id_categoria for fornecido, converte para ObjectId
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

                await auditController.criarLog('add', id_usuario, nome_usuario, id_ong, descricaoLog);
                console.log("O log do usuário [criar-produto] foi salvo.");
            } catch (err) {
                console.log("Não foi possível salvar o log do usuário.");
            }
            
            return res.status(201).json({ success: true, message: "Produto criado com sucesso." });
    
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            res.status(500).json({ success: false, message: "Erro ao criar produto.", error: error.message });
        }
    }
