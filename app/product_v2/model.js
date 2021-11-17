const sequelize = require('../../config/sequelize');
const { Sequelize, DataTypes } = require('sequelize');

const Products = sequelize.define('Products', {
  // Model attributes are defined here
  users_id: {
    type: DataTypes.INTEGER,
    allowNull: false
    // allowNull defaults to true
  },
  item: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
    // allowNull defaults to true
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
    // allowNull defaults to true
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
    // allowNull defaults to true
  },
  image_url: {
    type: DataTypes.TEXT,
    // allowNull defaults to true
  },
});

module.exports = Products;