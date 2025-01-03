// routes/client/guidebuyonline.route.js
const express = require('express');
const router = express.Router();
const babygController = require("../../controllers/client/babyg.controller");

// Đảm bảo định nghĩa đúng route cho trang hướng dẫn mua hàng online
router.get('/', babygController.babyg);

module.exports = router;
