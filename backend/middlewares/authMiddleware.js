
const sessionService = require('../services/sessionService')

const middlewareAutenticacao = async (req, res, next) => {
    try {
        // const tokenHeader = req.headers['authorization'];
        
        const tokenCookie = req.cookies.token || undefined;
        if (!tokenCookie) {
            return res.status(200).json({
                message: 'Token não está presente na solicitação.'
            })
        }
        
        const {userid, ongid, nome_usuario} = await sessionService.checarToken(tokenCookie);

        if (!userid) {
            return res.status(200).json({
                message: 'O token é inválido ou está expirado.'
            })
        }

        //Se for válido, o userId do token será armazenado para a requisição em sequência

        req.userId = userid;
        req.ongId = ongid;
        req.nomeUsuario = nome_usuario;
        req.token = tokenCookie;
        next();
    } catch (err) {
        //Erro inesperado
        return res.status(500).json({
            message: err.message
        })
    }

}

module.exports = middlewareAutenticacao