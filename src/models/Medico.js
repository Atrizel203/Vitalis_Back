const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.config');

const Medico = sequelize.define('Medico', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  especialidad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'medicos',
  timestamps: false,
});

module.exports = Medico;
