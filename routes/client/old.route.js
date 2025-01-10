// routes/client/guidebuyonline.route.js
const express = require('express');
const router = express.Router();
const oldController = require("../../controllers/client/old.controller");

// Đảm bảo định nghĩa đúng route cho trang hướng dẫn mua hàng online
router.get('/', oldController.old);

module.exports = router;
