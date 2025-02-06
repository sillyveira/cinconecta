const mongoose = require('mongoose');


const auditSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    acao: {type: String, required: true},
    desc: {type: Object, required: true},
    data: {type: Date, required: true, default: new Date()}
})

module.exports = mongoose.model('Audit', auditSchema, 'auditoria');

// para criação de novos produtos:

// try { //Tentativa de salvar o log de auditoria
//     const descricaoLog = {
//         novoProduto: novoProduto.toObject(),
//         quantidade: novoProduto.quantidade,
//         valor: novoProduto.valor || ""
//     }

//     await auditController.criarLog('add', id_usuario, descricaoLog);
//     console.log("O log do usuário [criar-produto] foi salvo.")
// } catch (err) {
//     console.log("Não foi possível salvar o log do usuário.")
// }

// para remoção de produtos:

// try {
//     const descricaoLog = {
//         produtoRemovido: produto.toObject(),
//         quantidade: `-${produto.quantidade}`,
//         valor: produto.valor ? `-${produto.valor}` : ""
//     }
//     await auditController.criarLog('del', id_usuario, descricaoLog);
// } catch (err) {
//     console.log("Não foi possível salvar o log do usuário.")
// }

// para atualização de produtos:

// try {
//     const descricaoLog = {
//         antigoProduto: anntigoProduto.toObject(),
//         novoProduto: novoProduto.toObject(),
//         quantidade: `${novoProduto - antigoProduto}`,
//         valor: antigoProduto.valor ? `${novoProduto.valor - antigoProduto.valor}` : ""
//     }
//     await auditController.criarLog('att', id_usuario, descricaoLog);
// } catch (err) {
//     console.log("Não foi possível salvar o log do usuário.")
// }

// para log de revisão:
// try {
//     const descricaoLog = {
//         quantidade: `${somaDiaria.quantidade}`,
//         valor: produto.valor ? `-${somaDiaria.valor}` : ""
//     }
//     await auditController.criarLog('rev', id_usuario, descricaoLog);
// } catch (err) {
//     console.log("Não foi possível salvar o log do usuário.")
// }

