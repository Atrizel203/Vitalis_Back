const { DataTypes } = require('sequelize');
const  sequelize  = require('../config/database.config');
const Paciente = require('./Paciente');

const SignosVitales = sequelize.define('SignosVitales', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  paciente_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Paciente,
      key: 'id'
    },
    onDelete: 'CASCADE',
    allowNull: false
  },
  peso: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  altura: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  temperatura: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  presion_arterial: {
    type: DataTypes.STRING,
    allowNull: true
  },
  frecuencia_cardiaca: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  frecuencia_respiratoria: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  fecha_registro: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'signos_vitales',
  timestamps: false
});

// Definir la relación entre signos vitales y paciente
Paciente.hasMany(SignosVitales, {
  foreignKey: 'paciente_id'
});
SignosVitales.belongsTo(Paciente, {
  foreignKey: 'paciente_id'
});

module.exports = SignosVitales;
