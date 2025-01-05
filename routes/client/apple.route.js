// routes/client/guidebuyonline.route.js
const express = require('express');
const router = express.Router();
const appleController = require("../../controllers/client/apple.controller");

// Đảm bảo định nghĩa đúng route cho trang hướng dẫn mua hàng online
router.get('/', appleController.apple);

module.exports = router;
