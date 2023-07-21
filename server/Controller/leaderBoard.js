const expenseModel = require("../Model/expenseModel");
const userModel = require("../Model/userModel");

// function for showing leaderBoard for premium User
exports.leaderBoardExpenses = async (req, res) => {
  try {
    const expenses = await expenseModel.findAll({
      include: {
        model: userModel,
        attributes: ["id", "username", "email"], // Include only the desired user attributes
      },
    });

    // function to send username and his corresponding amount
    let ansArray = [];
    for (let i = 0; i < expenses.length; i++) {
      const {
        userId,
        price,
        user: { username },
        category,
      } = expenses[i];

      //find index of user weather the present user is in the ansArray
      let existingUserIndex = -1;
      for (let j = 0; j < ansArray.length; j++) {
        if (userId === ansArray[j].id) {
          existingUserIndex = j;
        }
      }
      if (existingUserIndex !== -1) {
        ansArray[existingUserIndex]["totalAmount"] += Number(price);
      } else {
        ansArray.push({
          id: userId,
          totalAmount: Number(price),
          name: username,
          category: category,
        });
      }
    }

    ansArray.sort((a, b) => b.totalAmount - a.totalAmount);
    res.status(200).json(ansArray);
  } catch (error) {
    res.status(500).json({ message: "internal error is occured" });
  }
};
