const Session = require("./sessionService");

let intervalId; // Armazena o ID do intervalo

function iniciarScheduler(tempoMinutos) {
    pararScheduler(); // Garante que nenhum outro timer esteja rodando antes de iniciar
    intervalId = setInterval(executarTarefa, 1000 * 60 * tempoMinutos);
}

function pararScheduler() {
    if (intervalId) {
        clearInterval(intervalId);
        console.log("Scheduler interrompido.");
    }
}

const executarTarefa = async () => {
    await Session.apagarSessoesExpiradas();
};

module.exports = { iniciarScheduler, pararScheduler, executarTarefa };
