const Product = require("../models/Product");
const Category = require("../models/Category");
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
      message: "Campos obrigatórios.",
    });
  }

  if(!mongoose.Types.ObjectId.isValid(id_ong)) {
    return res.status(400).json({
      success: false,
      message: "ID de ONG inválido.",
    })
  }

  if (!mongoose.Types.ObjectId.isValid(id_usuario)) {
    return res.status(400).json({
      success: false,
      message: "ID de usuário inválido.",
    });
  }

  try {
    categoriasCache = new Map();
    const categoriaQuery = await Category.find({ id_ong: id_ong });
    categoriaQuery.forEach((categoria) => {
      if (!categoriasCache.get(categoria._id.toString())) {
        // Se no dicionário não houver uma categoria com o nome, adicionar
        categoriasCache.set(categoria._id.toString(), categoria.nome_categoria);
      }
    });

    // Cria o produto no Banco de dados
    const novoProduto = new Product({
      id_ong: id_ong,
      id_categoria: id_categoria ? id_categoria : null, // Se id_categoria for fornecido, converte para ObjectId
      nome_categoria: id_categoria
        ? categoriasCache.get(id_categoria.toString())
        : null,
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

    return res
      .status(200)
      .json({ success: true, message: "Produto criado com sucesso." });    
  } 
  
  catch (error) {
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
  const nome_usuario = req.nomeUsuario;

  
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
    // Retornando o nome das categorias
    categoriasCache = new Map();
    const categoriaQuery = await Category.find({ id_ong: id_ong });
    categoriaQuery.forEach((categoria) => {
      if (!categoriasCache.get(categoria._id.toString())) {
        categoriasCache.set(categoria._id.toString(), categoria.nome_categoria);
      }
    });

    // Puxa os itens para adicioná-los ao log:
    const infoDeletados = await Product.find({
      _id: { $in: ids_validos },
      id_ong: id_ong,
    });

    if (infoDeletados.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Nenhum produto foi encontrado.",
      });
    }

    //Processa os produtos antes de removê-los para pegar o erro e posteriormente criar um log
    let totalValor = 0;
    let totalQuantidade = 0;
    infoDeletados.forEach((produto) => {
      produto.set(
        "nome_categoria",
        produto.id_categoria
          ? categoriasCache.get(produto.id_categoria.toString())
          : undefined
      );
      if (produto.valor) {
        totalValor -= produto.valor;
      }
      if (produto.quantidade) {
        totalQuantidade += produto.quantidade;
      }
    });

    // Apaga os produtos pós-processamento
    await Product.deleteMany({
      _id: { $in: ids_validos },
      id_ong: id_ong,
    });

    // Criação do LOG de remoção para os produtos
    const descricaoLog = {
      produtos: infoDeletados,
      valor: totalValor,
      entrada: 0,
      saida: totalQuantidade,
    };

    await auditController.criarLog(
      "rem",
      id_usuario,
      nome_usuario,
      id_ong,
      descricaoLog
    );

    return res.status(200).json({
      success: true,
      message: "Produto(s) deletado(s) com sucesso.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro ao tentar deletar produtos",
      error: error.message,
    });
  }
};

// Controller para atualizar produtos
exports.update_product = async (req, res) => {
  const { id } = req.params;
  const { id_categoria, nome, descricao, quantidade, validade, valor, codbarras } = req.body;
  const id_usuario = req.userId;
  const id_ong = req.ongId;
  const nome_usuario = req.nomeUsuario;

  try {
    // busca o produto antes da atualização
    const produtoExistente = await Product.findOne({ _id: id, id_ong: id_ong });

    if (!produtoExistente) {
      return res.status(404).json({
        success: false,
        message: "Produto não encontrado.",
      });
    }

    // 🔹 Criar cache de categorias
    categoriasCache = new Map();
    const categoriaQuery = await Category.find({ id_ong: id_ong });
    categoriaQuery.forEach((categoria) => {
      categoriasCache.set(categoria._id.toString(), categoria.nome_categoria);
    });

    // 🔹 Criar objeto atualizado
    const novoProduto = {
      nome: nome || produtoExistente.nome,
      id_categoria: id_categoria === "" ? null : id_categoria || produtoExistente.id_categoria,
      nome_categoria: id_categoria === "" ? null : (id_categoria ? categoriasCache.get(id_categoria.toString()) : produtoExistente.nome_categoria),
      descricao: descricao || produtoExistente.descricao,
      quantidade: quantidade ?? produtoExistente.quantidade, // Permite zero
      validade: validade || produtoExistente.validade,
      valor: valor ?? produtoExistente.valor, // Permite zero
      codbarras: codbarras || produtoExistente.codbarras,
    };

    const mudancas = getAlteracoes(produtoExistente.toObject(), novoProduto);

    if (Object.keys(mudancas).length === 0) {
      return res.status(200).json({
        success: false,
        message: "Nenhuma alteração detectada.",
      });
    }

    // atualiza apenas se houver mudanças
    await Product.updateOne({ _id: id, id_ong: id_ong }, novoProduto);

    // criar log de auditoria
    try {
      const qtd = (parseInt(novoProduto.quantidade) ?? 0) - (parseInt(produtoExistente.quantidade) ?? 0);

      const descricaoLog = {
        produto: produtoExistente,
        alteracoes: mudancas,
        entrada: qtd >= 0 ? qtd : 0,
        saida: qtd <= 0 ? Math.abs(qtd) : 0,
        valor: (parseFloat(novoProduto.valor) ?? 0) - (parseFloat(produtoExistente.valor) ?? 0),
      };

      await auditController.criarLog(
        "att", 
        id_usuario, 
        nome_usuario, 
        id_ong, 
        descricaoLog
      );
    } catch (err) {
      console.error("Erro ao salvar o log de auditoria.", err);
    }

    return res.status(200).json({
      success: true,
      message: "Produto atualizado com sucesso.",
    });
  } catch (error) {
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

    if (key === "id_categoria") {
      continue; // Ignora a categoria (opcional)
    }

    // Renomeia as chaves para o log
    let chaveFinal = key;
    if (key === "nome_categoria") {
      chaveFinal = "Categoria";
    } else if (key === "validade") {
      chaveFinal = "Validade";
    } else if (key === "codbarras") {
      chaveFinal = "Código de barras"
    } else if (key === "descricao") {
      chaveFinal = "Descrição"
    }

    // **Corrige a conversão da data antes da comparação**
    if (key === "validade") {
      if (valorNovo) {
        valorNovo = new Date(valorNovo).toISOString(); // Converte string do frontend para formato ISO
      }
      if (valorAntigo instanceof Date) {
        valorAntigo = valorAntigo.toISOString(); // Garante que ambos estejam no mesmo formato
      }
    }

    // Converte tudo para string para evitar diferenças de tipo
    valorAntigo = valorAntigo != null ? valorAntigo.toString() : null;
    valorNovo = valorNovo != null ? valorNovo.toString() : null;

    // Se houve alteração, adiciona ao objeto de mudanças
    if (valorNovo !== valorAntigo) {
      mudancas[chaveFinal] = novoProduto[key];
    }
  }

  return mudancas;
}

// Função para converter data "yyyy-dd-mm" para o formato ISO do MongoDB
function formatarDataParaISO(data) {
  const partes = data.split("-");
  if (partes.length === 3) {
    const [ano, dia, mes] = partes; // Corrigir a ordem
    return new Date(`${ano}-${mes}-${dia}T00:00:00.000Z`).toISOString();
  }
  return data; // Retorna o mesmo valor se não for uma data válida
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

    const categoriaQuery = await Category.find({ id_ong: id_ong });

    categoriaQuery.forEach((categoria) => {
      if (!categoriasCache.get(categoria._id.toString())) {
        // Se no dicionário não houver uma categoria com o nome, adicionar
        categoriasCache.set(categoria._id.toString(), categoria.nome_categoria);
      }
    });
    
    

    if (id_categoria && mongoose.Types.ObjectId.isValid(id_categoria)) {
      filtros.id_categoria = id_categoria;
    }

    filtros.id_ong = id_ong;

    const visualizar_produto = await Product.find(filtros);

    const produtosComValoresPadrao = visualizar_produto.map((produto) => {
      const idcategoria = produto.id_categoria || "";
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
          (produto.validade &&
            new Date(produto.validade)
              .toLocaleDateString('pt-BR')) ||
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
