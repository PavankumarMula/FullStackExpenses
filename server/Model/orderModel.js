const Sequelize = require("sequelize");

const sequelize = require("../DataBase/database");

const orderModel = sequelize.define("orders", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  orderId: Sequelize.STRING,
  status: Sequelize.STRING,
  paymentId: Sequelize.STRING,
});

module.exports = orderModel;
