const Audit = require("../models/Audit");
const User = require("../models/User")
const criarLog = async (acao, userid, descricao = {}) => {
  const novoLog = new Audit({
    userId: userid,
    acao: acao,
    desc: descricao || {},
    data: new Date(),
  });

  await novoLog.save();
};

const checarNovosLogs = async (userid) => {
  try {
    const tresDiasAtras = new Date();
    tresDiasAtras.setDate(tresDiasAtras.getDate() - 3);

    // Busca os registros nos últimos 3 dias
    const logs = await Audit.find({
      userId: userid,
      data: { $gte: tresDiasAtras },
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


    logsPorData.forEach((item) => {
      const descricaoLog = {
        quantidade: item[1],
        valor: item[2],
      };
      criarLog("rev", userid, descricaoLog);
    });

  } catch (error) {
    console.error("Erro ao checar novos logs:", error);
    return [];
  }
};

const procurarUsuariosDesatualizados = async () => {
    const tresDiasAtras = new Date();
    tresDiasAtras.setDate(tresDiasAtras.getDate() - 3);
  
    const usuarios = await User.find({
      ultimo_login: { $gte: tresDiasAtras }
    });
  
    if (usuarios.length > 0) {
      for (const usuario of usuarios) {
        await checarNovosLogs(usuario._id);  // Aguarda a execução de cada checarNovosLogs antes de passar para o próximo! Muito útil o for .. of
      }
    }
  };
  

module.exports = { criarLog, checarNovosLogs, procurarUsuariosDesatualizados };
