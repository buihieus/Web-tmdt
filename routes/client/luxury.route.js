// routes/client/guidebuyonline.route.js
const express = require('express');
const router = express.Router();
const luxuryController = require("../../controllers/client/luxury.controller");

// Đảm bảo định nghĩa đúng route cho trang hướng dẫn mua hàng online
router.get('/', luxuryController.luxury);

module.exports = router;
