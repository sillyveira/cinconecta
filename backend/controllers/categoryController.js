const categories = require('../models/Category')
const mongoose = require('mongoose')

class CategoryController{

    async getCategories(req, res){
      //const id_ong = req.id_ong

      try{
        const categorias = await categories.find();
        return res.end(JSON.stringify(categorias))

     }catch(error){
            res.status(400).send(error.message)
        }
    }

    async createCategories(req, res){
        const { nome_categoria } = req.body

        try{
            const categorias = new categories({
                id_categoria: new mongoose.Types.ObjectId,
                nome_categoria: nome_categoria
            })
            await categorias.save()
            return res.status(201).end('categoria criada com sucesso!')

        }catch(error){
            res.status(400).send(error.message)
        }
    }

    async updateCategories(req, res){
        const {nome_categoria} = req.body
        const {id_categoria} = req.params

        if(!mongoose.Types.ObjectId.isValid(id_categoria)){
            return res.status(400).end('ID inválido.')
        }

        try{
           await categories.findOneAndUpdate( 
            {id_categoria},
            {$set: {nome_categoria: nome_categoria}},
            {new: true}
        )
            return res.status(200).end('Categoria atualizada com sucesso!')
        }catch(error){
            res.status(400).send(error.message)
        }
    }

    async deleteCategories(req,res){
        const {id_categoria} = req.params

        if(!mongoose.Types.ObjectId.isValid(id_categoria)){
            return res.status(400).end('ID inválido.')
        }

        try{
            await categories.findOneAndDelete({id_categoria})
            return res.status(200).end('Categoria deletada com sucesso.')
        }catch(error){
            res.status(400).end(error.message)
        }
    }

}

module.exports = new CategoryController()

//TODO: adicionar id de ongs e filtrar