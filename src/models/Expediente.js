// src/models/Expediente.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.config');
const Paciente = require('./Paciente');
const Medico = require('./Medico'); // Importa el modelo Medico

const Expediente = sequelize.define('Expediente', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  paciente_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Paciente,
      key: 'id',
    },
    onDelete: 'CASCADE',
    allowNull: false,
  },
  medico_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Medico,
      key: 'id',
    },
    onDelete: 'SET NULL',
    allowNull: true,
  },
  fecha_creacion: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW // Asigna la fecha y hora actuales por defecto
  },
  notas: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'expedientes',
  timestamps: false,
});

// Relación entre Expediente y Paciente
Paciente.hasOne(Expediente, {
  foreignKey: 'paciente_id',
});
Expediente.belongsTo(Paciente, {
  foreignKey: 'paciente_id',
});

// Relación entre Expediente y Medico
Medico.hasMany(Expediente, {
  foreignKey: 'medico_id',
});
Expediente.belongsTo(Medico, {
  foreignKey: 'medico_id',
});

module.exports = Expediente;
