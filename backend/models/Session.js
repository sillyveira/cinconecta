const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  id_usuario: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  id_ong: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Ong'},
  nome_usuario: {type: String, required: true},
  token: { type: String, required: true, unique: true },
  expira_em: { type: Date, default: new Date(Date.now() + 1000 * 60 * 60 * 24) }, //Expira em 24 horas
});


module.exports = mongoose.model('Session', sessionSchema, 'sessoes');
