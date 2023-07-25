const Sequelize = require("sequelize");
const sequelize = require("../DataBase/database");

const expense = sequelize.define("expenses", {

  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  expenseName: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  price: {
    type: Sequelize.DECIMAL(10, 2), 
    allowNull: false,
  },

  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = expense;
