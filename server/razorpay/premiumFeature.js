const razorPay = require("razorpay");
const orderModel = require("../Model/orderModel");
const userModel = require("../Model/userModel");


// instantiate razor pay
const rzp = new razorPay({
  key_id: process.env.RAZOR_KEY_ID,
  key_secret: process.env.RAZOR_SECRET,
});

exports.getOrderId = async (req, res) => {
  const amount = 500000;

  try {
    const order = await rzp.orders.create({ amount, currency: "INR" });
    const { id, status } = order;

    await orderModel.create({
      orderId: id,
      status: "PENDING",
      userId: req.userId,
    });

    // if the order is created successfully, send it back to the client
    return res.status(200).json({ order, key_Id: rzp.key_id });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// function when payment is done through the razor pay
exports.getPaymentId = async (req, res) => {
  try {
    // accessing the payment id and order id
    const { razorpay_order_id, razorpay_payment_id } = req.body;
    const userId = req.userId;

    // Find the order from the database
    const getOrderFromDb = await orderModel.findOne({
      where: { orderId: razorpay_order_id },
    });

    if (!getOrderFromDb) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Update the order status to "SUCCESS"
    getOrderFromDb.status = "SUCCESS";
    getOrderFromDb.paymentId = razorpay_payment_id;
    await getOrderFromDb.save();

    // Update the user to the premium
    const findUserFromDb = await userModel.findByPk(userId);

    if (!findUserFromDb) {
      return res.status(404).json({ error: "User not found" });
    }

    findUserFromDb.isPremium = true;
    await findUserFromDb.save();

    // Return a success response
    return res
      .status(200)
      .json({ message: "Payment successful. User is now premium." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { order_id, payment_id } = req.body;

  try {
    const order = await orderModel.findOne({
      where: { orderId: order_id },
    });
    order.status = "FAILED";
    order.paymentId = payment_id;
    await order.save();
    // Return a success response
    return res.status(200).json("order status updated to failed");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }

};
