const Audit = require("../models/Audit");
const User = require("../models/User");
const Ong = require("../models/Ong");
const { response } = require("express");
const criarLog = async (acao, userid, nomeusuario, ongid, descricao = {}) => {

  const novoLog = new Audit({
    id_usuario: userid || null,
    nome_usuario: nomeusuario || "",
    id_ong: ongid,
    acao: acao,
    desc: descricao || {},
    data: new Date(),
  });

  await novoLog.save();
};

const getLogs = async(ongid, acao, dataInicial, dataFinal, nomeMembro) => {

  // Se a diferença da data inicial par a data final for maior que um ano, setar para um ano apenas.

  // Calculando a diferença em milissegundos
  dataFinal = new Date(dataFinal)
  dataInicial = new Date(dataInicial)

  const diferencaMs = dataInicial - dataFinal
  // Convertendo a diferença de milissegundos para anos (aproximadamente)
  const diferencaAnos = diferencaMs / (1000 * 60 * 60 * 24 * 365);
  console.log(diferencaAnos);
  if (diferencaAnos > 1 || diferencaAnos <= -1){
    dataInicial.setFullYear(dataFinal.getFullYear() - 1)
    console.log("A diferença é maior que um ano, setando para um ano apenas");
  }

  const query = {
    id_ong: ongid,
    data: {
      $gte: new Date(dataInicial), // Maior ou igual à data inicial
      $lte: new Date(dataFinal) // Menor ou igual à data final
    }
  }
  
  // Se for fornecido um nome de um membro específico, será adicionado à query.
  if (nomeMembro) {
    query.nome_usuario = nomeMembro
  }

  if (acao) {
    query.acao = acao 
  }

  const logs = await Audit.find(query) //Enviando a query criada acima
  return logs;
}

const checarNovosLogs = async ( ongid, dataInicio) => {
  try {
    
    // Busca os registros nos últimos x dias
    const logs = await Audit.find({
      id_ong: ongid,
      acao: { $nin: ['rev', 'log', 'reg'] }, // Não inclui os logs de revisão, login e registro.
      //data: { $gte: dataInicio, $lte: new Date() }, //Da data de início até a data atual.
      // TODO: remover esse comentário ^^ É apenas para teste da função checar_logs 
    }).sort({ data: 1 });

    const logsPorData = [];
  
    logs.forEach((log) => {
      const dataCompleta = new Date(log.data.setHours(0, 0, 0, 0)); //Para agrupar apenas por data! Se os horários estiverem diferentes, o agrupamento dará errado.

      // Procura se já existe uma entrada com essa data
      let entrada = logsPorData.find(
        (item) => item[0].getTime() === dataCompleta.getTime()
      );

      if (!entrada) {
        entrada = [dataCompleta, 0, 0, []];
        logsPorData.push(entrada);
      }

      const quantidadeAtual = entrada[1];
      const valorAtual = entrada[2];

      if (log.acao !== "log" && log.acao !== "reg" && log.acao !== "rev") {
        entrada[1] = quantidadeAtual + (parseInt(log.desc.quantidade, 10) || 0); //soma a quantidade de itens que já temos com o do log
        entrada[2] = valorAtual + (parseInt(log.desc.valor, 10) || 0);
      }
      entrada[3].push(log); // [data, 0, 0, [registro_adicionado]]
    });

    // [data, 0, 0, [registro_adicionado]]

    const idsParaRemover = [];

    logsPorData.forEach((item) => {
      const descricaoLog = {
        quantidade: item[1],
        valor: item[2],
      };

      criarLog("rev", null, null, ongid, descricaoLog);
    
      item[3].forEach((log) => {
        idsParaRemover.push(log._id);
      })
    });

    await Audit.deleteMany({
        _id: {$in: idsParaRemover}
    })

  } catch (error) {
    console.error("Erro ao checar novos logs:", error);

  }
};

const checarUltimaAuditoria = async (userid, ongid) => {
  try {
    const ong_ = await Ong.findById(ongid);

    if (!ong_) { //Por algum motivo inesperado, o usuário não foi encontrado
      return
    }

    const ultimaAuditoria = ong_.ultima_auditoria;

    if (!ultimaAuditoria) { //Por algum motivo inesperado, a última auditoria não existe
      await checarNovosLogs(userid, ong_, new Date(2025, 1, 1));
      ong_.ultima_auditoria = new Date();
      await ong_.save();
      return;
    }

    const tresDiasAtras = new Date();
    tresDiasAtras.setDate(tresDiasAtras.getDate() - 3);
    
    if (ultimaAuditoria <= tresDiasAtras) {
      //Última auditoria desatualizada. Checando novos logs.
      await checarNovosLogs(userid, ong_._id, ong_.ultima_auditoria);
      ong_.ultima_auditoria = new Date();
      await ong_.save();
    }

  } catch (err) {
    console.log("Erro inesperado ao checar a última auditoria:", err.message);
  }
}

// const procurarUsuariosDesatualizados = async () => {
//     const tresDiasAtras = new Date();
//     tresDiasAtras.setDate(tresDiasAtras.getDate() - 3);
  
//     const usuarios = await User.find({
//       ultimo_login: { $gte: tresDiasAtras }
//     });
  
//     if (usuarios.length > 0) {
//       for (const usuario of usuarios) {
//         await checarNovosLogs(usuario._id);  // Aguarda a execução de cada checarNovosLogs antes de passar para o próximo! Muito útil o for .. of
//       }
//     }
//   };
  

module.exports = { criarLog, checarNovosLogs, checarUltimaAuditoria, getLogs };
