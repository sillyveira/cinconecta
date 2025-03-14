// TESTE ESCRITO POR WESLEY SILVEIRA <@wslc>
const request = require("supertest");
const mongoose = require("mongoose");
const { app } = require("../../server"); // Certifique-se de exportar o app no seu servidor
const User = require("../../models/User");
const Ong = require("../../models/Ong");
const axios = require("axios");
const Audit = require("../../models/Audit");
const Session = require("../../models/Session");
const Product = require("../../models/Product");
const Category = require("../../models/Category");
const { view_product } = require("../../controllers/productController");
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

    // Criando o usuário:
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
        id_ong: session.id_ong
    })

    req = {
      token: session.token,
      ongId: session.id_ong,
      nomeUsuario: session.nome_usuario,
      nomeCategoria: category.nome_categoria,
      idCategoria: category._id,
      query: {}
    };

    res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  });
  beforeEach(async () => {
    await Product.deleteMany();
  });

  test("Ver produto - deve retornar todos os produtos adicionados", async () => {
    
    const produtoFake = await Product.create({
            id_categoria: req.idCategoria,
            id_ong: req.ongId,
            nome: "Arroz",
            descricao: "Pacote de arroz 5kg",
            quantidade: 10,
            validade: "2025-12-30T00:00:00.000Z",
            valor: 20,
            codbarras: "123456789",
    })


    await view_product(req, res); 
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      produtos: [
        {
          _id: produtoFake._id,
          id_categoria: req.idCategoria,
          nome_categoria: "Categoria teste",
          id_ong: req.ongId,
          nome: "Arroz",
          descricao: "Pacote de arroz 5kg",
          quantidade: 10,
          validade: "29/12/2025",
          valor: 20,
          codbarras: "123456789",
        },
      ],
    });

  });
});
