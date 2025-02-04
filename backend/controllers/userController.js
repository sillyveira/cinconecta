const User = require('../models/User')
const axios = require('axios');

const login = async (req, res) => {
    const {email, password} = req.body; // Recebe o email e senha do usuário

    try {
        const response = await axios.post('https://bora-impactar-prd.setd.rdmapps.com.br/api/login.json', { //Envia o email e senha para a API do governo
            email: email,
            password: password                         
        });

        if (response.status == 200) { // Verifica se teve resposta
            if (response.data && response.data.message) { // Se houver mensagem na resposta
                const message = response.data.message
                if (message == "Login bem-sucedido") { // Verifica se o login foi bem-sucedido
                    
                    const user = await User.findOne({login: email}); //Procurar o usuário pelo email
                    
                    if (!user) { //Caso 1: O usuário não foi achado no banco. [Primeiro login]
                        
                        const novoUsuario = new User({ //Criando o novo usuário
                            login: email,
                            data_ingresso: new Date(),
                            ultimo_login: new Date()
                        })
                        
                        try { //Tentativa de salvar no banco de dados.
                            await novoUsuario.save();
                            // TODO: Inserir a tokenização aqui
                            return res.status(200).json({
                                message: 'O usuário foi logado e registrado com sucesso.'
                            })
                        } catch (err) {
                            return res.status(500).json({
                                message: 'Houve erro na tentativa de registro. Tente novamente.'
                            })
                        }
                        return 
                    } else { // Caso 2: O usuário foi achado, ele já está registrado. [Segundo+ login]
                        //TODO: Inserir tokenização:
                        return res.status(200).json({
                            message: 'O usuário foi logado.'
                        })
                    }
                } else {
                    return res.status(404).json({
                        message: 'As credenciais são inválidas.'
                    })
                }
            }
        }
    } catch (error) {
        console.error(error);
        
        if (error.response) {
            // Captura erro com resposta do servidor (status HTTP > 400)
            return res.status(error.response.status).json({
                message: error.response.data.message || 'Erro desconhecido na resposta.'
            });
        } else if (error.request) {
            // Captura erro sem resposta do servidor (problema na requisição)
            return res.status(500).json({
                message: 'Erro de comunicação com o servidor.'
            });
        } else {
            // Erro geral (problema com a configuração do Axios, por exemplo)
            return res.status(500).json({
                message: `Erro: ${error.message}`
            });
        }
    }
}

module.exports = { login };

// -- Wesley
// TODO: remover esse código de criar usuário e seguir o protocolo do slide de planejamento. o usuário e a senha será enviada diretamente por requisição POST para a API do governo. obs.: colocar o endereço da API e todas informações privadas nas variáveis secretas (.env) 
// exports.createUser =  async (req, res) => {
//     const {name, email, password} = req.body // Capture the values in name, email and password
    
//     // Validate required fields
//     if (!name || !email || !password) {
//         return res.status(400).json({ 
//             success: false,
//              message: "All fields are required."});
//     }
    
//         try {
//             const existingUser = await User.findOne({ email })
           
//             if (existingUser){
//                return res.status(409).json({ 
//                 sucess: false, 
//                 message: "Email is already in use."}) 
//             }
           
//             // Hash of password
//             const hashedPassword = await bcrypt.hash(password, saltRounds)
                
//             // Create user in the database
//             await User.create({
//                     name, 
//                     email, 
//                     password: hashedPassword
//                 })
//                    return res.status(201).json({ success: true, message: "User created successfully." })
                
//             } catch(error) {
//                     console.error('Error creating user:', error); 
//                     res.status(500).json({ 
//                         success: false, 
//                         message: "Error creating user.",
//                         error: error.message 
//                     })
//          }
//     }
