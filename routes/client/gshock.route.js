// routes/client/guidebuyonline.route.js
const express = require('express');
const router = express.Router();
const gshockController = require("../../controllers/client/gshock.controller");

// Đảm bảo định nghĩa đúng route cho trang hướng dẫn mua hàng online
router.get('/', gshockController.gshock);

module.exports = router;
