// routes/client/guidebuyonline.route.js
const express = require('express');
const router = express.Router();
const trend2025Controller = require("../../controllers/client/trend2025.controller.js");

// Đảm bảo định nghĩa đúng route cho trang hướng dẫn mua hàng online
router.get('/', trend2025Controller.trend2025);

module.exports = router;
