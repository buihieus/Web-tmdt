// routes/client/guidebuyonline.route.js
const express = require('express');
const router = express.Router();
const wallController = require("../../controllers/client/wall.controller");

// Đảm bảo định nghĩa đúng route cho trang hướng dẫn mua hàng online
router.get('/', wallController.wall);

module.exports = router;
