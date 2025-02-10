const User = require("../models/User");
const axios = require("axios");
const sessionService = require("../services/sessionService");
const auditController = require("../controllers/auditController");
const Ong = require("../models/Ong");
require('dotenv').config();

const API = process.env.API_LINK // Link protegido da API do governo dentro da .env
const login = async (req, res) => {
  const { email, password } = req.body; // Recebe o email e senha do usuário

  try {
    const response = await axios.post(
      API,
      {
        //Envia o email e senha para a API do governo
        email: email,
        password: password,
      }
    );

    if (response.status == 200) {
      // Verifica se teve resposta
      if (response.data && response.data.message) {
        // Se houver mensagem na resposta
        
        // Variáveis da reposta da API. Úteis para registrar a ong/usuário.
        const message = response.data.message;
        const nomeUsuario = response.data.user.name;
        const idOng = response.data.ngo.id;
        const nomeOng = response.data.ngo.name;

        if (message == "Login bem-sucedido") {
          // Verifica se o login foi bem-sucedido

          const user = await User.findOne({ email: email }); //Procurar o usuário pelo email
          const ong = await Ong.findOne({id_gov: idOng});

          if (!user) {
            //Caso 1: O usuário não foi achado no banco. [Primeiro login]

              // Caso 1.1: Verificar se a ONG já existe, se não, deve ser criada.
              
              let _idOng = null;
              if(!ong){
                try{
                
                  const novaOng = new Ong({
                    id_gov: idOng,
                    nome: nomeOng,
                  })
                  await novaOng.save();
                
                  _idOng = novaOng._id; // Salvando o ID da nova ONG para atribuir ao usuário 
                
                } catch (err){
                  // Se não foi possível criar uma nova ONG:
                  return res.status(500).json({
                    message: "Houve erro na tentativa de criar uma nova ONG. Tente novamente.",
                    error: err.message
                  });
                }
              } else if(ong){
              // Caso 1.2: A ONG já existe.
                _idOng = ong._id;
            }

            // Criação do usuário com o ID da ONG em mãos:
            const novoUsuario = new User({
              //Criando o novo usuário
              id_ong: _idOng,
              email: email,
              nome: nomeUsuario,
              data_ingresso: new Date(),
              ultimo_login: new Date(),
            });

            // TODO (wesley): Fazer a reutilização do código da geração de sessão. Está sendo chamado duas vezes.
            try {
              //Tentativa de salvar no banco de dados:
              await novoUsuario.save();
              // Gerando a sessão do novo usuário e inserindo o token no banco de dados:
              const tokenGerado = await sessionService.gerarSessao(
                novoUsuario._id,
                _idOng,
                nomeUsuario
              );

              try {
                //Tentativa de salvar o log de auditoria
                await auditController.criarLog("reg", novoUsuario._id, nomeUsuario,_idOng);
                console.log("O log do usuário [registrar] foi salvo.");
              } catch (err) {
                console.log("Não foi possível salvar o log do usuário.");
                console.log(err.message)
              }

              return res.status(200).json({
                message: "O usuário foi logado e registrado com sucesso.",
                userid: novoUsuario._id,
                token: tokenGerado,
              });
            } catch (err) {
              return res.status(500).json({
                message:
                  "Houve erro na tentativa de registro. Tente novamente.",
                error: err.message
              });
            }
          } else {
            // Caso 2: O usuário foi encontrado, ele já está registrado e a ong já existe. [Segundo+ login]

            // Bloco para gerar a sessão do usuário e inserir o token no banco de dados
            let tokenGerado = "";
            try {
              // Se o token já tiver sido gerado, ele é enviado ao usuário
              tokenGerado = await sessionService.checarSessao(user._id);

              // O token será gerado se a sessão não existir
              if (tokenGerado == null) {
                tokenGerado = await sessionService.gerarSessao(user._id, ong._id, user.nome);
              } else {
                // Se a sessão já existe, o token é retornado
                return res.status(200).json({
                  message: "O usuário já está logado.",
                  userid: user._id,
                  token: tokenGerado,
                });
              }
            } catch (err) {
              return res.status(500).json({
                message: "Houve erro no login. Tente novamente.",
              });
            }
            // --------

            try {
              //Tentativa de salvar o log de auditoria
              await auditController.criarLog("log", user._id, user.nome, ong._id);
              console.log("O log do usuário [login] foi salvo.");
            } catch (err) {
              console.log("Não foi possível salvar o log do usuário.");
              console.log(err.message)
            }

            // Atualizando a data do último_login
            user.ultimo_login = new Date();
            await user.save();

            // Realizando a checagem da última auditoria para transformar os logs em logs de revisão
            await auditController.checarUltimaAuditoria(user._id, ong._id)

            return res.status(200).json({
              message: "O usuário foi logado.",
              userid: user._id,
              token: tokenGerado,
            });
          }
        } else {
          return res.status(404).json({
            message: "As credenciais são inválidas.",
          });
        }
      }
    }
  } catch (error) {
    if (error.response) {
      // Captura erro com resposta do servidor (status HTTP > 400)
      return res.status(error.response.status).json({
        message:
          error.response.data.message || "Erro desconhecido na resposta.",
      });
    } else if (error.request) {
      // Captura erro sem resposta do servidor (problema na requisição)
      return res.status(500).json({
        message: "Erro de comunicação com o servidor.",
      });
    } else {
      // Erro geral (problema com a configuração do Axios, por exemplo)
      return res.status(500).json({
        message: `Erro: ${error.message}`,
      });
    }
  }
};

const logout = async (req, res) => {
  try {
    const revogarSessao_ = await sessionService.revogarSessao(req.token);

    return res.status(revogarSessao_.status).json({
      message: revogarSessao_.message,
    });
  } catch (err) {}
};
module.exports = { login, logout };
