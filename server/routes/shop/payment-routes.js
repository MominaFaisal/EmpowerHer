const express = require("express");
const { capturePayment } = require("../../controllers/shop/payment-controller");

const router = express.Router();

router.post("/capture", capturePayment);

module.exports = router;
