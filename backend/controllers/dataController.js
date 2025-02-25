// Controller para a análise de dados.
const mongoose = require("mongoose");
const Product = require("../models/Product");
const Audit = require("../models/Audit");

const retornarQuantidadeTotalItens = async (ongId) => {
  try {
    // Função do mongo para retornar o número de itens
    const contagemItens = await Product.countDocuments({
      id_ong: ongId,
    });

    return contagemItens;
  } catch (err) {
    return -1;
  }
};

const valorEstimadoEstoque = async (ongId, dataInicio) => {
  try {
    // Essa função irá filtrar pela data e depois agrupar os registros, ao agrupar, somará o campo de valor.
    const resultado = await Product.aggregate([
      {
        $match: {
          id_ong: ongId,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$valor" },
        },
      },
    ]);
    return resultado[0]?.total.toFixed(2);
  } catch (err) {
    // Em caso de erro
    console.log("[Erro]: ", err.message);
    return -1;
  }
};

const produtosProximosValidade = async (ongId) => {
  try {
    const tresMesesAtras = new Date();

    tresMesesAtras.setMonth(tresMesesAtras.getMonth() + 3);

    const produtosProximos = await Product.find({
      id_ong: ongId,
      validade: {
        $lte: tresMesesAtras,
      },
    });

    const produtoPadronizado = produtosProximos.map((produto) => {

      return {
        _id: produto._id, 
        id_categoria: produto.id_categoria || "",
        nome_categoria: produto.nome_categoria || "",
        id_ong: produto.id_ong, 
        nome: produto.nome || "",
        descricao: produto.descricao || "",
        quantidade: produto.quantidade || 0, 
        validade:
          (produto.validade &&
            new Date(produto.validade)
              .toLocaleDateString('pt-BR')) ||
          "", // "" se não existir
        valor: produto.valor || 0, // 0 se não existir
        codbarras: produto.codbarras || "",
      };
    });

    return produtoPadronizado;
  } catch (err) {
    console.log("[Erro no cálculo da validade] ", err.message);
    return {};
  }
};

const graficoEntradaSaida = async (ongId) => {
  const logs = await Audit.find({
    id_ong: ongId,
  });

  const logsPorMes = {};

  logs.forEach((log) => {
    if (!["reg", "log"].includes(log.acao)) { //Aqui removo os logs de registro e login que não possuem dados de produtos
      const dataDoLog = new Date(log.data);
      const mes = dataDoLog.getMonth(); // 0 = Janeiro, 1 = Fevereiro, etc.
      const ano = dataDoLog.getFullYear();

      // Cria um identificador único para o mês e ano
      const mesAno = `${mes}-${ano}`;

      if (!logsPorMes[mesAno]) {
        //Se não existir, cria um novo na lista
        logsPorMes[mesAno] = {
          name: getNomeDoMes(mes),
          entrada: 0,
          saida: 0,
        };
      }

      logsPorMes[mesAno].entrada += parseInt(log.desc.entrada) || 0; // Lidando com valores undefined
      logsPorMes[mesAno].saida += parseInt(log.desc.saida) || 0; // Lidando com valores undefined
    }
  });

  // Transforma o objeto em um array
  const resultado = Object.values(logsPorMes);

  return resultado;
};

const graficoValor = async (ongId) => {
  const logs = await Audit.find({
    id_ong: ongId,
  });

  const logsPorMes = {};

  logs.forEach((log) => {
    if (!["reg", "log"].includes(log.acao)) { //Aqui removo os logs de registro e login que não possuem dados de produtos
      const dataDoLog = new Date(log.data);
      const mes = dataDoLog.getMonth(); // 0 = Janeiro, 1 = Fevereiro, etc.
      const ano = dataDoLog.getFullYear();

      // Cria um identificador único para o mês e ano
      const mesAno = `${mes}-${ano}`;

      if (!logsPorMes[mesAno]) {
        //Se não existir, cria um novo na lista
        logsPorMes[mesAno] = {
          nome: getNomeDoMes(mes),
          valor: 0,
        };
      }

      logsPorMes[mesAno].valor += parseFloat(log.desc.valor) || 0; // Lidando com valores undefined
    }
  });

  // Transforma o objeto em um array
  const resultado = Object.values(logsPorMes);

  return resultado;
};
//Para auxiliar no nome do mês:
function getNomeDoMes(mes) {
  const nomesDosMeses = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  return nomesDosMeses[mes];
}

//TODO: Não funciona muito bem no momento, aguardando pelo modelo de categoria (wesley)
const ProdutosPorCategoria = async (idOng) => {
  const produtosProximos = await Product.aggregate([
    {
      $match: {
        id_ong: idOng,
      },
    },
    {
      $lookup: {
        from: "categorias",
        localField: "id_categoria",
        foreignField: "_id",
        as: "categoria",
      },
    },
    {
      $addFields: {
        nomeCategoria: {
          $cond: {
            if: { $gt: [{ $size: "$categoria" }, 0] },
            then: { $arrayElemAt: ["$categoria.nome_categoria", 0] },
            else: "Outros",
          },
        },
      },
    },
    {
      $group: {
        _id: "$nomeCategoria",
        quantidade: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        categoria: "$_id",
        quantidade: 1,
      },
    },
  ]);
  return produtosProximos;
};

module.exports = {
  retornarQuantidadeTotalItens,
  valorEstimadoEstoque,
  produtosProximosValidade,
  ProdutosPorCategoria,
  graficoEntradaSaida,
  graficoValor
};
