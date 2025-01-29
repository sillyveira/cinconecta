const User = require('../models/User')
const bcrypt = require('bcrypt')
const saltRounds = 10
// -- Wesley
// TODO: remover esse código de criar usuário e seguir o protocolo do slide de planejamento. o usuário e a senha será enviada diretamente por requisição POST para a API do governo. obs.: colocar o endereço da API e todas informações privadas nas variáveis secretas (.env) 
exports.createUser =  async (req, res) => {
    const {name, email, password} = req.body // Capture the values in name, email and password
    
    // Validate required fields
    if (!name || !email || !password) {
        return res.status(400).json({ 
            success: false,
             message: "All fields are required."});
    }
    
        try {
            const existingUser = await User.findOne({ email })
           
            if (existingUser){
               return res.status(409).json({ 
                sucess: false, 
                message: "Email is already in use."}) 
            }
           
            // Hash of password
            const hashedPassword = await bcrypt.hash(password, saltRounds)
                
            // Create user in the database
            await User.create({
                    name, 
                    email, 
                    password: hashedPassword
                })
                   return res.status(201).json({ success: true, message: "User created successfully." })
                
            } catch(error) {
                    console.error('Error creating user:', error); 
                    res.status(500).json({ 
                        success: false, 
                        message: "Error creating user.",
                        error: error.message 
                    })
         }
    }
