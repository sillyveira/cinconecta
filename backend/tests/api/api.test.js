const { app, server } = require("../../server");
const axios = require("axios");
const request = require("supertest");
require("dotenv").config({ path: "../../.env" });
describe("API TEST", () => {
  test("Login - API do BoraImpactar", async () => {
    // Teste com credenciais inválidas
    try {
      await axios.post(process.env.API_LINK, {
        email: "teste.cin-ufpe@emailinvalido.com",
        password: "senha_invalida",
      });

      expect(error.response.status).toBe(404);
    } catch (error) {
      expect(error.response?.status).toBe(401);
    }

    // Teste com credenciais corretas
    try {
      const response = await axios.post(process.env.API_LINK, {
        email: "apiteste@rdmapps.com.br",
        password: "123456",
      });
    
      expect(response.status).toBe(200);
    } catch (error) {
        throw new Error("O endereço provavelmente está fora de ar.");
    }
  });

});
