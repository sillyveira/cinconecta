// TESTE ESCRITO POR WESLEY SILVEIRA <@wslc>
const request = require("supertest");
const mongoose = require("mongoose");
const { app } = require("../../server"); // Certifique-se de exportar o app no seu servidor
const User = require("../../models/User");
const Ong = require("../../models/Ong");
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const Audit = require("../../models/Audit");
const Session = require("../../models/Session");
const { revogarSessao } = require("../../services/sessionService");
const { logout, members } = require("../../controllers/userController");
require("dotenv").config({ path: "../../.env" });

describe("UserController (Autenticação)", () => {
  let mock;
  beforeAll(async () => {
    mock = new MockAdapter(axios);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany();
    await Ong.deleteMany();
    await Audit.deleteMany();
    await Session.deleteMany();
    mock.reset();
  });

  test("Login - deve retornar erro para credenciais inválidas", async () => {
    mock.onPost(process.env.API_LINK).reply(404, {
      message: "Credenciais inválidas",
    });

    const res = await request(app)
      .post("/usuarios/login")
      .send({ email: "erro@email.com", password: "senhaerrada" });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Credenciais inválidas");
  });

  // Testes de registro
  test("Registro - deve criar novo usuário e nova ong", async () => {
    // Mock da resposta da API do BoraImpactar
    mock.onPost(process.env.API_LINK).reply(200, {
      message: "Login bem-sucedido",
      user: { name: "Usuário Teste" },
      ngo: { id: "123", name: "ONG Teste" },
    });

    //Ter certeza que é o primeiro registro do usuário:
    const userExiste = await User.findOne({ email: "teste@gmail.com" });
    expect(userExiste).toBeNull();

    // Ter certeza que a ONG não existe:
    const ongExiste = await Ong.findOne({ id_gov: 123 });
    expect(ongExiste).toBeNull();

    // Execução da rota
    const res = await request(app)
      .post("/usuarios/login")
      .send({ email: "teste@email.com", password: "senha123" });

    expect(res.status).toBe(200); // A resposta deve ser 200

    //A resposta deve conter obrigatoriamente os seguintes campos:
    expect(res.body).toHaveProperty("userid"); //
    expect(res.body.username).toBe("Usuário Teste");
    expect(res.body.email).toBe("teste@email.com");
    expect(res.body.ongname).toBe("ONG Teste");

    // Verifica se o cookie foi setado
    expect(res.headers["set-cookie"]).toBeDefined();

    // Confere se o usuário foi salvo no banco
    const user = await User.findOne({ email: "teste@email.com" });
    expect(user).not.toBeNull();
    expect(user.nome).toBe("Usuário Teste");

    // Confere se a ONG foi salva no banco
    const ong = await Ong.findOne({ id_gov: 123 });
    expect(ong).not.toBeNull();

    // Confere se o registro de auditoria foi salvo no banco
    const audit = await Audit.findOne({ acao: "reg" });
    expect(audit).not.toBeNull();

    // Verifique se a sessão foi criada corretamente
    const session = await Session.findOne({ id_usuario: user._id });

    expect(session).not.toBeNull();
    expect(session.token).toBeDefined(); // O token deve estar presente
    expect(session.expira_em).toBeInstanceOf(Date); // Deve ter uma data de expiração válida
  });

  test("Registro - deve criar um novo usuário em uma ong pré-existente", async () => {
    // Mock da resposta da API do BoraImpactar
    mock.onPost(process.env.API_LINK).reply(200, {
      message: "Login bem-sucedido",
      user: { name: "Novo Usuário" },
      ngo: { id: "456", name: "ONG Existente" },
    });

    // Criar uma ONG pré-existente no banco antes do teste
    await Ong.create({ id_gov: 456, nome: "ONG Existente" });

    // Ter certeza que a ONG já existe
    const ongExiste = await Ong.findOne({ id_gov: 456 });
    expect(ongExiste).not.toBeNull();
    expect(ongExiste.nome).toBe("ONG Existente");

    // Ter certeza que o usuário ainda não existe
    const userExiste = await User.findOne({ email: "novo.usuario@email.com" });
    expect(userExiste).toBeNull();

    // Execução da rota
    const res = await request(app)
      .post("/usuarios/login")
      .send({ email: "novo.usuario@email.com", password: "senha123" });

    expect(res.status).toBe(200); // A resposta deve ser 200

    // A resposta deve conter obrigatoriamente os seguintes campos:
    expect(res.body).toHaveProperty("userid");
    expect(res.body.username).toBe("Novo Usuário");
    expect(res.body.email).toBe("novo.usuario@email.com");
    expect(res.body.ongname).toBe("ONG Existente");

    // Verifica se o cookie foi setado
    expect(res.headers["set-cookie"]).toBeDefined();

    // Confere se o usuário foi salvo no banco
    const user = await User.findOne({ email: "novo.usuario@email.com" });
    expect(user).not.toBeNull();
    expect(user.nome).toBe("Novo Usuário");

    // Confere se a ONG continua existindo
    const ongAposLogin = await Ong.findOne({ id_gov: 456 });
    expect(ongAposLogin).not.toBeNull();
    expect(ongAposLogin.nome).toBe("ONG Existente");

    // Confere se o registro de auditoria foi salvo no banco
    const audit = await Audit.findOne({ acao: "reg" });
    expect(audit).not.toBeNull();

    // Confere se a sessão foi criada corretamente
    const session = await Session.findOne({ id_usuario: user._id });

    expect(session).not.toBeNull();
    expect(session.token).toBeDefined(); // O token deve estar presente
    expect(session.expira_em).toBeInstanceOf(Date); // Deve ter uma data de expiração válida
  });
  //

  // Testes de login
  test("Login - deve autenticar um usuário existente e criar uma sessão", async () => {
    // Mock da resposta da API do BoraImpactar
    mock.onPost(process.env.API_LINK).reply(200, {
      message: "Login bem-sucedido",
      user: { name: "Usuário Teste" },
      ngo: { id: "123", name: "ONG Existente" },
    });

    // Criando um usuário e uma ONG no banco antes do teste
    const ong = await Ong.create({ id_gov: 123, nome: "ONG Existente" });
    const user = await User.create({
      email: "teste@email.com",
      nome: "Usuário Teste",
      id_ong: ong._id,
    });

    // Execução da rota de login
    const res = await request(app)
      .post("/usuarios/login")
      .send({ email: "teste@email.com", password: "senha123" });

    expect(res.status).toBe(200);

    // Verifique se o corpo da resposta contém as informações corretas
    expect(res.body.username).toBe("Usuário Teste");
    expect(res.body.ongname).toBe("ONG Existente");

    // Verifique se um cookie de sessão foi setado
    expect(res.headers["set-cookie"]).toBeDefined();

    // Confere se o registro de auditoria foi salvo no banco
    const audit = await Audit.findOne({ acao: "log" });
    expect(audit).not.toBeNull();

    // Verifique se uma sessão foi criada no banco de dados
    const session = await Session.findOne({ id_usuario: user._id });

    expect(session).not.toBeNull();
    expect(session.token).toBeDefined();
    expect(session.expira_em).toBeInstanceOf(Date);
  });

  test("Login - deve autenticar um usuário existente com sessão criada", async () => {
    // Mock da resposta da API do BoraImpactar
    mock.onPost(process.env.API_LINK).reply(200, {
      message: "Login bem-sucedido",
      user: { name: "Usuário Teste" },
      ngo: { id: "123", name: "ONG Existente" },
    });

    // Criando uma ONG no banco
    const ong = await Ong.create({ id_gov: 123, nome: "ONG Existente" });

    // Criando um usuário no banco
    const user = await User.create({
      email: "teste@email.com",
      nome: "Usuário Teste",
      id_ong: ong._id,
    });

    // Criando uma sessão para o usuário
    const session = await Session.create({
      id_usuario: user._id,
      id_ong: ong._id,
      nome_usuario: user.nome,
      token: "token_valido_123",
    });

    // Garantir que a sessão foi criada
    const sessionExists = await Session.findOne({ id_usuario: user._id });
    expect(sessionExists).not.toBeNull();
    expect(sessionExists.token).toBe("token_valido_123");

    // Execução da rota de login
    const res = await request(app)
      .post("/usuarios/login")
      .send({ email: "teste@email.com", password: "senha123" });

    // Verificar se a resposta é bem-sucedida (200)
    expect(res.status).toBe(200);

    // Verifique se o corpo da resposta contém as informações corretas
    expect(res.body.username).toBe("Usuário Teste");
    expect(res.body.ongname).toBe("ONG Existente");
    console.log("RES BODY MESSAGE:")
    console.log(res.body.message);
    expect(res.body.message).toBe("O usuário já está logado."); // [Parte mais importante do teste]

    // Verifique se um cookie de sessão foi setado
    expect(res.headers["set-cookie"]).toBeDefined();
  });

  test("Logout - Deve revogar a sessão e limpar o cookie do cliente.", async () => {
    // Criação do usuário e sua sessão:
    mock.onPost(process.env.API_LINK).reply(200, {
      message: "Login bem-sucedido",
      user: { name: "Usuário Teste" },
      ngo: { id: "123", name: "ONG Teste" },
    });

    const registrarUsuario = await request(app)
      .post("/usuarios/login")
      .send({ email: "teste@email.com", password: "senha123" });

    const user = await User.findOne({ email: "teste@email.com" });

    const session = await Session.findOne({ id_usuario: user._id });
    expect(session).not.toBeNull();

    // Criação da sessão e token falso.
    let req, res;
    req = { token: session.token };
    res = {
      clearCookie: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await logout(req, res);
    expect(res.clearCookie).toHaveBeenCalledWith("token");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "A sessão foi revogada com sucesso.",
    });

    const acharSessao = await Session.findOne({
      id_usuario: user._id,
    });

    expect(acharSessao).toBeNull();
  });

  test("Membros da ONG - Deve retornar todos os membros de uma ONG", async () => {
    // Criando uma ONG no banco
    const ong = await Ong.create({ id_gov: 123, nome: "ONG Existente" });

    // Criando um usuário no banco
    const user = await User.create({
      email: "teste@email.com",
      nome: "Usuário Teste",
      id_ong: ong._id,
    });

    const user2 = await User.create({
      email: "teste2@email.com",
      nome: "Usuário Teste 2",
      id_ong: ong._id,
    });

    req = { ongId: ong._id };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const listaMembros = await User.find({id_ong: ong._id});
    await members(req, res);
    
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message:'Os membros foram retornados com sucesso.',
      membros: listaMembros
    })
  });
});
