const express=require('express');

const app=express();

const userRouter=require('./Routes/userRouter');

const expenseRouter=require('./Routes/expenseRouter');

const sequelize=require('./DataBase/database');

const cors=require('cors');

app.use(cors());

app.use(express.json());

app.use(userRouter);

app.use(expenseRouter);

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

