// usuario.model.js
const { Sequelize, DataTypes } = require('sequelize');
const  sequelize = require('../config/database.config'); // <-- Importación con llaves
const bcrypt = require('bcryptjs');

// Define el modelo
const Usuario = sequelize.define('Usuario', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Método para encriptar la contraseña antes de guardar
Usuario.beforeCreate(async (usuario) => {
  const salt = await bcrypt.genSalt(10);
  usuario.password = await bcrypt.hash(usuario.password, salt);
});

module.exports = Usuario;
