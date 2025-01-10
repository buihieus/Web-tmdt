const express = require("express");
const router = express.Router();

const orderController = require("../../controllers/client/order.controller");

// Route to display the payment page
router.get("/", orderController.index);

// Route to handle the checkout process
router.post("/checkout", orderController.checkout);

module.exports = router;