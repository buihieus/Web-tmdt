// routes/client/guidebuyonline.route.js
const express = require('express');
const router = express.Router();
const bulovaController = require("../../controllers/client/bulova.controller");

// Đảm bảo định nghĩa đúng route cho trang hướng dẫn mua hàng online
router.get('/', bulovaController.bulova);

module.exports = router;
