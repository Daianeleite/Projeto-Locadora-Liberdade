// models/Reserva.js
const {sequelize} = require('../config/config');
const DataTypes = require('sequelize');

const {modelVeiculo} = require('./modelVeiculo');
const {modelClientes} = require('./modelClientes');

const modelReserva = sequelize.define('Reserva', {

  id_reserva: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  data_reserva: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  data_inicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  data_fim: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status_reserva: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  id_veiculo_reserva: {
    type: DataTypes.INTEGER,
    allowNull: true,  // Caso você queira que possa ser nulo
    foreignKey: true
  },
  id_cliente_reserva: {
    type: DataTypes.INTEGER,
    allowNull: true,  // Caso você queira que possa ser nulo
    foreignKey: true
  }
},{

  tableName: 'Reserva',  // Nome da tabela no banco de dados
  timestamps: false,     // Desativa as colunas createdAt e updatedAt
});


// Um veículo pode ter muitas reservas
modelVeiculo.hasMany(modelReserva, {
  foreignKey: 'id_veiculo_reserva', // Campo na tabela `Reserva`
  sourceKey: 'id_veiculos',         // Chave primária na tabela `Veiculos`
  as: 'Reservas',
});

// Uma reserva pertence a um veículo
modelReserva.belongsTo(modelVeiculo, {
  foreignKey: 'id_veiculo_reserva', // Campo na tabela `Reserva`
  targetKey: 'id_veiculos',         // Chave primária na tabela `Veiculos`
  as: 'Veiculo',
});



// Um cliente pode ter muitas reservas
modelClientes.hasMany(modelReserva, {
  foreignKey: 'id_cliente_reserva', // Campo na tabela `Reserva`
  sourceKey: 'id_cliente',          // Chave primária na tabela `Clientes`
  as: 'Reservas',
});

// Uma reserva pertence a um cliente
modelReserva.belongsTo(modelClientes, {
  foreignKey: 'id_cliente_reserva', // Campo na tabela `Reserva`
  targetKey: 'id_cliente',          // Chave primária na tabela `Clientes`
  as: 'Cliente',
});


module.exports = { modelReserva };