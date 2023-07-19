const razorPay = require("razorpay");
const orderModel = require("../Model/orderModel");

// instantiate razor pay
const rzp = new razorPay({
  key_id: "rzp_test_xJziIe3Y4FOHtz",
  key_secret: "yJLuEYfgAJBQi9vwHxQSYKa9",
});

exports.getOrderId = async (req, res) => {
  const amount = 500000;

  try {
    const order = await rzp.orders.create({ amount, currency: "INR" });
    const { id, status } = order;

    await orderModel.create({
      orderId: id,
      status: status,
      userId: req.userId,
    });

    // if we order created sucessfully then send this back to client
    return res.status(200).json({ order, key_Id: rzp.key_id });
  } 

  catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
