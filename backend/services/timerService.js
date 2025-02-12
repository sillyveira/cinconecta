const Session = require("./sessionService");
const Audit = require("../controllers/auditController")

function iniciarScheduler(tempoMinutos) {
    setInterval(executarTarefa, 1000 * 60 * tempoMinutos)
}

const executarTarefa = async() => {
    Session.apagarSessoesExpiradas();
}

module.exports = {iniciarScheduler, executarTarefa};