const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.config');

const Analisis = sequelize.define('Analisis', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resultado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  pacienteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'pacientes', // Nombre de la tabla de Pacientes
      key: 'id',
    }
  },
}, {
  tableName: 'analisis',
  timestamps: false,
});

module.exports = Analisis;
