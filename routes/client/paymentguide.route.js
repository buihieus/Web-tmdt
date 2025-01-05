// routes/client/guidebuyonline.route.js
const express = require('express');
const router = express.Router();
const paymentguideController = require("../../controllers/client/paymentguide.controller");

// Đảm bảo định nghĩa đúng route cho trang hướng dẫn thanh toán
router.get('/', paymentguideController.paymentguide);

module.exports = router;
