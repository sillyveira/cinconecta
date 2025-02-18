const mongoose = require('mongoose');

// Definindo esquema do produto
const productSchema = new mongoose.Schema({
  id_categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: false },
  id_ong: { type: mongoose.Schema.Types.ObjectId, ref: 'Ong', required: true },
  nome: { type: String, required: true, maxlength: [40, "O nome do produto não pode ter mais que 40 caracteres."] },
  descricao: { type: String, required: false, maxlength:[200, "A descrição do produto não pode ultrapassar 200 caracteres."] },
  quantidade: { type: Number, required: true },
  validade: { type: Date, required: false },
  valor: { type: Number, required: false },
  codbarras: { type: String, required: false, maxlength: [100, "O código de barras do produto não pode ultrapassar 100 caracteres."] }
});

// Criando modelo do produto
const Product = mongoose.model('Product', productSchema, 'produtos');

module.exports = Product;
