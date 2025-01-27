const db = require('./db')

const User = db.sequelize.define('TABELA', {
    name: {
        type: db.Sequelize.STRING(255),
        allowNull: false 
    },
    email: {
        type: db.Sequelize.STRING(255),
        allwNull: false,
        unique: true
    },
    password: {
        type: db.Sequelize.TEXT,
        allowNull: false
    }
})

module.exports = User