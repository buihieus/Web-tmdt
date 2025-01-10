// routes/client/guidebuyonline.route.js
const express = require('express');
const router = express.Router();
const casioController = require("../../controllers/client/casio.controller");

// Đảm bảo định nghĩa đúng route cho trang hướng dẫn mua hàng online
router.get('/', casioController.casio);

module.exports = router;
