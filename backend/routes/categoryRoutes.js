const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

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
router.post('/adicionar-categorias', (req,res,next)=>{
    res.status(201).send(req.body)
});

//rotas para atualizar categorias
router.put('/atualizar-categorias/:id', (req,res,next)=>{
    const id = req.params.id;
    res.status(200).send({
        id: id,
        item: req.body
    });
});

//rotas para apagar categorias
router.delete('/apagar-categorias/:id', (req,res,next)=>{
    const id = req.params.id;
    res.status(200).send({
        id: id,
        item:req.body
    })
})


module.exports = router;

