// routes/client/guidebuyonline.route.js
const express = require('express');
const router = express.Router();
const privacypolicyController = require("../../controllers/client/privacypolicy.controller");

// Đảm bảo định nghĩa đúng route cho trang hướng dẫn thanh toán
router.get('/', privacypolicyController.privacypolicy);

module.exports = router;
