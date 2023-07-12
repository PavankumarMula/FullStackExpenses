const Sequelize = require("sequelize");

const sequelize = new Sequelize("expenses", "root", "Mysql@250", {
  dialect: "mysql",
});

module.exports=sequelize;