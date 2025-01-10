// routes/client/guidebuyonline.route.js
const express = require('express');
const router = express.Router();
const casiosheenController = require("../../controllers/client/casiosheen.controller");

// Đảm bảo định nghĩa đúng route cho trang hướng dẫn mua hàng online
router.get('/', casiosheenController.casiosheen);

module.exports = router;
