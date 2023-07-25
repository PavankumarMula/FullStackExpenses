const express = require("express");

const { Sequelize } = require("sequelize");

const sequelize = require("../DataBase/database");

//import the user Model
const userModel = require("../Model/userModel");

//import the expense model
const expenseModel = require("../Model/expenseModel");

// function to add expenses in database
exports.addExpenses = async (req, res) => {
  const t = await sequelize.transaction();
  // destructuring the inputs
  const { expense, desc, price, select } = req.body;

  // accessing the userid
  const userId = req.userId;
  // pushing into the database

  try {
    await expenseModel.create(
      {
        expenseName: expense,
        description: desc,
        price: price,
        category: select,
        userId: userId, // foreign Key
      },
      { transaction: t }
    );

    // updating total expense in the user table
    const user = await userModel.findByPk(userId);
    user.totalExpense = (Number(user.totalExpense) || 0) + Number(price);
    await user.save({ transaction: t });
    t.commit();
    return res.status(200).json("expense Added Sucessfully");
  } catch (error) {
    t.rollback();
    return res.status(500).json("internal server error");
  }
};

// function get expenses from database
exports.getExpenses = async (req, res) => {
  try {
    const allExpenses = await expenseModel.findAll({
      where: {
        userId: req.userId,
      },
    });
    return res.json(allExpenses);
  } catch (error) {
    return res.status(500).json("internal server error");
  }
};

// function to edit the transaction
exports.editExpense = async (req, res) => {
  // destructuring the incoming request
  const { id, expense, price, desc, select } = req.body;

  // Declare the transaction variables outside the try-catch block to make them accessible in the catch block for rollback
  let updateTransaction;
  let userTransaction;

  try {
    // Assigning editing details to the existing product
    const product = await expenseModel.findByPk(id);
    let originalPrice = 0;
    if (product) {
      originalPrice = product.price;

      const updatedData = {
        expenseName: expense,
        description: desc,
        category: select,
        price: price,
      };

      // Start a new transaction for updating the expense
      updateTransaction = await sequelize.transaction();
      await expenseModel.update(updatedData, {
        where: {
          id: id,
        },
        transaction: updateTransaction,
      });

      // Commit the update transaction
      await updateTransaction.commit();

      // Start a new transaction for updating the user's total expense
      userTransaction = await sequelize.transaction();
      const userId = req.userId;
      const user = await userModel.findByPk(userId);

      // Update the user's totalExpense by subtracting the original price and adding the updated price
      user.totalExpense =
        user.totalExpense - Number(originalPrice) + Number(price);

      // Save the updated user details
      await user.save({ transaction: userTransaction });

      // Commit the user transaction
      await userTransaction.commit();

      return res.status(200).json("Product Edited Successfully");
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    console.log(error);

    // If any error occurs, rollback both transactions if they exist
    if (updateTransaction) await updateTransaction.rollback();
    if (userTransaction) await userTransaction.rollback();

    return res.status(500).json("Internal Server Error");
  }
};

// function for deleting the data
exports.deleteFromDb = async (req, res) => {
  const { id, price } = req.body;
  const userId = req.userId;
  try {
    // Start a new transaction for the delete operation
    const deleteTransaction = await sequelize.transaction();

    // Deleting the product
    const item = await expenseModel.findByPk(id);
    await item.destroy({ transaction: deleteTransaction });

    // Commit the delete transaction before starting the update transaction
    await deleteTransaction.commit();

    // Start a new transaction for updating the user's total expense
    const updateTransaction = await sequelize.transaction();

    // Update the total expense in user table
    const user = await userModel.findByPk(userId);
    user.totalExpense = user.totalExpense - Number(price);
    await user.save({ transaction: updateTransaction });

    // Commit the update transaction
    await updateTransaction.commit();

    res.status(200).json("deleted successfully");
  } catch (error) {
    // If any error occurs, rollback both transactions
    if (deleteTransaction) await deleteTransaction.rollback();
    if (updateTransaction) await updateTransaction.rollback();

    res.json("something is wrong");
  }
};
