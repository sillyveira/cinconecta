const categories = require("../models/Category");
const Product = require("../models/Product");
const mongoose = require("mongoose");
const ong = require('../models/Ong')

class CategoryController {
  async getCategories(req, res) {
    
    try {
      const id_ong = req.ongId;
      const findOng = await ong.findById(id_ong) //adicionei verificação de ongs

      if(!findOng){
        return res.status(404).json({ 
          message: "Ong não encontrada."  //mudei de res.locals para essa forma (não sei o que estava pensando)
        });

      }
      const categorias = await categories.find({ id_ong }).lean(); //bug corrigido

      return res.status(200).json({
        message: "Categorias retornadas com sucesso",
        categorias
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async createCategories(req, res) {
    try {
      const { nome_categoria } = req.body;
      const id_ong = req.ongId;

      if (!nome_categoria || !id_ong) {
        return res
          .status(400)
          .json({ message: "Nome e/ou ID da ONG não podem ser nulos." });
      }

      const novaCategoria = new categories({
        nome_categoria,
        id_ong,
      });
      await novaCategoria.save();

      return res.status(200).json({ message: "Categoria criada com sucesso!" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async updateCategories(req, res) {
    try {
      const { nome_categoria } = req.body;
      const { id_categoria } = req.params;
      const id_ong = req.ongId;

      if (!mongoose.Types.ObjectId.isValid(id_categoria)) {
        return res.status(400).json({ message: "ID inválido." });
      }
      if (!id_ong) {
        return res
          .status(400)
          .json({ message: "Não foi possível identificar a ONG." });
      }
      if (!nome_categoria) {
        return res
          .status(400)
          .json({ message: "Nome precisa ser preenchido." });
      }

      await categories.findOneAndUpdate(
        { _id: id_categoria, id_ong },
        { $set: { nome_categoria } },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "Categoria atualizada com sucesso!" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async deleteCategories(req, res) {
    try {
      const { id_categoria } = req.params;
      const id_ong = req.ongId;

      if (!mongoose.Types.ObjectId.isValid(id_categoria)) {
        return res.status(400).json({ message: "ID inválido." });
      }
      if (!id_ong) {
        return res
          .status(400)
          .json({ message: "Não foi possível identificar a ONG." });
      }

      await categories.findOneAndDelete({ _id: id_categoria, id_ong });

      try {
        await Product.updateMany(
          { id_categoria: id_categoria },
          { $set: { id_categoria: null, nome_categoria: null } }
        );
      } catch (erro) {
        console.error("Erro ao atualizar produtos:", erro);
      }

      return res
        .status(200)
        .json({ message: "Categoria deletada com sucesso." });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new CategoryController();
