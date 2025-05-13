const express = require("express");
const { getAllOrders,
     getOrderDetails,
      updateOrderStatus } = require("../../controllers/admin/order-controller");

const router = express.Router();

router.get("/getAll", getAllOrders);
router.get("/:orderId", getOrderDetails);
router.put("/:orderId/status", updateOrderStatus);

module.exports = router;
