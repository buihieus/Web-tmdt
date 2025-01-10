// routes/client/guidebuyonline.route.js
const express = require('express');
const router = express.Router();
const citizenController = require("../../controllers/client/citizen.controller");

// Đảm bảo định nghĩa đúng route cho trang hướng dẫn mua hàng online
router.get('/', citizenController.citizen);

module.exports = router;
