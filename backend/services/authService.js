const axios = require('axios');
const crypto = require('crypto');
const Token = require('../models/Token');

// Função que gera tokens até obter um que não exista no banco
async function gerarToken(user_id) {
    let token;
    let tokenExistente = true;

    do {
        token = crypto.randomBytes(32).toString('hex');
        tokenExistente = await Token.findOne({ token});
    } while (tokenExistente);

    const novoToken = new Token({ token, user_id});
    await novoToken.save();
    return token;
}

async function verificarToken(token) {
    const tokenValido = await Token.findOne({ token });
    if (tokenValido) {
        return tokenValido.user_id;
    }
    return null;
}

async function apagarToken(token){
    const tokenDoc = await Token.findOne({ token });
    if (tokenDoc) {
        const horasPassadas = (Date.now() - tokenDoc.createdAt.getTime()) / (1000 * 60 * 60);
        if (horasPassadas >= 12) {
            await Token.deleteOne({ token });
        }
    }
}

async function autenticarUsuario(login, senha) {
    try {
        const response = await axios.post('', { login, senha });

        if (response.data && response.data.autenticado) {
            return response.data.user_id;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Erro na autenticação:", error);
        return null;
    }
}

module.exports = { gerarToken, verificarToken, apagarToken, autenticarUsuario};