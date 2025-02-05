const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  token: { type: String, required: true, unique: true },
  expira_em: {type: Date, default: new Date(Date.now() + 15000)} // Teste
  //   expira_em: { type: Date, default: new Date(Date.now() + 1000 * 60 * 60 * 24) }, //Expira em 24 horas
});

module.exports = mongoose.model('Session', sessionSchema, 'tokens');
