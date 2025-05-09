const mongoose = require('mongoose');

// Definindo esquema do produto
const productSchema = new mongoose.Schema({
  id_categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: false },
  nome_categoria: {type: String, required: false},
  id_ong: { type: mongoose.Schema.Types.ObjectId, ref: 'Ong', required: true },
  nome: { type: String, required: true, maxlength: [40, "O nome do produto não pode ter mais que 40 caracteres."] },
  descricao: { type: String, required: false, maxlength:[200, "A descrição do produto não pode ultrapassar 200 caracteres."] },
  quantidade: { type: Number, required: true, max:[100000, "A quantidade máxima é 100.000"] },
  validade: { type: Date, required: false },
  valor: { type: Number, required: false, max:[1000000000, "O valor máximo é de R$ 1.000.000.000"] },
  codbarras: { type: String, required: false, maxlength: [20, "O código de barras do produto não pode ultrapassar 20 caracteres."] }
});

// Criando modelo do produto
const Product = mongoose.model('Product', productSchema, 'produtos');

module.exports = Product;
