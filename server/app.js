require('dotenv').config();

const express = require("express");
const app = express();
const userRouter = require("./Routes/userRouter");
const expenseRouter = require("./Routes/expenseRouter");
const sequelize = require("./DataBase/database");



const cors = require("cors");
app.use(cors());
app.use(express.json());

// routing
app.use(userRouter);
app.use(expenseRouter);

// models
const userModel = require("./Model/userModel");
const expenseModel = require("./Model/expenseModel");
const orderModel = require("./Model/orderModel");
const passwordModel = require("./Model/forgottenPasswords");

// User and Expenses Association
userModel.hasMany(expenseModel);
expenseModel.belongsTo(userModel);

//user and Orders Association
userModel.hasMany(orderModel);
orderModel.belongsTo(userModel);

//user and password Association
userModel.hasMany(passwordModel);
passwordModel.belongsTo(userModel);

sequelize
  .sync()
  .then((res) => {
    app.listen(process.env.APP_PORT || 4000, () => {
      console.log(`server is running on ${process.env.APP_PORT} sucessfully`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
