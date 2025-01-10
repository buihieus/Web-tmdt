// routes/client/guidebuyonline.route.js
const express = require('express');
const router = express.Router();
const rolexController = require("../../controllers/client/rolex.controller");

// Đảm bảo định nghĩa đúng route cho trang hướng dẫn mua hàng online
router.get('/', rolexController.rolex);

module.exports = router;
