// Camada de abstração para lidar com as Ongs.
const mongoose = require('mongoose');
const Ong = require('../models/Ong');


// const ongExiste = async(idOng) => {
//     const resultado = await Ong.findOne({id_gov: idOng});
//     if(resultado){
//         return resultado
//     } else {
//         return null;
//     }
// }