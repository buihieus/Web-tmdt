// routes/client/guidebuyonline.route.js
const express = require('express');
const router = express.Router();
const hublotController = require("../../controllers/client/hublot.controller");

// Đảm bảo định nghĩa đúng route cho trang hướng dẫn mua hàng online
router.get('/', hublotController.hublot);

module.exports = router;
