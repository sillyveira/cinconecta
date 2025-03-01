const mongoose = require("mongoose");
const {server} = require("../server")
require("dotenv").config({ path: "../../.env" }); 
const { pararScheduler } = require("../services/timerService");

beforeAll(async () => { 
    await mongoose.connection.close(); //Fecha a conexão com o banco real
    await mongoose.connect(process.env.MONGO_URI_TEST); // Conecta no banco de testes
});

beforeEach(async ()=>{
  server.close(); // Fecha o servidor para poder abrir novamente a cada test suite
  pararScheduler(); // Para o timerService
})


afterAll(async () => {
  await mongoose.connection.close(); // Fecha a conexão com o banco
  server.close(); // Fecha o servidor
  pararScheduler(); // Para o timerService
});
