const categories = require('../models/Category')
const mongoose = require('mongoose')

class CategoryController{

    async getCategories(req, res){
      
        try{
            const id_ong = req.ongId 

            const categorias = await categories.find({id_ong: id_ong})
            return res.end(JSON.stringify(categorias))

        }catch(error){
            res.status(400).send(error.message)
        }
    }

    async createCategories(req, res){
        
        try{
            const { nome_categoria } = req.body
            const id_ong = req.ongId

            if(!nome_categoria || !id_ong ){
                return res.status(401).end('nome e/ou id ong nulos.')
            }

            const categorias = new categories({
                nome_categoria: nome_categoria,
                id_ong: id_ong
            })
            await categorias.save()
            return res.status(201).end('Categoria criada com sucesso!')

        }catch(error){
            res.status(400).send(error.message)
        }
    }

    async updateCategories(req, res){
         try{
            const {nome_categoria} = req.body
            const {id_categoria} = req.params
            const id_ong = req.ongId
    
            if(!mongoose.Types.ObjectId.isValid(id_categoria)){
                return res.status(400).end('ID inválido.')
            }
            if(!id_ong){
                return res.status(404).end('Não foi possível identificar a ong.')
            }
            if(!nome_categoria){
                return res.status(401).end('Nome precisa ser preenchido.')
            }

           await categories.findOneAndUpdate( 
            {_id: id_categoria, id_ong: id_ong},
            {$set: {nome_categoria: nome_categoria}},
            {new: true}
        )
            return res.status(200).end('Categoria atualizada com sucesso!')
        }catch(error){
            res.status(400).send(error.message)
        }
    }

    async deleteCategories(req,res){
        
        try{
            const {id_categoria} = req.params
            const id_ong = req.ongId

            if(!mongoose.Types.ObjectId.isValid(id_categoria)){
                return res.status(400).end('ID inválido.')
            }
            if(!id_ong){
                return res.status(404).end('Não foi possível identificar a ong.')
            }

            await categories.findOneAndDelete({_id: id_categoria, id_ong: id_ong})
            return res.status(200).end('Categoria deletada com sucesso.')

        }catch(error){
            res.status(400).end(error.message)
        }
    }

}

module.exports = new CategoryController()
