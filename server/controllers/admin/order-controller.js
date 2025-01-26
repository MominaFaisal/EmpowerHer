const Order = require("../../models/Order");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getOrderDetails = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    order.orderStatus = status;
    await order.save();
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getAllOrders,
  getOrderDetails,
  updateOrderStatus,
};
