const express = require("express");

const router = express.Router();

const expenseController = require("../Controller/expenseController");

const { userAuthentication } = require("../middlewares/userAuthentication");

const { getPaymentId,updateOrderStatus,getOrderId } = require("../razorpay/premiumFeature");

const {leaderBoardExpenses} = require('../Controller/leaderBoard');

//router for adding expense into database
router.post("/expenses", userAuthentication, expenseController.addExpenses);

//router for getting all expenses
router.get("/expenses", userAuthentication, expenseController.getExpenses);

//router for editing all the expenses
router.put("/expenses", userAuthentication, expenseController.editExpense);

//router for delete the expense
router.delete("/expenses",userAuthentication, expenseController.deleteFromDb);

//router for premium feature
router.get("/premium", userAuthentication, getOrderId);

// router for on payment done in premium feature
router.post("/updatepremium", userAuthentication,  getPaymentId);

//router for updating status for order when payment is failed
router.post('/updatestatus',userAuthentication,updateOrderStatus);

//router for showing leader board
router.get('/leaderboard',leaderBoardExpenses);

module.exports = router;
