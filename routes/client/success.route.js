// routes/client/guidebuyonline.route.js
const express = require('express');
const router = express.Router();
const successController = require("../../controllers/client/success.controler");

// Đảm bảo định nghĩa đúng route cho trang hướng dẫn thanh toán
router.get('/', successController.success);

module.exports = router;
