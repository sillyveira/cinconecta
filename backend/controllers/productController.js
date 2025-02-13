const Product = require("../models/Product");
const mongoose = require("mongoose");
const auditController = require("../controllers/auditController");




// Controller para criar um novo produto
exports.create_product = async (req, res) => {
  const {
    id_categoria,
    nome,
    descricao,
    quantidade,
    validade,
    valor,
    codbarras,
  } = req.body;
  const id_usuario = req.userId;
  const id_ong = req.ongId;
  const nome_usuario = req.nomeUsuario;

  // Checa se "name", "quantidade", "descricao", and "validade" foram preenchidos
  if (!nome || !quantidade || !id_usuario) {
    return res.status(400).json({
      success: false,
      message: "Todos os campos são necessários.",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(id_usuario)) {
    return res.status(400).json({
      success: false,
      message: "ID de usuário inválido.",
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
      codbarras: codbarras || null,
    });
    await novoProduto.save();

    try {
      //Tentativa de salvar o log de auditoria
      const descricaoLog = {
        novoProduto: novoProduto.toObject(),
        quantidade: novoProduto.quantidade,
        valor: novoProduto.valor || "",
      };

      await auditController.criarLog(
        "add",
        id_usuario,
        nome_usuario,
        id_ong,
        descricaoLog
      );
      console.log("O log do usuário [criar-produto] foi salvo.");
    } catch (err) {
      console.log("Não foi possível salvar o log do usuário.");
    }

    return res
      .status(201)
      .json({ success: true, message: "Produto criado com sucesso." });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Erro ao criar produto.",
        error: error.message,
      });
  }
};

// Controller para atualizar produtos
exports.update_product = async (req, res) => {
  const { id } = req.params; // Extrai o ID do produto da URL
  const {
    id_categoria,
    nome,
    descricao,
    quantidade,
    validade,
    valor,
    codbarras,
  } = req.body;
  const id_usuario = req.userId;
  const id_ong = req.ongId;
  const nome_usuario = req.nomeUsuario

  try {
    // Cria um objeto com os dados a serem atualizados
    const atualizando_dados = {
      nome: nome,
      id_categoria: id_categoria || undefined,
      descricao: descricao || undefined,
      quantidade: quantidade,
      validade: validade || undefined,
      valor: valor || undefined,
      codbarras: codbarras || undefined,
    };

    // Atualiza o produto no banco de dados
    const atualizar_produto = await Product.findOneAndUpdate(
      { _id: id, id_ong: id_ong }, // Condição de filtro (encontrar pelo id do produto e id da ONG)
      atualizando_dados // Dados a serem atualizados
      // Retorna o documento atualizado
    );

    // Verifica se o produto foi encontrado e atualizado
    if (!atualizar_produto) {
      return res.status(404).json({
        success: false,
        message: "Produto não encontrado.",
      });
    }

    // Adiciona o novo e o antigo produto ao log:
    try {
        const novoProduto = parseDataTypes(atualizando_dados)
        const mudancas = getAlteracoes(atualizar_produto, novoProduto);
        const descricaoLog = {
            produto: atualizar_produto,
            alteracoes: mudancas,
            quantidade: (parseInt(novoProduto.quantidade) ?? 0) - (parseInt(atualizar_produto.quantidade) ?? 0),
            valor: (parseInt(novoProduto.valor) ?? 0) - (parseInt(atualizar_produto.valor) ?? 0)
        };
      await auditController.criarLog("att", id_usuario, nome_usuario, id_ong, descricaoLog);

    } catch (err) {
      console.log("Não foi possível salvar o log do usuário.");
      console.log(err);
    }

    // Retorna sucesso e os dados do produto atualizado
    return res.status(200).json({
      success: true,
      message: "Produto atualizado com sucesso.",
    });
  } catch (error) {
    // Captura e trata erros inesperados
    console.error("Erro ao atualizar produto.", error);
    res.status(500).json({
      success: false,
      message: "Erro ao atualizar produto.",
      error: error.message,
    });
  }
};

// Funções para receber as alterações no update de produtos e fazer um log de auditoria.

function getAlteracoes(antigoProduto, novoProduto) {
    const mudancas = {};

    for (const key in novoProduto) {
        let valorAntigo = antigoProduto[key];
        let valorNovo = novoProduto[key];

        // Se for Date, converte para ISO string
        if (valorAntigo instanceof Date) {
            valorAntigo = valorAntigo.toISOString();
        }
        if (valorNovo instanceof Date) {
            valorNovo = valorNovo.toISOString();
        }

        // Converte tudo para string para evitar diferenças de tipo
        valorAntigo = valorAntigo != null ? valorAntigo.toString() : null;
        valorNovo = valorNovo != null ? valorNovo.toString() : null;

        if (valorNovo !== valorAntigo) {
            mudancas[key] = novoProduto[key];
        }
    }

    return mudancas;
}


function parseDataTypes(dados) {
    return {
        ...dados,
        id_categoria: mongoose.Types.ObjectId.isValid(dados.id_categoria)
            ? dados.id_categoria.toString()
            : null
    };
}