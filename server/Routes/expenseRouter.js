const express = require("express");

const router = express.Router();

const expenseController = require("../Controller/expenseController");

const { userAuthentication } = require("../middlewares/userAuthentication");

const { getOrderId } = require("../razorpay/premiumFeature");

//router for adding expense into database
router.post("/expenses", userAuthentication, expenseController.addExpenses);

//router for getting all expenses
router.get("/expenses", userAuthentication, expenseController.getExpenses);

//router for editing all the expenses
router.put("/expenses", expenseController.editExpense);

//router for delete the expense
router.delete("/expenses/:id", expenseController.deleteFromDb);

//router for premium feature
router.get("/premium", userAuthentication, getOrderId);

module.exports = router;
