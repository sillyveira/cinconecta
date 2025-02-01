const authService = require('../services/authService');
const Token = require('../models/Token');

async function login(req, res) {
  const { login, senha } = req.body;
  if (!login || !senha) {
    return res.status(400).json({ error: 'Login e senha são obrigatórios.' });
  }

  const user_id = await authService.autenticarUsuario(login, senha);
  if (!user_id) {
    return res.status(401).json({ error: 'Credenciais inválidas.' });
  }

  const token = await authService.gerarToken(user_id);
  return res.json({ token });
}

async function logout(req, res) {
  const token = req.headers.authorization || req.body.token;
  if (!token) {
    return res.status(400).json({ error: 'Token não informado.' });
  }

  // Remove o token do banco de dados
  await Token.deleteOne({ token });
  return res.json({ message: 'Logout realizado com sucesso.' });
}

module.exports = { login, logout };
