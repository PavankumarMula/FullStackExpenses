const Sequelize = require("sequelize");
const sequelize = require("../DataBase/database");

const forgottenPasswords = sequelize.define("passwords", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});
module.exports = forgottenPasswords;
