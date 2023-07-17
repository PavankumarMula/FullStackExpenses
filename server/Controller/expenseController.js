const express = require("express");

//import the expense model
const expenseModel = require("../Model/expenseModel");

// function to add expenses in database
exports.addExpenses = async (req, res) => {
  // destructuring the inputs
  const { expense, desc, price, select } = req.body;

  // pushing into the database
  try {
    await expenseModel.create({
      expenseName: expense,
      description: desc,
      price: price,
      category: select,
    });
    return res.status(200).json("expense Added Sucessfully");
  } catch (error) {
    return res.status(500).json("internal server error");
  }
};

// function get expenses from database
exports.getExpenses = async (req, res) => {
  try {
    const allExpenses = await expenseModel.findAll();
    return res.json(allExpenses);
  } catch (error) {
    return res.status(500).json("internal server error");
  }
};

// function to edit the expense
exports.editExpense = async (req, res) => {
  // destructuring the incoming request
  const { id, expense, price, desc, select } = req.body;

  try {
    // assigning editing details to existing product
    const product = await expenseModel.findByPk(id);
    if (product) {
      const updatedData = {
        expenseName: expense,
        description: desc,
        category: select,
        price: price,
      };

      // inserting updated product into db
      await expenseModel.update(updatedData, {
        where: {
          id: id,
        },
      });

      return res.status(200).json("product Edited Sucessfully");
    } else {
      throw new Error("product not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("internal server Error");
  }
};

// function to delete the product
exports.deleteFromDb = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await expenseModel.findByPk(id);
    if (!expense) {
      return res.status(404).json("Expense not found");
    }
    // delete that product
    await expense.destroy();
    res.status(200).json("deleted sucessfully");
  } catch (error) {
    return res.status(500).json("internal server occured");
  }
};
