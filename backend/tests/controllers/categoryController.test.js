const request = require('supertest')
const app = require('../../server.js')
const mongoose = require('mongoose')
const category = require('../../controllers/categoryController.js')
const session = require('../../models/Session.js')
const User = require("../../models/User");
const Cat = require('../../models/Category.js')
const ong = require('../../models/Ong.js')
const { query } = require('express')
const categoryController = require('../../controllers/categoryController.js')
require("dotenv").config({path: '../../.env'})


describe("1. Testes de consulta de categorias", ()=>{

    let req, res;
    
    beforeEach(async()=>{

        await session.deleteMany({})
        await User.deleteMany({})
        await ong.deleteMany({})
        await Cat.deleteMany({})

        const newOng = await ong.create({
            id_gov: 1234,
            nome: "Alguma coisa foundation"
        })

        const newUser = await User.create({
            id_ong: newOng._id,
            email: 'userteste1@email.dom',
            nome: 'user teste'
            })    

        const Session = await session.create({
              id_usuario: newUser._id,
              id_ong: newUser.id_ong,
              nome_usuario: newUser.nome,
              token: "token_valido_123",
            });
        
        req = {
            ongId: Session.id_ong,
            query: {}
            };
    
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
            };

    })

    afterEach(async()=>{
        await ong.deleteMany({})
        await User.deleteMany({})
        await session.deleteMany({})
        await Cat.deleteMany({})
    })

    test("Teste 1 - Retorno de categorias com sucesso", async()=>{

        const Categoria = await Cat.create({
            nome_categoria: "Utensílio de cozinha",
            id_ong: req.ongId
        });

       await category.getCategories(req,res)
        
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ //bug encontrado no controller
            message: "Categorias retornadas com sucesso",
            categorias: [{
                "__v": Categoria.__v, //????????????????????????????????????????????????????????????????????????????????????
                "_id": Categoria._id,
                "id_ong": Categoria.id_ong,
                "nome_categoria": Categoria.nome_categoria
            
            }]
        })
    })

    test("Teste 2 - Nenhuma categoria encontrada para a ONG", async()=>{

        //vou reutilizar a ong que foi criada no teste.
        const newOng = await ong.create({
            id_gov: 12345,
            nome: "Bazinga foundation"        
        }) //deletando todas as categorias do banco de dados

        const newUser = await User.create({
            id_ong: newOng._id,
            email: "newuser13@hotmail.com",
            nome: "Amaral"
        })
        
        const newSession = await session.create({
            id_usuario: newUser._id,
            id_ong: newUser.id_ong,
            nome_usuario: newUser.nome,
            token: "token_valido_yay",
        })

        req = {
            ongId: newSession.id_ong,
            query: {}
        }

        await category.getCategories(req,res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({
            message: "Categorias retornadas com sucesso",
            categorias: []
        })

    })

    test("Teste 3 - Erro ao consultar categorias da ong", async()=>{

        req = {
            ongId: new mongoose.Types.ObjectId(), //id aleatório que não existe no banco de dados
            query: {}
            };

        await category.getCategories(req,res)

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({
            message: 'Ong não encontrada.'
        })

    })

})

describe("2. Testes de criação de categorias", ()=>{

    beforeEach(async()=>{
        
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
            };

    })

    afterEach(async()=>{
        await ong.deleteMany({})
        await Cat.deleteMany({})
        await User.deleteMany({})
        await session.deleteMany({})
    })


    test("1 - Criação de categorias bem-sucedidas", async()=>{

        const newOng = await ong.create({
            id_gov: 1234,
            nome: "Alguma coisa foundation"
        })

        const newUser = await User.create({
            id_ong: newOng._id,
            email: 'userteste1@email.dom',
            nome: 'user teste'
            })    

        const Session = await session.create({
              id_usuario: newUser._id,
              id_ong: newUser.id_ong,
              nome_usuario: newUser.nome,
              token: "token_valido_123",
            });

            const nome_categoria = "Alimentos não perecíveis"
        
        req = {
            ongId: Session.id_ong,
            body: {
                nome_categoria: nome_categoria
            },
            query: {}
            };

        await categoryController.createCategories(req,res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({
            message: 'Categoria criada com sucesso!'
        })
        
    })

    test("2 - Falta de nome de categoria", async()=>{
        const newOng = await ong.create({
            id_gov: 1234,
            nome: "Alguma coisa foundation"
        })

        const newUser = await User.create({
            id_ong: newOng._id,
            email: 'userteste1@email.dom',
            nome: 'user teste'
            })    

        const Session = await session.create({
              id_usuario: newUser._id,
              id_ong: newUser.id_ong,
              nome_usuario: newUser.nome,
              token: "token_valido_123",
            });

            const nome_categoria = ""
        
        req = {
            ongId: Session.id_ong,
            body: {
                nome_categoria: nome_categoria
            },
            query: {}
            };

        await categoryController.createCategories(req,res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({
            message: 'Nome e/ou ID da ONG não podem ser nulos.'
        })
    })

    test("3 - Falta de ID da ong", async()=>{

        const nome_categoria = "Brinquedos"

        req = {
            ongId: null,
            body: {
                nome_categoria: nome_categoria
            },
            query: {}
        }

        await categoryController.createCategories(req,res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({
            message: 'Nome e/ou ID da ONG não podem ser nulos.'
        })
    })

    test("4 - Erro ao tentar salvar categoria", async()=>{

        const newOng = await ong.create({
            id_gov: 1234,
            nome: "Alguma coisa foundation"
        })

        const newUser = await User.create({
            id_ong: newOng._id,
            email: 'userteste1@email.dom',
            nome: 'user teste'
            })    

        const Session = await session.create({
              id_usuario: newUser._id,
              id_ong: newUser.id_ong,
              nome_usuario: newUser.nome,
              token: "token_valido_123",
            });

        const nome_categoria = "Vestimentas"

        req = {
            ongId: Session.id_ong,
            body: {
                nome_categoria: nome_categoria
            },
            query: {}
        }
        mongoose.connection.close()

        await categoryController.createCategories(req,res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json)

        await mongoose.connect(process.env.MONGO_URI_TEST);
    })

})

describe("3. Testes de atualização de categorias", ()=>{

    let save,res;
    beforeEach(async()=>{

        const newOng = await ong.create({
            id_gov: 1234,
            nome: "Alguma coisa foundation"
        })

        const newUser = await User.create({
            id_ong: newOng._id,
            email: 'userteste1@email.dom',
            nome: 'user teste'
            })    

        const Session = await session.create({
              id_usuario: newUser._id,
              id_ong: newUser.id_ong,
              nome_usuario: newUser.nome,
              token: "token_valido_123",
            });

        const Categoria = await Cat.create({
            nome_categoria: "Utensílio de cozinha",
            id_ong: req.ongId
        });
        
        save = {
            id_ong: Categoria.id_ong,
            id_cat: Categoria.id
        }
        
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
            };

    })

    afterEach(async()=>{
        await ong.deleteMany({})
        await Cat.deleteMany({})
        await User.deleteMany({})
        await session.deleteMany({})
    })

    test("1 - Atualização de categoria bem sucedida", async()=>{

        const nome_update = "Ingredientes"

        req = {
            ongId: save.id_ong,
            body: {
                nome_categoria: nome_update
            },
            params: {
                id_categoria: save.id_cat
            }
        }

        await categoryController.updateCategories(req,res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({
           message: "Categoria atualizada com sucesso!"
        })
    })

    test("2 - Id da categoria inválido", async()=>{

        const nome_categoria = "Produtos de limpeza"

        req = {
            ongId: save.id_ong,
            body: {
                nome_categoria: nome_categoria
            },
            params: {
                id_categoria: null
            }
        }

        await categoryController.updateCategories(req,res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({
            message: "ID inválido."
        })
    })

    test("3 - Nome da categoria vazio", async()=>{

        req = {
            ongId: save.id_ong,
            body: {
                nome_categoria: null
            },
            params: {
                id_categoria: save.id_cat
            }
        }

        await categoryController.updateCategories(req,res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({
            message: "Nome precisa ser preenchido."
        })
    })

    test("4 - Erro ao tentar atualizar a categoria", async()=>{

        const nome_categoria = "Material de construção"

        req = {
            ongId: save.id_ong,
            body: {
                nome_categoria: nome_categoria
            },
            params: {
                id_categoria: save.id_cat
            }
        }

        await mongoose.connection.close()

        await categoryController.updateCategories(req,res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json)

        await mongoose.connect(process.env.MONGO_URI_TEST);
    })
})

describe("4. Testes de deleção de categorias", ()=>{
    let req,res;
    beforeEach(async()=>{

        const newOng = await ong.create({
            id_gov: 1234,
            nome: "Alguma coisa foundation"
        })

        const newUser = await User.create({
            id_ong: newOng._id,
            email: 'userteste1@email.dom',
            nome: 'user teste'
            })    

        const Session = await session.create({
              id_usuario: newUser._id,
              id_ong: newUser.id_ong,
              nome_usuario: newUser.nome,
              token: "token_valido_123",
            });

        save = {
            ongId: Session.id_ong
        }

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
            };

    })

    afterEach(async()=>{
        await Cat.deleteMany({})
        await ong.deleteMany({})
        await session.deleteMany({})
        await User.deleteMany({})
    })

    test("1 - Deleção de categorias bem-sucedida", async()=>{

        const create = await Cat.create({
            nome_categoria: "Utensílio de cozinha",
            id_ong: save.ongId
        })

        req = {
            ongId: save.ongId,
            params: {
                id_categoria: create.id
            }
        }

        await categoryController.deleteCategories(req,res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({
            message: "Categoria deletada com sucesso."
        })
    })

    test("2 - Id da categoria inválido", async()=>{

        const create = await Cat.create({
            nome_categoria: "Utensílio de cozinha",
            id_ong: save.ongId
        })

        req = {
            ongId: create.id_ong,
            params: {
                id_categoria: null
            }
        }

        await categoryController.deleteCategories(req,res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({
            message: "ID inválido."
        })
    })

    test("3 - Erro ao tentar deletar a categoria", async()=>{
        const create = await Cat.create({
            nome_categoria: "Utensílio de cozinha",
            id_ong: save.ongId
        })

        req = {
            ongId: create.id_ong,
            params: {
                id_categoria: create.id
            }
        }

        await mongoose.connection.close()

        await categoryController.deleteCategories(req,res)

        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json)

        await mongoose.connect(process.env.MONGO_URI_TEST)
    })
})