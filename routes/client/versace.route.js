// routes/client/guidebuyonline.route.js
const express = require('express');
const router = express.Router();
const versaceController = require("../../controllers/client/versace.controller");

// Đảm bảo định nghĩa đúng route cho trang hướng dẫn mua hàng online
router.get('/', versaceController.versace);

module.exports = router;
