const paypal = require("../../helpers/paypal");
const { clearCart } = require("./cart-controller");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
       payerId,
      cartId,
    } = req.body;

    // const create_payment_json = {
    //   intent: "sale",
    //   payer: {
    //     payment_method: "paypal",
    //   },
    //   redirect_urls: {
    //     return_url: "http://localhost:5173/shop/paypal-return",
    //     cancel_url: "http://localhost:5173/shop/paypal-cancel",
    //   },
    //   transactions: [
    //     {
    //       item_list: {
    //         items: cartItems.map((item) => ({
    //           name: item.title,
    //           sku: item.productId,
    //           price: item.price.toFixed(2),
    //           currency: "PKR",
    //           quantity: item.quantity,
    //         })),
    //       },
    //       amount: {
    //         currency: "PKR",
    //         total: totalAmount.toFixed(2),
    //       },
    //       description: "description",
    //     },
    //   ],
    // };

    // paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
    //   if (error) {
    //     console.log(error);

    //     return res.status(500).json({
    //       success: false,
    //       message: "Error while creating paypal payment",
    //     });
    //   } else {
    //     const newlyCreatedOrder = new Order({
    //       userId,
    //       cartId,
    //       cartItems,
    //       addressInfo,
    //       orderStatus,
    //       paymentMethod,
    //       paymentStatus,
    //       totalAmount,
    //       orderDate,
    //       orderUpdateDate,
    //       // paymentId,
    //       // payerId,
    //     });

    //     await newlyCreatedOrder.save();

    //     const approvalURL = paymentInfo.links.find(
    //       (link) => link.rel === "approval_url"
    //     ).href;

    //     res.status(201).json({
    //       success: true,
    //       approvalURL,
    //       orderId: newlyCreatedOrder._id,
    //     });
    //   }
    // });

    const newlyCreatedOrder = new Order({
            userId,
            cartId,
            cartItems,
            addressInfo,
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId,
          });
          await newlyCreatedOrder.save();

          res.status(201).json({
                  success: true,
      
                  orderId: newlyCreatedOrder._id,
                  order: newlyCreatedOrder,
                });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const placeOrder = async (req, res) => {
  try {
    const { userId, orderDetails } = req.body;

    // Logic to place the order
    const newOrder = new Order({
      userId,
      orderDetails,
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
    });

    await newOrder.save();

    // Clear the cart after placing the order
    await clearCart(userId);

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      data: newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error placing order",
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order can not be found",
      });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Not enough stock for this product ${product.title}`,
        });
      }

      product.totalStock -= item.quantity;

      await product.save();
    }

    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
  placeOrder,
};
