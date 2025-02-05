const User = require("../models/User");
const axios = require("axios");
const sessionService = require("../services/sessionService");

const login = async (req, res) => {
  const { email, password } = req.body; // Recebe o email e senha do usuário

  try {
    const response = await axios.post(
      "https://bora-impactar-prd.setd.rdmapps.com.br/api/login.json",
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
        const message = response.data.message;
        if (message == "Login bem-sucedido") {
          // Verifica se o login foi bem-sucedido

          const user = await User.findOne({ login: email }); //Procurar o usuário pelo email

          if (!user) {
            //Caso 1: O usuário não foi achado no banco. [Primeiro login]

            const novoUsuario = new User({
              //Criando o novo usuário
              login: email,
              data_ingresso: new Date(),
              ultimo_login: new Date(),
            });

            try {
              //Tentativa de salvar no banco de dados:
              await novoUsuario.save();
              // Gerando a sessão do novo usuário e inserindo o token no banco de dados:
              const tokenGerado = await sessionService.gerarSessao(novoUsuario._id);
              

              return res.status(200).json({
                message: "O usuário foi logado e registrado com sucesso.",
                userid: novoUsuario._id,
                token: tokenGerado
              });

            } catch (err) {
              return res.status(500).json({
                message:
                  "Houve erro na tentativa de registro. Tente novamente.",
              });
            }

          } else {
            // Caso 2: O usuário foi encontrado, ele já está registrado. [Segundo+ login]

            // Bloco para gerar a sessão do usuário e inserir o token no banco de dados
            let tokenGerado = ""
            try {
              // Se o token já tiver sido gerado, ele é enviado ao usuário
              tokenGerado = await sessionService.checarSessao(user._id)
              
              // O token será gerado se a sessão não existir
              if (tokenGerado == null) {
                tokenGerado = await sessionService.gerarSessao(user._id);
              } else {
            // Se a sessão já existe, o token é retornado
                return res.status(200).json({
                    message: "O usuário já está logado.",
                    userid: user._id,
                    token: tokenGerado
                  });
              }  
              
            } catch (err) {
              return res.status(500).json({
                message: "Houve erro no login. Tente novamente.",
              });
            }
            // --------
            return res.status(200).json({
              message: "O usuário foi logado.",
              userid: user._id,
              token: tokenGerado
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
    console.error(error);

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
            message: revogarSessao_.message
        })
    
    } catch (err) {}
} 
module.exports = { login, logout };

