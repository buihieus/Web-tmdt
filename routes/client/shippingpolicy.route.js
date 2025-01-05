// routes/client/guidebuyonline.route.js
const express = require('express');
const router = express.Router();
const shippingpolicyController = require("../../controllers/client/shippingpolicy.controller");

// Đảm bảo định nghĩa đúng route cho trang hướng dẫn thanh toán
router.get('/', shippingpolicyController.shippingpolicy);

module.exports = router;
