const expenseModel = require('../Model/expenseModel');


exports.getExpensesByPage=async (req,res)=>{
    console.log('user id is <<<<<<',req.userId);
    try {
        const currentPage=Number(req.query.page) || 1;
        const offset = (currentPage-1)*2
        const itemsPerPage = 2;

        // Query the Expenses using Sequelize
        const expenses = await expenseModel.findAll({
            where: { userId: req.userId },
            offset: offset,
            limit: itemsPerPage,
          });

          console.log(expenses)
        const totalExpenses=await expenseModel.count({where:{userId:req.userId}});
        const totalPages=Math.ceil(totalExpenses/itemsPerPage);
        res.status(200).json({expenses,totalExpenses,totalPages});
    }
    
    catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}