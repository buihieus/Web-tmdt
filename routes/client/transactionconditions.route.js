// routes/client/guidebuyonline.route.js
const express = require('express');
const router = express.Router();
const transactionconditionsController = require("../../controllers/client/transactionconditions.controller");

// Đảm bảo định nghĩa đúng route cho trang hướng dẫn thanh toán
router.get('/', transactionconditionsController.transactionconditions);

module.exports = router;
