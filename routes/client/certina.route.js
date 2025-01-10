// routes/client/guidebuyonline.route.js
const express = require('express');
const router = express.Router();
const certinaController = require("../../controllers/client/certina.controller");

// Đảm bảo định nghĩa đúng route cho trang hướng dẫn mua hàng online
router.get('/', certinaController.certina);

module.exports = router;
