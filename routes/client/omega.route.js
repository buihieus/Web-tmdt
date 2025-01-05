// routes/client/guidebuyonline.route.js
const express = require('express');
const router = express.Router();
const omegaController = require("../../controllers/client/omega.controller");

// Đảm bảo định nghĩa đúng route cho trang hướng dẫn mua hàng online
router.get('/', omegaController.omega);

module.exports = router;
