// models/Reserva.js
const {sequelize} = require('../config/config');
const DataTypes = require('sequelize');

const modelVeiculos = sequelize.define('Veiculo');
const modelClientes = sequelize.define('Clientes');
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
  },
  id_cliente_reserva: {
    type: DataTypes.INTEGER,
    allowNull: true,  // Caso você queira que possa ser nulo
  },
},{

  tableName: 'Reserva',  // Nome da tabela no banco de dados
  timestamps: false,     // Desativa as colunas createdAt e updatedAt
});


modelReserva.hasMany(modelVeiculos, {
  foreignKey: 'id_veiculo',
  as: 'Veiculo'
});

modelVeiculos.belongsTo(modelReserva, {
  foreignKey: 'id_veiculo',
  as: 'Reserva'
});


modelClientes.hasMany(modelReserva, {
  foreignKey: 'id_cliente',
  as: 'Reserva'
});

modelReserva.belongsTo(modelClientes, {
  foreignKey: 'id_cliente',
  as: 'Cliente'
});

module.exports = { modelReserva };