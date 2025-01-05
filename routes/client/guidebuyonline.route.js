// routes/client/guidebuyonline.route.js
const express = require('express');
const router = express.Router();
const guidebuyonlineController = require("../../controllers/client/guidebuyonline.controller");

// Đảm bảo định nghĩa đúng route cho trang hướng dẫn mua hàng online
router.get('/', guidebuyonlineController.guidebuyonline);

module.exports = router;
