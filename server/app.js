const express=require('express');

const app=express();

const userRouter=require('./Routes/userRouter');

const expenseRouter=require('./Routes/expenseRouter');

const sequelize=require('./DataBase/database');

const cors=require('cors');

app.use(cors());
app.use(express.json());

// routing 
app.use(userRouter);
app.use(expenseRouter);

// models
const userModel=require('./Model/userModel');
const expenseModel=require('./Model/expenseModel');

// Assciations
userModel.hasMany(expenseModel);
expenseModel.belongsTo(userModel);

sequelize
  .sync()
  .then((res) => {
    app.listen(4000, () => {
      console.log("server is running on 4000.... sucessfully");
    });
  })
  .catch((err) => {
    console.log(err);
  });

