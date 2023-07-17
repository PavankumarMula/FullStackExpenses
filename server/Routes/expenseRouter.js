const express=require('express');

const router=express.Router();

const expenseController=require('../Controller/expenseController');

//router for adding expense into database
router.post('/expenses',expenseController.addExpenses);

//router for getting all expenses 
router.get('/expenses',expenseController.getExpenses);

//router for editing all the expenses
router.put('/expenses',expenseController.editExpense);

//router for delete the expense
router.delete('/expenses/:id',expenseController.deleteFromDb);

module.exports=router;