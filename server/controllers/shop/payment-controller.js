const stripe = require('stripe') ("sk_test_51QkAr4GBiPgQP6hyeWMu7Lub8g62EtagQZrWRa0AlAdBU8cB4XjQQiWzWEcf5wFy9wzzgN2iIjV8zgL4nxGdK9DZ007EWYZ48Z");
const Order = require("../../models/Order");

const capturePayment = async (req, res) => {
  try {
    const { paymentMethodId, orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalAmount * 100), // amount in cents
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
    });

    order.paymentStatus = "Completed";
    order.paymentId = paymentIntent.id;
    order.orderStatus = "Completed";
    order.orderUpdateDate = new Date();

    await order.save();

    res.status(200).json({ success: true, order, paymentIntent });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  capturePayment,
};
