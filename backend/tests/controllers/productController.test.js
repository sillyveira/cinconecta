// TESTE ESCRITO POR THIAGO FERNANDES <tfls> (visualizar, criar, deletar, atualizar) e WESLEY SILVEIRA <@wslc> (visualizar)
const request = require("supertest");
const mongoose = require("mongoose");
const { app } = require("../../server"); 
const User = require("../../models/User");
const Ong = require("../../models/Ong");
const Session = require("../../models/Session");
const Product = require("../../models/Product");
const Category = require("../../models/Category");
const { view_product, create_product, delete_product } = require("../../controllers/productController");
const auditController = require("../../controllers/auditController");
require("dotenv").config({ path: "../../.env" });

describe("Product Controller (produtos)", () => {
  let req, res;

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeAll(async () => {
    await Ong.deleteMany();
    await User.deleteMany();
    await Session.deleteMany();
    await Category.deleteMany();

    const ong = await Ong.create({ id_gov: 123, nome: "ONG Existente" });
    const user = await User.create({
      email: "teste@email.com",
      nome: "Usuário Teste",
      id_ong: ong._id,
    });
    const session = await Session.create({
      id_usuario: user._id,
      id_ong: ong._id,
      nome_usuario: user.nome,
      token: "token_valido_123",
    });
    const category = await Category.create({
      nome_categoria: "Categoria teste",
      id_ong: session.id_ong,
    });

    req = {
      token: session.token,
      ongId: session.id_ong,
      userId: user._id,
      nomeUsuario: session.nome_usuario,
      nomeCategoria: category.nome_categoria,
      idCategoria: category._id,
      query: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  beforeEach(async () => {
    await Product.deleteMany();
    jest.spyOn(auditController, "criarLog").mockImplementation(() => {});
  });
  describe("Casos de teste Visualizar produto", () => {
    test("Ver produto - exibe todos os produtos adicionados", async () => {
      const produto_teste_1 = await Product.create({
        id_categoria: req.idCategoria,
        id_ong: req.ongId,
        nome: "Arroz",
        descricao: "Pacote de arroz 5kg",
        quantidade: 10,
        validade: "2025-12-30T00:00:00.000Z",
        valor: 20,
        codbarras: "123456789",
      });
      
      const produto_teste_2 = await Product.create({
        id_categoria: req.idCategoria,
        id_ong: req.ongId,
        nome: "Carne",
        descricao: "1kg de carne",
        quantidade: 2,
        validade: "2025-06-20T00:00:00.000Z",
        valor: 54.70,
        codbarras: "123456789",
      })
     
      await view_product(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      
      //Espera o retorno dos dois produtos adicionados(sem filtro = exibe todos sem diferenças)
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        produtos: [
          {
            _id: produto_teste_1._id,
            id_categoria: req.idCategoria,
            id_ong: req.ongId,
            nome: "Arroz",
            nome_categoria: "Categoria teste",
            descricao: "Pacote de arroz 5kg",
            quantidade: 10,
            validade: "29/12/2025",
            valor: 20,
            codbarras: "123456789",
          }, {
            _id: produto_teste_2._id,
            id_categoria: req.idCategoria,
            id_ong: req.ongId,
            nome: "Carne",
            nome_categoria: "Categoria teste",
            descricao: "1kg de carne",
            quantidade: 2,
            validade: "19/06/2025",
            valor: 54.70,
            codbarras: "123456789",
          }
        ],
      });
    })

    test("Ver produtos(filtro) - exibe todos os produtos adicionados que são parte da mesma categoria", async () => {
      const req_copia = { ...req } // copia da requisição pra armazenar o valor do id categoria do produto_distinto
      req_copia.idCategoria =  new mongoose.Types.ObjectId() // gera um id_categoria diferente pra variável produto_distinto
      
      const produto_teste_1 = await Product.create ({
        id_categoria: req.idCategoria,
        id_ong: req.ongId,
        nome: "fraudas",
        descricao: "Pamperes",
        quantidade: 10,
        validade: "2025-12-30T00:00:00.000Z",
        valor: 19.99,
        codbarras: "123456789",
      })
     
      const produto_teste_2 = await Product.create({
        id_categoria: req.idCategoria,
        id_ong: req.ongId,
        nome: "leite",
        descricao: "marca Minho",
        quantidade: 3,
        validade: "2025-12-30T00:00:00.000Z",
        valor: 5.50,
        codbarras: "123456789",
      })
      
      // O json não vai retornalo pois o produto possui uma categoria diferente dos outros, o teste não terá erros.
      const produto_distinto = await Product.create({
        id_categoria: req_copia.idCategoria, //id categoria diferente dos outros dois produtos
        id_ong: req.ongId,
        nome: "armario",
        descricao: "duas portas",
        quantidade: 1,
        validade: "2025-12-30T00:00:00.000Z",
        valor: 200.00,
        codbarras: "123456745",
      })
      
      req.query = { id_categoria: req.idCategoria } // garante que apenas produtos que possuem o id_categoria original sejam retornados
      
      await view_product(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        produtos: [
          {
            _id: produto_teste_1._id,
            id_categoria: req.idCategoria,
            id_ong: req.ongId,
            nome: "fraudas",
            nome_categoria: "Categoria teste",
            descricao: "Pamperes",
            quantidade: 10,
            validade: "29/12/2025",
            valor: 19.99,
            codbarras: "123456789",
          }, {
            _id: produto_teste_2._id,
            id_categoria: req.idCategoria,
            id_ong: req.ongId,
            nome: "leite",
            nome_categoria: "Categoria teste",
            descricao: "marca Minho",
            quantidade: 3,
            validade: "29/12/2025",
            valor: 5.50,
            codbarras: "123456789",
          }
        ]
      })
    })

    test("Ver produto(filtro) - exibe todos os produtos adicionados que possuem a mesma data de validade", async() => {
      

      const produto_teste_a = await Product.create({
        id_categoria: req.idCategoria,
        id_ong: req.ongId,
        nome: "goiabada",
        descricao: "recebemos goiabada em quantidade mais que suficiente",
        quantidade: 45,
        validade: "2025-12-30T00:00:00.000Z",
        valor: 70.00,
        codbarras: "123456789",
      })

      const produto_teste_b = await Product.create({
        id_categoria: req.idCategoria,
        id_ong: req.ongId,
        nome: "farinha",
        descricao: "5 kg de farinha",
        quantidade: 5,
        validade: "2025-12-30T00:00:00.000Z",
        valor: 35.00,
        codbarras: "123456789",
      })
      

      await view_product(req, res)
      req.query = { validade: produto_teste_a.validade }
      console.log(await Product.find())

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        produtos: [
           {
            _id: produto_teste_a._id,
            id_categoria: req.idCategoria,
            id_ong: req.ongId,
            nome: "goiabada",
            nome_categoria: "Categoria teste",
            descricao: "recebemos goiabada em quantidade mais que suficiente",
            quantidade: 45,
            validade: "29/12/2025",
            valor: 70.00,
            codbarras: "123456789",
          }, {
            _id: produto_teste_b._id,
            id_categoria: req.idCategoria,
            id_ong: req.ongId,
            nome: "farinha",
            nome_categoria: "Categoria teste",
            descricao: "5 kg de farinha",
            quantidade: 5,
            validade: "29/12/2025",
            valor: 35.00,
            codbarras: "123456789",
          }
        ]
      })
    })
  })

  describe("Casos de teste criação de produtos", () => {
    test("Criar produto - deve adicionar um produto ao banco de dados", async () => {
      req.body = {
        id_categoria: req.idCategoria,
        nome: "Feijão",
        descricao: "Pacote de feijão 5kg",
        quantidade: 10,
        validade: "2025-12-30T00:00:00.000Z",
        valor: 20,
        codbarras: "123056789",
        id_usuario: req.userId,
      };
      
      await create_product(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Produto criado com sucesso.",
      });

      expect(auditController.criarLog).toHaveBeenCalledWith(
        "add",
        req.userId,
        req.nomeUsuario,
        req.ongId,
        expect.objectContaining({
          novoProduto: expect.any(Object),
          entrada: expect.any(Number),
          saida: 0,
          valor: expect.any(Number)
        })
      );

    })
    
    test("Ciar produto - adicionar produto com campos opicionais possuindo valores não convencionais", async() => {
      req.body = {
        id_categoria: req.idCategoria,
        nome: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        descricao: 77,
        quantidade: 78.87,
        validade: null,
        valor: 0.1,
        codbarras: "123056789",
        id_usuario: req.userId,
      }

      await create_product(req, res)
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Produto criado com sucesso."
      })

      expect(auditController.criarLog).toHaveBeenCalledWith(
        "add",
        req.userId,
        req.nomeUsuario,
        req.ongId,
        expect.objectContaining({
          novoProduto: expect.any(Object),
          entrada: expect.any(Number),
          saida: 0,
          valor: expect.any(Number)
        })
      );
    })


    test("Falha(Criar produto) - produto sem nome", async () => {
      req.body = {
        id_categoria: req.idCategoria,
        id_ong: req.ongId,
        nome: null || undefined || "",
        descricao: "Pacote de feijão 5kg",
        quantidade: 8,
        validade: "2025-12-30T00:00:00.000Z",
        valor: 20,
        codbarras: "123456749",
        id_usuario: req.userId,
      };
     
      await create_product(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "Campos obrigatórios." });
    });

    test("Falha(Criar produto) - produto sem quantidade", async () => {
      req.body = {
        id_categoria: req.idCategoria,
        id_ong: req.ongId,
        nome: "Manga",
        descricao: "Pacote de Manga 5kg",
        quantidade: null || undefined || "",
        validade: "2025-12-30T00:00:00.000Z",
        valor: 20,
        codbarras: "123456749",
        id_usuario: req.userId,
      };

      await create_product(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "Campos obrigatórios." });

      // Verifica se o produto não foi salvo no banco de dados
      const produtoCriado = await Product.findOne({ nome: req.body.nome });
      expect(produtoCriado).toBeNull();
    });

    test("Falha(criar produto) - id do usuário inválido", async () => {
      const req_copia_ = { ...req }
      req.userId = "id user inválido"
      req.body = {
        id_categoria: req.idCategoria,
        nome: "Arroz",
        quantidade: 10,
        descricao: "Pacote de arroz 5kg",
        validade: "2025-12-30T00:00:00.000Z",
        valor: 20,
        codbarras: "123456789",
        id_usuario: req_copia_.userId,
      };

      await create_product(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "ID de usuário inválido." });
    });

    test("Falha(criar produto) - Id ong inválido", async () => {
      const req_copy = { ...req }
      req.ongId = "id inválido"
      
      req.body = {
        id_categoria: req.idCategoria,
        id_ong: req.ongId,
        id_usuario: req.userId,
        nome: "Leite",
        descricao: "Caixa de leite 1L",
        quantidade: 5,
        validade: "2025-06-20T00:00:00.000Z",
        valor: 7,
        codbarras: "456123789",
      };

      await create_product(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: "ID de ONG inválido." });
    });

  });

});

