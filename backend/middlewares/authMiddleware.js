
const sessionService = require('../services/sessionService')

const middlewareAutenticacao = async (req, res, next) => {
    try {
        const tokenHeader = req.headers['authorization'];
        
        if (!tokenHeader) {
            return res.status(401).json({
                message: 'Token não está presente na solicitação.'
            })
        }

        const token = tokenHeader.split(' ')[1]; //Remove da solicitação o Bearer: "Bearer <token>".

        if (!token){
            return res.status(401).json({
                message: 'Token inválido.'
            });
        }
        
        const userid = await sessionService.checarToken(token);

        if (!userid) {
            return res.status(401).json({
                message: 'O token é inválido ou está expirado.'
            })
        }

        //Se for válido, o userId do token será armazenado para a requisição em sequência

        req.userId = userid;
        req.token = token;
        next();
    } catch (err) {
        //Erro inesperado
        return res.status(500).json({
            message: err.message
        })
    }

}

module.exports = middlewareAutenticacao