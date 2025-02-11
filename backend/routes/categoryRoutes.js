const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const categoryController = require('../controllers/categoryController')

const app = express();

app.use(bodyParser.json()); //transforma o corpo da requisição em um arquivo JSON
//precisa instalar dependências para usar

router.get('/', (req,res,next) =>{
    res.status(200).send({
        title: "cinConecta",
        version:"0.0.1 Alpha"
    });
});

//rota para criar categorias
router.post('/adicionar-categorias', categoryController.post);

//rotas para atualizar categorias
router.put('/atualizar-categorias/:id', categoryController.put);

//rotas para apagar categorias
router.delete('/apagar-categorias/:id', categoryController.delete)


module.exports = router;

