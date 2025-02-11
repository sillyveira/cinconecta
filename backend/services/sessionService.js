const crypto = require('crypto');
const Session = require('../models/Session')

function gerarToken() {
    return crypto.randomBytes(32).toString('hex');
}

// checar se a sessão existe
const checarSessao = async (userid) => {
    const tokenExiste = await Session.findOne({userId: userid})

    if (tokenExiste) { //Verifica se o token já existe 
        //TODO: Devemos colocar lógica de logout para quando o token já existe? Pensamento para o futuro.
        return tokenExiste.token
    } else {
        return null
    }
}

const checarToken = async (tokenFornecido) => {
    const tokenExiste = await Session.findOne({token: tokenFornecido})
    if(tokenExiste) {
        return tokenExiste.userId
    } else {
        return null
    }
}

const gerarSessao = async (userid) => {    
    const novoToken = gerarToken()

    const novaSessao = new Session({
        userId: userid,
        token: novoToken,
        expira_em: new Date() 
    })

    await novaSessao.save();

    return novoToken;
}

const revogarSessao = async (tokenFornecido) => {
    const resposta = await Session.findOneAndDelete({token: tokenFornecido})
    if (!resposta) {
        return {message:"Nenhuma sessão encontrada com o token fornecido.", status: 401}
    } else {
        return {message:"A sessão foi revogada com sucesso.", status: 200}
    }
}

const apagarSessoesExpiradas = async () => {
    try {
        //Apaga onde o expira_em: for menor ou igual à uma new Date (que é a data/hora atual)
        await Session.deleteMany({expira_em: { $lte: new Date()} }) 
        console.log("Sessões expiradas apagadas!");
    } catch (err) {
        console.log("Não foi possível apagar as sessões expiradas.")
    }
}

module.exports = {
    gerarSessao,
    checarSessao,
    revogarSessao,
    apagarSessoesExpiradas,
    checarToken
};