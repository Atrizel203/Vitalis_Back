// src/models/Paciente.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.config');
const Analisis = require('./Analisis');

const Paciente = sequelize.define('Paciente', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_nacimiento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sexo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  domicilio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Paciente;


Paciente.hasMany(Analisis, { foreignKey: 'pacienteId' });
Analisis.belongsTo(Paciente, { foreignKey: 'pacienteId' });


module.exports = Paciente;
