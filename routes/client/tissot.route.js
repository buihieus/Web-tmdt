// routes/client/guidebuyonline.route.js
const express = require('express');
const router = express.Router();
const tissotController = require("../../controllers/client/tissot.controller");

// Đảm bảo định nghĩa đúng route cho trang hướng dẫn mua hàng online
router.get('/', tissotController.tissot);

module.exports = router;
