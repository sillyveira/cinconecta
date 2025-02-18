const Product = require("../models/Product");
const Category = require("../models/Category")
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
        entrada: novoProduto.quantidade, //Para a análise de entrada e saída do estoque
        saida: 0,
        valor: novoProduto.valor || 0,
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

    return res.status(200).json({ success: true, message: "Produto criado com sucesso." });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({
        success: false,
        message: "Erro ao criar produto.",
        error: error.message,
      });
  }
};

//Controller para excluir produtos
exports.delete_product = async (req, res) => {
  const { ids } = req.body;
  const id_ong = req.ongId;
  const id_usuario = req.userId;
  const nome_usuario = req.nomeUsuario

  // Verifica se a lista de IDs foi enviada e se é um array válido
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({
      success: false,
      message: "A lista de IDs é obrigatória e deve conter pelo menos um ID.",
    });
  }

  // Filtra apenas os IDs válidos (ObjectId do MongoDB)
  const ids_validos = ids.filter((id) => mongoose.Types.ObjectId.isValid(id));

  if (ids_validos.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Nenhum ID válido foi fornecido",
    });
  }

  try {
    // Puxa os itens para adicioná-los ao log:
    const infoDeletados = await Product.find({
      _id: { $in: ids_validos },
      id_ong: id_ong,
    });

    console.log("Itens deletados:")
    
    // Deleta os produtos cujo _id está na lista de IDs válidos e pertencem à ONG do usuário
    const deletados = await Product.deleteMany({
      _id: { $in: ids_validos },
      id_ong: id_ong,
    });
    console.log(infoDeletados);
    if (deletados.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Nenhum produto foi encontrado." }); // Se o produto não for encontrado
    }

    // Criação do LOG de remoção para os produtos
    let totalValor = 0;
    let totalQuantidade = 0;

    infoDeletados.forEach((produto) => {
      if (produto.valor) {
        totalValor -= produto.valor;
      }
      if (produto.quantidade) {
        totalQuantidade += produto.quantidade;
      }
    });

    const descricaoLog = {
      produtos: infoDeletados,
      valor: totalValor,
      entrada: 0,
      saida: totalQuantidade
    };

    await auditController.criarLog(
      "rem",
      id_usuario,
      nome_usuario,
      id_ong,
      descricaoLog
    );

    console.log("O log de remoção foi criado, provavelmente.");

    //---------------
    return res
      .status(200)
      .json({ success: true, message: "Produto(s) deletado(s) com sucesso." }); // Se o produto for encontrado e deletado
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Erro ao tentar deletar produtos",
        error: error.message,
      }); // Caso aconteça algum erro ao deletar o produto
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
  const nome_usuario = req.nomeUsuario;

  try {
    // Cria um objeto com os dados a serem atualizados
    const atualizando_dados = {
      nome: nome || undefined,
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
      const novoProduto = parseDataTypes(atualizando_dados);
      const mudancas = getAlteracoes(atualizar_produto, novoProduto);
      const qtd =
        (parseInt(novoProduto.quantidade) ?? 0) -
        (parseInt(atualizar_produto.quantidade) ?? 0);

      const descricaoLog = {
        produto: atualizar_produto,
        alteracoes: mudancas,
        entrada: qtd >= 0 ? qtd : 0,
        saida: qtd <= 0 ? Math.abs(qtd) : 0,
        valor:
          (parseFloat(novoProduto.valor) ?? 0) -
          (parseFloat(atualizar_produto.valor) ?? 0),
      };
      await auditController.criarLog(
        "att",
        id_usuario,
        nome_usuario,
        id_ong,
        descricaoLog
      );
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
      : null,
  };
}

exports.view_product = async (req, res) => {
  // definindo os tipos de filtro que vão ser utilizados na visualização
  const { id_categoria, validade } = req.query;
  const id_ong = req.ongId;

  try {
    const filtros = {}; // Os filtros serão armazenados nessa constante
    const categoriasCache = new Map();

    if (validade) {
      const dataValidade = new Date(validade);
      if (!isNaN(dataValidade.getTime())) {
        filtros.validade = { $lt: dataValidade }; // adicionando validade aos filtros
      }
    }

    const categoriaQuery = await Category.find({id_ong: id_ong});

    categoriaQuery.forEach(categoria => {
      if (!categoriasCache.get(categoria._id.toString())){ // Se no dicionário não houver uma categoria com o nome, adicionar
        categoriasCache.set(categoria._id.toString(), categoria.nome_categoria);
      }
    });

    console.log("Cache:")
    console.log(categoriasCache);
    console.log(categoriasCache.get("67a547ce3ca16568a40b6c9b"));
    console.log("-----------")

    if (id_categoria && mongoose.Types.ObjectId.isValid(id_categoria) && categoria) {
      filtros.id_categoria = id_categoria;
    }

    filtros.id_ong = id_ong;

    const visualizar_produto = await Product.find(filtros);

    const produtosComValoresPadrao = visualizar_produto.map((produto) => {
      const idcategoria = produto.id_categoria || ""
      return {
        _id: produto._id, // Mantém o _id do MongoDB
        id_categoria: produto.id_categoria || "", // "" se não existir
        nome_categoria: categoriasCache.get(idcategoria.toString()) || "",
        id_ong: produto.id_ong, // Não altera o id_ong
        // TODO: incluir nome da categoria
        nome: produto.nome || "",
        descricao: produto.descricao || "",
        quantidade: produto.quantidade || 0, // 0 se não existir
        validade:
          (produto.validade && produto.validade.toLocaleDateString("pt-BR")) ||
          "", // "" se não existir
        valor: produto.valor || 0, // 0 se não existir
        codbarras: produto.codbarras || "",
      };
    });

    return res.status(200).json({
      success: true,
      produtos: produtosComValoresPadrao,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Os produtos não podem ser visualizados.",
      error: error.message,
    });
  }
};
