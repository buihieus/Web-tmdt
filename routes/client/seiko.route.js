// routes/client/guidebuyonline.route.js
const express = require('express');
const router = express.Router();
const seikoController = require("../../controllers/client/seiko.controller");

// Đảm bảo định nghĩa đúng route cho trang hướng dẫn mua hàng online
router.get('/', seikoController.seiko);

module.exports = router;
