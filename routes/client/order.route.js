// routes/client/guidebuyonline.route.js
const express = require('express');
const router = express.Router();
const orderController = require("../../controllers/client/order.controller");

// Đảm bảo định nghĩa đúng route cho trang hướng dẫn mua hàng online
router.get('/', orderController.index);

module.exports = router;