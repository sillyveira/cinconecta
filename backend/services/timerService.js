const Session = require("./sessionService");

function iniciarScheduler(tempoMinutos) {
    setInterval(executarTarefa, 1000 * 60 * tempoMinutos)
}

const executarTarefa = async() => {
    Session.apagarSessoesExpiradas();
}

module.exports = {iniciarScheduler, executarTarefa};